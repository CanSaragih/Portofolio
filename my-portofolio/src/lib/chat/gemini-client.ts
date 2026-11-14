import { GoogleGenAI, type Content } from "@google/genai";
import { buildPortfolioSystemPrompt } from "./knowledge";
import type { ChatTurn } from "./types";

export const DEFAULT_GEMINI_MODEL = "gemini-3.8-flash";
const FALLBACK_MODELS = ["gemini-3.6-flash", "gemini-2.5-flash"] as const;
const FIRST_CHUNK_TIMEOUT_MS = 6500;

function getApiKey(): string {
  const apiKey = process.env.GOOGLE_GEMINI_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("Missing GOOGLE_GEMINI_API_KEY environment variable.");
  }
  return apiKey;
}

function getCandidateModels(): string[] {
  const configured = process.env.GEMINI_MODEL?.trim() || DEFAULT_GEMINI_MODEL;
  return Array.from(new Set([configured, ...FALLBACK_MODELS]));
}

function createLinkedAbortController(parentSignal?: AbortSignal): {
  controller: AbortController;
  cleanup: () => void;
} {
  const controller = new AbortController();

  if (!parentSignal) {
    return { controller, cleanup: () => {} };
  }

  if (parentSignal.aborted) {
    controller.abort(parentSignal.reason);
    return { controller, cleanup: () => {} };
  }

  const onParentAbort = () => controller.abort(parentSignal.reason);
  parentSignal.addEventListener("abort", onParentAbort, { once: true });

  return {
    controller,
    cleanup: () => parentSignal.removeEventListener("abort", onParentAbort),
  };
}

export interface StreamChatOptions {
  messages: ChatTurn[];
  signal?: AbortSignal;
}

/**
 * Streams assistant text chunks from Gemini 3.8 Flash (with fast first-chunk timeout
 * fallback to verified sibling Flash models if the primary preview model stalls).
 */
export async function* streamChatResponse({
  messages,
  signal,
}: StreamChatOptions): AsyncGenerator<string, void, unknown> {
  const ai = new GoogleGenAI({
    apiKey: getApiKey(),
    httpOptions: { apiVersion: "v1beta" },
  });

  const systemInstruction = buildPortfolioSystemPrompt();
  const contents: Content[] = messages.map((msg) => ({
    role: msg.role,
    parts: [{ text: msg.content }],
  }));

  const models = getCandidateModels();
  let lastError: unknown;

  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    const hasFallback = i < models.length - 1;
    const { controller, cleanup } = createLinkedAbortController(signal);

    let hasEmittedChunk = false;
    let timedOutWaitingForFirstChunk = false;
    const timeoutId = hasFallback
      ? setTimeout(() => {
          if (!hasEmittedChunk) {
            timedOutWaitingForFirstChunk = true;
            controller.abort(new Error(`Model ${model} first-chunk timeout`));
          }
        }, FIRST_CHUNK_TIMEOUT_MS)
      : null;

    try {
      const stream = await ai.models.generateContentStream({
        model,
        contents,
        config: {
          systemInstruction,
          temperature: 0.7,
          maxOutputTokens: 2048,
          abortSignal: controller.signal,
        },
      });

      for await (const chunk of stream) {
        if (signal?.aborted) return;
        const text = chunk.text;
        if (text) {
          if (!hasEmittedChunk) {
            hasEmittedChunk = true;
            if (timeoutId) clearTimeout(timeoutId);
          }
          yield text;
        }
      }

      if (timeoutId) clearTimeout(timeoutId);
      if (hasEmittedChunk) {
        return;
      }

      throw new Error(`Model ${model} completed without returning text.`);
    } catch (error) {
      if (timeoutId) clearTimeout(timeoutId);
      lastError = error;

      if (signal?.aborted) {
        return;
      }

      // Never switch models once partial output has been streamed to the client
      if (hasEmittedChunk || !hasFallback) {
        throw error;
      }

      const reason = timedOutWaitingForFirstChunk
        ? `timed out after ${FIRST_CHUNK_TIMEOUT_MS}ms waiting for first chunk`
        : error instanceof Error
          ? error.message
          : "unknown error";
      console.warn(
        `[chat] Model "${model}" unavailable (${reason}); falling back to "${models[i + 1]}".`,
      );
    } finally {
      cleanup();
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("All Gemini models failed to respond.");
}

