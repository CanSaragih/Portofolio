"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/validation";
import type { ChatMessage, ChatTurn } from "@/lib/chat/types";

const STORAGE_KEY = "can-portfolio-chat-v1";

function createMessageId(prefix: string): string {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return `${prefix}-${crypto.randomUUID()}`;
  }
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function loadStoredMessages(): ChatMessage[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item): item is ChatMessage =>
        Boolean(item) &&
        typeof item.id === "string" &&
        (item.role === "user" || item.role === "model") &&
        typeof item.content === "string" &&
        typeof item.createdAt === "number",
    );
  } catch {
    return [];
  }
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const [hasHydrated, setHasHydrated] = useState(false);
  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    setMessages(loadStoredMessages());
    setHasHydrated(true);
  }, []);

  useEffect(() => {
    if (!hasHydrated || typeof window === "undefined") return;
    try {
      // Do not persist trailing empty placeholder messages while streaming
      const persistable = messages.filter((m) => m.content.trim().length > 0 && !m.isError);
      if (persistable.length === 0) {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } else {
        window.sessionStorage.setItem(STORAGE_KEY, JSON.stringify(persistable.slice(-24)));
      }
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [messages, hasHydrated]);

  useEffect(() => {
    return () => {
      abortControllerRef.current?.abort();
    };
  }, []);

  const stopGenerating = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
  }, []);

  const clearMessages = useCallback(() => {
    abortControllerRef.current?.abort();
    abortControllerRef.current = null;
    setIsStreaming(false);
    setMessages([]);
    if (typeof window !== "undefined") {
      try {
        window.sessionStorage.removeItem(STORAGE_KEY);
      } catch {
        // Ignore
      }
    }
  }, []);

  const streamConversation = useCallback(async (turns: ChatTurn[], assistantMessageId: string) => {
    const controller = new AbortController();
    abortControllerRef.current = controller;
    setIsStreaming(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: turns }),
        signal: controller.signal,
      });

      if (!response.ok) {
        let errorMessage = "Sorry, something went wrong while contacting the AI. Please try again.";
        try {
          const data = (await response.json()) as { error?: string };
          if (data?.error) errorMessage = data.error;
        } catch {
          if (response.status === 429) {
            errorMessage = "Too many requests. Please wait a few seconds and try again.";
          }
        }
        throw new Error(errorMessage);
      }

      if (!response.body) {
        throw new Error("Streaming response is unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunkText = decoder.decode(value, { stream: true });
        if (!chunkText) continue;

        accumulated += chunkText;
        const snapshot = accumulated;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: snapshot } : msg,
          ),
        );
      }

      // Flush remaining decoder buffer
      const tail = decoder.decode();
      if (tail) {
        accumulated += tail;
        const snapshot = accumulated;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === assistantMessageId ? { ...msg, content: snapshot } : msg,
          ),
        );
      }

      if (!accumulated.trim()) {
        throw new Error("The AI did not return a response. Please try again.");
      }
    } catch (error) {
      if (error instanceof Error && error.name === "AbortError") {
        // Remove empty assistant placeholder if aborted before any token arrived
        setMessages((prev) =>
          prev.filter(
            (msg) => !(msg.id === assistantMessageId && !msg.content.trim()),
          ),
        );
        return;
      }

      const friendlyMessage =
        error instanceof Error && error.message
          ? error.message
          : "Sorry, a connection issue occurred. Please try again.";

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantMessageId
            ? { ...msg, content: friendlyMessage, isError: true }
            : msg,
        ),
      );
    } finally {
      if (abortControllerRef.current === controller) {
        abortControllerRef.current = null;
      }
      setIsStreaming(false);
    }
  }, []);

  const sendMessage = useCallback(
    async (rawText: string) => {
      const trimmed = rawText.trim();
      if (!trimmed || isStreaming) return;
      if (trimmed.length > MAX_MESSAGE_LENGTH) return;

      const userMessage: ChatMessage = {
        id: createMessageId("user"),
        role: "user",
        content: trimmed,
        createdAt: Date.now(),
      };

      const assistantMessageId = createMessageId("model");
      const assistantPlaceholder: ChatMessage = {
        id: assistantMessageId,
        role: "model",
        content: "",
        createdAt: Date.now(),
      };

      // Exclude errored bubbles from model context
      const historyTurns: ChatTurn[] = messages
        .filter((msg) => !msg.isError && msg.content.trim().length > 0)
        .map(({ role, content }) => ({ role, content }));

      const nextTurns: ChatTurn[] = [
        ...historyTurns,
        { role: "user", content: trimmed },
      ];

      setMessages((prev) => [...prev, userMessage, assistantPlaceholder]);
      await streamConversation(nextTurns, assistantMessageId);
    },
    [isStreaming, messages, streamConversation],
  );

  const retryLastMessage = useCallback(async () => {
    if (isStreaming || messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage?.isError) return;

    const cleanHistory = messages
      .slice(0, -1)
      .filter((msg) => !msg.isError && msg.content.trim().length > 0);

    const lastUser = cleanHistory[cleanHistory.length - 1];
    if (!lastUser || lastUser.role !== "user") return;

    const assistantMessageId = createMessageId("model");
    const assistantPlaceholder: ChatMessage = {
      id: assistantMessageId,
      role: "model",
      content: "",
      createdAt: Date.now(),
    };

    const turns: ChatTurn[] = cleanHistory.map(({ role, content }) => ({
      role,
      content,
    }));

    setMessages([...cleanHistory, assistantPlaceholder]);
    await streamConversation(turns, assistantMessageId);
  }, [isStreaming, messages, streamConversation]);

  return {
    messages,
    isStreaming,
    sendMessage,
    stopGenerating,
    clearMessages,
    retryLastMessage,
  };
}

