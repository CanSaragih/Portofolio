import { NextResponse } from "next/server";
import { streamChatResponse } from "@/lib/chat/gemini-client";
import { checkRateLimit, getClientIdentifier } from "@/lib/chat/rate-limit";
import { validateChatPayload } from "@/lib/chat/validation";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const clientId = getClientIdentifier(req);
  const rateLimit = checkRateLimit(clientId);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please wait a moment before trying again." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const validation = validateChatPayload(body);
  if (!validation.ok) {
    return NextResponse.json({ error: validation.error }, { status: 400 });
  }

  const iterator = streamChatResponse({
    messages: validation.messages,
    signal: req.signal,
  });

  // Pull the first chunk before committing HTTP 200 so upstream failures return proper 5xx JSON
  let firstChunk: IteratorResult<string, void>;
  try {
    firstChunk = await iterator.next();
  } catch (error) {
    await iterator.return?.().catch(() => {});
    if (req.signal.aborted) {
      return new Response(null, { status: 499 });
    }
    console.error("[/api/chat] Stream initialization error:", error);
    const message =
      error instanceof Error && error.message.includes("GOOGLE_GEMINI_API_KEY")
        ? "Server AI configuration is incomplete."
        : "Sorry, the AI service is temporarily unavailable. Please try again shortly.";
    return NextResponse.json({ error: message }, { status: 502 });
  }

  const encoder = new TextEncoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      try {
        if (!firstChunk.done && firstChunk.value) {
          controller.enqueue(encoder.encode(firstChunk.value));
        }
        while (true) {
          if (req.signal.aborted) break;
          const next = await iterator.next();
          if (next.done) break;
          if (next.value) {
            controller.enqueue(encoder.encode(next.value));
          }
        }
        controller.close();
      } catch (error) {
        if (req.signal.aborted) {
          controller.close();
          return;
        }
        console.error("[/api/chat] Mid-stream error:", error);
        controller.error(error);
      }
    },
    async cancel() {
      await iterator.return?.().catch(() => {});
    },
  });

  return new Response(stream, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-store, no-transform",
      "X-Content-Type-Options": "nosniff",
      "X-RateLimit-Remaining": String(rateLimit.remaining),
    },
  });
}
