"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import {
  ArrowUp,
  Bot,
  RotateCcw,
  Sparkles,
  Square,
  Trash2,
  User,
  X,
} from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/validation";
import type { ChatMessage } from "@/lib/chat/types";
import { ChatMessageContent } from "./ChatMessageContent";

const QUICK_SUGGESTIONS = [
  "Tell me about Can's 2026 Hackathon achievement",
  "What are Can's featured projects?",
  "What is Can's core tech stack?",
  "How can I contact Can?",
];

let cachedDisplayTransitionSupport: boolean | undefined;

function canTransitionDisplay(): boolean {
  if (cachedDisplayTransitionSupport !== undefined) {
    return cachedDisplayTransitionSupport;
  }
  if (
    typeof window === "undefined" ||
    !window.CSS?.supports?.("transition-behavior", "allow-discrete") ||
    !document.body
  ) {
    return false;
  }
  const probe = document.createElement("div");
  probe.style.cssText =
    "transition: display 1s allow-discrete !important; display: block;";
  document.body.appendChild(probe);
  const initialDisplay = getComputedStyle(probe).display;
  probe.style.display = "none";
  cachedDisplayTransitionSupport =
    initialDisplay === "block" && getComputedStyle(probe).display === "block";
  probe.remove();
  return cachedDisplayTransitionSupport;
}

function supportsTopLayerExit(): boolean {
  if (typeof window === "undefined") return false;
  return (
    Boolean(window.CSS?.supports?.("overlay", "auto")) && canTransitionDisplay()
  );
}

function supportsPopoverApi(el: HTMLElement): boolean {
  return (
    typeof el.showPopover === "function" &&
    typeof el.hidePopover === "function" &&
    Object.hasOwn(HTMLElement.prototype, "popover")
  );
}

function isPanelCurrentlyOpen(dialog: HTMLDialogElement): boolean {
  if (supportsPopoverApi(dialog)) {
    try {
      return dialog.matches(":popover-open");
    } catch {
      return dialog.open;
    }
  }
  return dialog.open;
}

interface ChatDrawerProps {
  isOpen: boolean;
  onRequestClose: () => void;
  triggerRef: React.RefObject<HTMLButtonElement | null>;
  messages: ChatMessage[];
  isStreaming: boolean;
  onSendMessage: (text: string) => Promise<void> | void;
  onStopGenerating: () => void;
  onClearMessages: () => void;
  onRetryLast: () => void;
  modelLabel: string;
}

