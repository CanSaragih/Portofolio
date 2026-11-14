import type { ChatRole, ChatTurn } from "./types";

export const MAX_MESSAGE_LENGTH = 1000;
export const MAX_HISTORY_MESSAGES = 16;

type ValidationResult =
  | { ok: true; messages: ChatTurn[] }
  | { ok: false; error: string };

function isValidRole(value: unknown): value is ChatRole {
  return value === "user" || value === "model";
}

/**
 * Validates and normalizes incoming chat conversation payloads.
 * Caps history length and individual message size to prevent prompt-stuffing and quota abuse.
 */
export function validateChatPayload(payload: unknown): ValidationResult {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid request payload." };
  }

  const rawMessages = (payload as { messages?: unknown }).messages;

  if (!Array.isArray(rawMessages) || rawMessages.length === 0) {
    return { ok: false, error: "Messages array is required and cannot be empty." };
  }

  const recentMessages = rawMessages.slice(-MAX_HISTORY_MESSAGES);
  const sanitized: ChatTurn[] = [];

  for (const item of recentMessages) {
    if (!item || typeof item !== "object") {
      return { ok: false, error: "Malformed message item." };
    }

    const { role, content } = item as { role?: unknown; content?: unknown };

    if (!isValidRole(role) || typeof content !== "string") {
      return { ok: false, error: "Each message must include a valid role and text content." };
    }

    const trimmed = content.trim();
    if (!trimmed) {
      return { ok: false, error: "Message content cannot be empty." };
    }

    if (role === "user" && trimmed.length > MAX_MESSAGE_LENGTH) {
      return {
        ok: false,
        error: `Message is too long. Please keep messages under ${MAX_MESSAGE_LENGTH} characters.`,
      };
    }

    // Cap stored model turns cleanly in case an assistant answer was longer
    sanitized.push({
      role,
      content: role === "model" ? trimmed.slice(0, 4000) : trimmed,
    });
  }

  const lastMessage = sanitized[sanitized.length - 1];
  if (!lastMessage || lastMessage.role !== "user") {
    return { ok: false, error: "The final message must come from the user." };
  }

  return { ok: true, messages: sanitized };
}

