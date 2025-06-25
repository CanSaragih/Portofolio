import { chatWithGemini } from "@/lib/gemini";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { message } = await req.json();
  const response = await chatWithGemini(message);
  return NextResponse.json({ response });
}