export function ChatDrawer({
  isOpen,
  onRequestClose,
  triggerRef,
  messages,
  isStreaming,
  onSendMessage,
  onStopGenerating,
  onClearMessages,
  onRetryLast,
  modelLabel,
}: ChatDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesViewportRef = useRef<HTMLDivElement>(null);
  const isClosingRef = useRef(false);

  const [inputValue, setInputValue] = useState("");
  const titleId = useId();
  const inputId = useId();

  const finishClose = useCallback(() => {
    onRequestClose();
    requestAnimationFrame(() => {
      triggerRef.current?.focus({ preventScroll: true });
    });
  }, [onRequestClose, triggerRef]);

  const closeTopLayer = useCallback(async () => {
    const dialog = dialogRef.current;
    if (!dialog || !isPanelCurrentlyOpen(dialog) || isClosingRef.current) return;

    isClosingRef.current = true;
    const usePopover = supportsPopoverApi(dialog);

    try {
      if (supportsTopLayerExit()) {
        if (usePopover) {
          dialog.hidePopover();
        } else if (dialog.open) {
          dialog.close();
        }

        const animations = dialog.getAnimations({ subtree: true });
        if (animations.length > 0) {
          await Promise.race([
            Promise.allSettled(animations.map((a) => a.finished)),
            new Promise((resolve) => setTimeout(resolve, 600)),
          ]);
        }
      } else {
        dialog.setAttribute("data-closing", "");
        const animations = dialog.getAnimations({ subtree: true });
        if (animations.length > 0) {
          await Promise.race([
            Promise.allSettled(animations.map((a) => a.finished)),
            new Promise((resolve) => setTimeout(resolve, 600)),
          ]);
        }
        if (!dialog.hasAttribute("data-closing")) return;
        dialog.removeAttribute("data-closing");
        if (usePopover) {
          dialog.hidePopover();
        } else if (dialog.open) {
          dialog.close();
        }
      }

      finishClose();
    } finally {
      isClosingRef.current = false;
    }
  }, [finishClose]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const currentlyOpen = isPanelCurrentlyOpen(dialog);
    const usePopover = supportsPopoverApi(dialog);

    if (isOpen && !currentlyOpen) {
      dialog.removeAttribute("data-closing");
      if (usePopover) {
        dialog.showPopover();
      } else {
        dialog.show();
      }
      requestAnimationFrame(() => {
        textareaRef.current?.focus({ preventScroll: true });
      });
    } else if (!isOpen && currentlyOpen) {
      void closeTopLayer();
    }
  }, [isOpen, closeTopLayer]);

  // Handle Escape key for non-modal popover="manual" panel
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        void closeTopLayer();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeTopLayer]);

  // Auto-scroll chat messages while streaming or adding new turns
  useEffect(() => {
    const viewport = messagesViewportRef.current;
    if (!viewport) return;
    viewport.scrollTop = viewport.scrollHeight;
  }, [messages, isStreaming]);

  // Auto-resize textarea smoothly
  useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 120)}px`;
  }, [inputValue]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmed = inputValue.trim();
    if (!trimmed || isStreaming) return;
    setInputValue("");
    void onSendMessage(trimmed);
  };

  const handleTextareaKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (e.nativeEvent.isComposing || e.keyCode === 229) {
        return;
      }
      formRef.current?.requestSubmit();
    }
  };

  const lastMessage = messages[messages.length - 1];
  const isWaitingFirstChunk =
    isStreaming &&
    lastMessage?.role === "model" &&
    lastMessage.content.trim().length === 0;

  return (
    <dialog
      ref={dialogRef}
      popover="manual"
      aria-labelledby={titleId}
      className="chat-floating z-50 shadow-2xl shadow-black/80"
    >
      {/* Header */}
      <header className="flex items-center justify-between gap-3 px-4 py-3.5 border-b border-white/10 bg-[#1a1a1d]/95 backdrop-blur-md shrink-0">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="relative shrink-0">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ffaa40]/20 to-[#9c40ff]/20 border border-[#ffaa40]/40 flex items-center justify-center text-[#ffaa40]">
              <Bot className="w-4 h-4" />
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#1a1a1d]"
              aria-hidden="true"
            />
          </div>
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-sm font-semibold text-zinc-100 truncate"
            >
              Can Assistant
            </h2>
            <p className="text-[11px] text-zinc-400 flex items-center gap-1.5 truncate">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>{modelLabel}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 shrink-0">
          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClearMessages}
              disabled={isStreaming}
              className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/10 disabled:opacity-40 transition-colors cursor-pointer"
              aria-label="Clear chat history"
              title="Clear chat"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => void closeTopLayer()}
            className="p-2 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close chat"
            title="Close (Esc)"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Scrollable Conversation Area */}
      <div
        ref={messagesViewportRef}
        data-lenis-prevent
        aria-live="polite"
        className="flex-1 overflow-y-auto overscroll-contain px-4 py-4 space-y-3.5 bg-[#171717]"
      >
        {messages.length === 0 ? (
          <div className="h-full flex flex-col justify-between py-2">
            <div className="text-center px-2 pt-3">
              <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-[#ffaa40]/20 via-[#ffaa40]/10 to-[#9c40ff]/20 border border-white/10 flex items-center justify-center text-[#ffaa40]">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-zinc-100 mb-1.5">
                Hi! I&apos;m Can&apos;s AI Assistant
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed max-w-xs mx-auto">
                Ask me anything about Can&apos;s background, featured projects,
                certifications, or technical details!
              </p>
            </div>

            <div className="space-y-2 pt-4">
              <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-500 px-1">
                Quick questions
              </p>
              <div className="flex flex-wrap gap-1.5">
                {QUICK_SUGGESTIONS.map((prompt) => (
                  <button
                    key={prompt}
                    type="button"
                    onClick={() => void onSendMessage(prompt)}
                    className="text-left px-3 py-1.5 rounded-full bg-[#1f1f23] hover:bg-[#26262c] border border-white/10 hover:border-[#ffaa40]/40 text-xs text-zinc-200 transition-colors cursor-pointer"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          messages.map((msg, index) => {
            const isUser = msg.role === "user";
            const isLast = index === messages.length - 1;
            const isEmptyAssistantPlaceholder =
              !isUser && !msg.content && isStreaming && isLast;

            if (isEmptyAssistantPlaceholder) {
              return null;
            }

            return (
              <div
                key={msg.id}
                className={`flex items-start gap-2.5 ${
                  isUser ? "flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center border ${
                    isUser
                      ? "bg-[#ffaa40]/15 border-[#ffaa40]/40 text-[#ffaa40]"
                      : "bg-[#1f1f23] border-white/10 text-zinc-300"
                  }`}
                >
                  {isUser ? (
                    <User className="w-3.5 h-3.5" />
                  ) : (
                    <Bot className="w-3.5 h-3.5" />
                  )}
                </div>

                <div
                  className={`max-w-[82%] rounded-2xl px-3.5 py-2.5 ${
                    isUser
                      ? "bg-[#26262c] border border-white/10 text-zinc-100 rounded-tr-sm"
                      : msg.isError
                        ? "bg-red-500/10 border border-red-500/30 text-red-200 rounded-tl-sm"
                        : "bg-[#1e1e22] border border-white/8 text-zinc-200 rounded-tl-sm"
                  }`}
                >
                  <ChatMessageContent
                    content={msg.content}
                    isUser={isUser}
                    isStreamingThis={!isUser && isStreaming && isLast}
                  />

                  {msg.isError && isLast && (
                    <button
                      type="button"
                      onClick={onRetryLast}
                      className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#ffaa40] hover:text-[#ffc370] cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Try again</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}

        {isWaitingFirstChunk && (
          <div className="flex items-start gap-2.5">
            <div className="shrink-0 w-7 h-7 rounded-full bg-[#1f1f23] border border-white/10 text-zinc-300 flex items-center justify-center">
              <Bot className="w-3.5 h-3.5" />
            </div>
            <div className="rounded-2xl rounded-tl-sm px-4 py-3 bg-[#1e1e22] border border-white/8">
              <div className="flex items-center gap-1.5" aria-label="AI is typing">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa40] animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa40] animate-bounce [animation-delay:-0.1s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffaa40] animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Footer Input Composer */}
      <footer className="p-3.5 border-t border-white/10 bg-[#1a1a1d] shrink-0">
        <form ref={formRef} onSubmit={handleSubmit} className="space-y-1.5">
          <label htmlFor={inputId} className="sr-only">
            Message Can Assistant
          </label>
          <div className="flex items-end gap-2 rounded-xl bg-[#131316] border border-white/10 focus-within:border-[#ffaa40]/60 px-3 py-1.5 transition-colors">
            <textarea
              ref={textareaRef}
              id={inputId}
              rows={1}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleTextareaKeyDown}
              maxLength={MAX_MESSAGE_LENGTH}
              placeholder="Type your message..."
              disabled={isStreaming}
              className="flex-1 resize-none bg-transparent text-sm text-zinc-100 placeholder-zinc-500 outline-none py-1.5 max-h-[120px] leading-relaxed disabled:opacity-60"
            />
            {isStreaming ? (
              <button
                type="button"
                onClick={onStopGenerating}
                className="shrink-0 h-8 w-8 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/40 text-red-300 flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Stop generating"
                title="Stop"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="shrink-0 h-8 w-8 rounded-lg bg-[#ffaa40] hover:bg-[#ffb95c] disabled:bg-zinc-700 disabled:text-zinc-500 text-zinc-950 flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
                aria-label="Send message"
                title="Send"
              >
                <ArrowUp className="w-4 h-4 stroke-[2.5]" />
              </button>
            )}
          </div>
          <div className="flex items-center justify-between px-1 text-[10px] text-zinc-500">
            <span>Enter to send • Shift+Enter for new line</span>
            <span>
              {inputValue.length}/{MAX_MESSAGE_LENGTH}
            </span>
          </div>
        </form>
      </footer>
    </dialog>
  );
}
