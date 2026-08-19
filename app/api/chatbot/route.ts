import { NextRequest, NextResponse } from "next/server";
import { getBotReply } from "@/lib/chatbot";

/**
 * Chatbot endpoint — rule-based responder.
 * The UI also runs the same rules client-side for instant replies;
 * this route exists so the responder can later be upgraded to an
 * LLM or external service without changing the client contract.
 */

export async function POST(req: NextRequest) {
  let body: { message?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ success: false, message: "Invalid request body" }, { status: 400 });
  }

  const message = (body.message ?? "").toString().slice(0, 500);
  if (!message.trim()) {
    return NextResponse.json({ success: false, message: "Message is required" }, { status: 400 });
  }

  const reply = getBotReply(message);
  return NextResponse.json({ success: true, reply });
}
