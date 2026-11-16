"use client";

import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import gsap from "gsap";
import {
  AlertCircle,
  ArrowUp,
  ArrowUpRight,
  RotateCcw,
  Square,
  Trash2,
  X,
} from "lucide-react";
import { MAX_MESSAGE_LENGTH } from "@/lib/chat/validation";
import type { ChatMessage } from "@/lib/chat/types";
import { AiOrbLottie } from "./AiOrbLottie";
import { ChatMessageContent } from "./ChatMessageContent";

const QUICK_SUGGESTIONS = [
  "Tell me about Can's",
  "What are Can's featured projects?",
  "What is Can's core tech stack?",
  "How can I contact Can?",
];

const REDUCED_MOTION_FADE_DURATION = 0.18;

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches === true
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
}: ChatDrawerProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesViewportRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | gsap.core.Tween | null>(null);
  const isAnimatingRef = useRef(false);
  const isClosingRef = useRef(false);

  const [inputValue, setInputValue] = useState("");
  const titleId = useId();
  const inputId = useId();

  const openWithReveal = useCallback(() => {
    const dialog = dialogRef.current;
    const content = contentRef.current;
    if (!dialog || !content || isPanelCurrentlyOpen(dialog)) return;

    isClosingRef.current = false;
    timelineRef.current?.kill();

    if (supportsPopoverApi(dialog)) {
      dialog.showPopover();
    } else {
      dialog.show();
    }

    if (prefersReducedMotion()) {
      gsap.set(dialog, { clipPath: "none", autoAlpha: 0 });
      gsap.set(content, { opacity: 1, y: 0, scale: 1 });
      timelineRef.current = gsap.to(dialog, {
        autoAlpha: 1,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.out",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: () => {
          isAnimatingRef.current = false;
          textareaRef.current?.focus({ preventScroll: true });
        },
      });
      return;
    }

    gsap.set(dialog, {
      clipPath: "circle(0% at 92% 94%)",
      autoAlpha: 1,
    });
    gsap.set(content, { opacity: 0, y: 14, scale: 1 });

    const tl = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: () => {
        isAnimatingRef.current = false;
        gsap.set(dialog, { clearProps: "clipPath" });
        textareaRef.current?.focus({ preventScroll: true });
      },
    });

    timelineRef.current = tl;
    tl.to(dialog, {
      clipPath: "circle(155% at 92% 94%)",
      duration: 0.65,
      ease: "power4.inOut",
    }).to(
      content,
      {
        opacity: 1,
        y: 0,
        duration: 0.36,
        ease: "power3.out",
      },
      "-=0.3",
    );
  }, []);

  const closeWithReveal = useCallback(() => {
    const dialog = dialogRef.current;
    const content = contentRef.current;
    if (
      !dialog ||
      !content ||
      !isPanelCurrentlyOpen(dialog) ||
      isClosingRef.current
    ) {
      return;
    }

    isClosingRef.current = true;
    timelineRef.current?.kill();

    const finishHide = () => {
      if (supportsPopoverApi(dialog)) {
        if (isPanelCurrentlyOpen(dialog)) dialog.hidePopover();
      } else if (dialog.open) {
        dialog.close();
      }
      gsap.set(dialog, { clearProps: "clipPath,opacity,visibility" });
      gsap.set(content, { clearProps: "opacity,transform" });
      isAnimatingRef.current = false;
      isClosingRef.current = false;
      onRequestClose();
      requestAnimationFrame(() => {
        triggerRef.current?.focus({ preventScroll: true });
      });
    };

    if (prefersReducedMotion()) {
      timelineRef.current = gsap.to(dialog, {
        autoAlpha: 0,
        duration: REDUCED_MOTION_FADE_DURATION,
        ease: "power2.in",
        onStart: () => {
          isAnimatingRef.current = true;
        },
        onComplete: finishHide,
      });
      return;
    }

    gsap.set(dialog, { clipPath: "circle(155% at 92% 94%)" });

    const tl = gsap.timeline({
      onStart: () => {
        isAnimatingRef.current = true;
      },
      onComplete: finishHide,
    });

    timelineRef.current = tl;
    tl.to(content, {
      opacity: 0,
      scale: 0.97,
      duration: 0.24,
      ease: "power2.in",
    }).to(
      dialog,
      {
        clipPath: "circle(0% at 92% 94%)",
        duration: 0.52,
        ease: "power4.inOut",
      },
      "<",
    );
  }, [onRequestClose, triggerRef]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const currentlyOpen = isPanelCurrentlyOpen(dialog);
    if (isOpen && !currentlyOpen) {
      openWithReveal();
    } else if (!isOpen && currentlyOpen) {
      closeWithReveal();
    }
  }, [isOpen, openWithReveal, closeWithReveal]);

  useEffect(() => {
    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  // Close with Escape key (manual popover does not auto-handle Esc)
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        closeWithReveal();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, closeWithReveal]);

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

  const handleTextareaKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>,
  ) => {
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
      className="chat-floating z-50 bg-white text-zinc-950 shadow-[0_24px_70px_-12px_rgba(0,0,0,0.45),0_0_0_1px_rgba(0,0,0,0.06)]"
    >
      <div ref={contentRef} className="flex flex-col h-full w-full bg-white">
        {/* Editorial Header */}
        <header className="flex items-center justify-between gap-3 px-5 py-3.5 border-b border-zinc-200/80 bg-white shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9  flex items-center justify-center shrink-0 overflow-hidden">
              <AiOrbLottie className="w-8 h-8" />
            </div>
            <div className="min-w-0">
              <h2
                id={titleId}
                className="text-sm font-semibold text-zinc-950 tracking-tight truncate"
              >
                Can Saragih
              </h2>
              <p className="text-[11px] text-zinc-500 truncate">
                Portfolio Assistant
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {messages.length > 0 && (
              <button
                type="button"
                onClick={onClearMessages}
                disabled={isStreaming}
                className="p-2 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 disabled:opacity-40 transition-colors cursor-pointer"
                aria-label="Clear chat history"
                title="Clear chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={closeWithReveal}
              className="p-2 rounded-lg text-zinc-500 hover:text-zinc-950 hover:bg-zinc-100 transition-colors cursor-pointer"
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
          className="flex-1 overflow-y-auto overscroll-contain px-5 py-5 space-y-4 bg-white"
        >
          {messages.length === 0 ? (
            <div className="h-full flex flex-col justify-between">
              <div className="pt-2 pb-4 flex flex-col items-center justify-center">
                <div className="mb-3 overflow-hidden">
                  <AiOrbLottie className="w-16 h-16" />
                </div>
                <h3 className="text-lg font-semibold text-zinc-950 tracking-tight mb-1">
                  Ask about Can&apos;s work
                </h3>
                <p className="text-xs sm:text-sm text-zinc-600 leading-relaxed">
                  Explore featured projects, technical stack, Hackathon
                  achievements, or how to get in touch.
                </p>
              </div>

              <div>
                <p className="font-mono text-[10px] font-medium uppercase tracking-widest text-zinc-400 mb-2">
                  Quick questions
                </p>
                <div className="flex flex-col">
                  {QUICK_SUGGESTIONS.map((prompt, idx) => (
                    <button
                      key={prompt}
                      type="button"
                      onClick={() => void onSendMessage(prompt)}
                      className="group flex items-center justify-between gap-3 py-2.5 border-t border-zinc-200/90 last:border-b text-left hover:bg-zinc-50/80 transition-colors cursor-pointer"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="font-mono text-[11px] text-zinc-400 group-hover:text-indigo-600 tabular-nums transition-colors">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                        <span className="text-xs sm:text-[13px] font-medium text-zinc-700 group-hover:text-zinc-950 group-hover:translate-x-0.5 transition-all truncate">
                          {prompt}
                        </span>
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 shrink-0 text-zinc-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
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

              if (isUser) {
                return (
                  <div key={msg.id} className="flex justify-end">
                    <div className="max-w-[82%] rounded-2xl rounded-br-sm bg-zinc-950 text-white px-4 py-2.5 shadow-sm">
                      <ChatMessageContent content={msg.content} isUser={true} />
                    </div>
                  </div>
                );
              }

              if (msg.isError) {
                return (
                  <div
                    key={msg.id}
                    className="rounded-xl border border-red-200 bg-red-50 px-3.5 py-3 text-red-900"
                  >
                    <div className="flex items-start gap-2">
                      <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
                      <div className="space-y-2">
                        <p className="text-xs sm:text-sm leading-relaxed">
                          {msg.content}
                        </p>
                        {isLast && (
                          <button
                            type="button"
                            onClick={onRetryLast}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-700 hover:text-red-900 cursor-pointer"
                          >
                            <RotateCcw className="w-3.5 h-3.5" />
                            <span>Try again</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }

              return (
                <div key={msg.id} className="pb-4">
                  <ChatMessageContent
                    content={msg.content}
                    isUser={false}
                    isStreamingThis={isStreaming && isLast}
                  />
                </div>
              );
            })
          )}

          {isWaitingFirstChunk && (
            <div className="pb-4 flex items-center gap-2 text-xs text-zinc-500">
              <span
                className="inline-flex items-center gap-1"
                aria-hidden="true"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.2s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:-0.1s]" />
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce" />
              </span>
              <span>Thinking...</span>
            </div>
          )}
        </div>

        {/* Clean Composer */}
        <footer className="p-3.5 border-t border-zinc-200/80 bg-white shrink-0">
          <form ref={formRef} onSubmit={handleSubmit}>
            <label htmlFor={inputId} className="sr-only">
              Message Can Assistant
            </label>
            <div className="flex items-end gap-2 rounded-2xl bg-zinc-50 border border-zinc-300 focus-within:border-zinc-950 focus-within:bg-white px-3.5 py-2 transition-colors">
              <textarea
                ref={textareaRef}
                id={inputId}
                rows={1}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleTextareaKeyDown}
                maxLength={MAX_MESSAGE_LENGTH}
                placeholder="Ask anything..."
                disabled={isStreaming}
                className="flex-1 resize-none bg-transparent text-sm text-zinc-950 placeholder-zinc-500 outline-none py-1 max-h-[120px] leading-relaxed disabled:opacity-60"
              />
              {isStreaming ? (
                <button
                  type="button"
                  onClick={onStopGenerating}
                  className="shrink-0 h-8 w-8 rounded-full bg-red-50 hover:bg-red-100 border border-red-300 text-red-700 flex items-center justify-center transition-colors cursor-pointer"
                  aria-label="Stop generating"
                  title="Stop"
                >
                  <Square className="w-3 h-3 fill-current" />
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="shrink-0 h-8 w-8 rounded-full bg-zinc-950 hover:bg-zinc-800 disabled:bg-zinc-200 disabled:text-zinc-400 text-white flex items-center justify-center transition-colors cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Send message"
                  title="Send"
                >
                  <ArrowUp className="w-4 h-4 stroke-[2.25]" />
                </button>
              )}
            </div>
            {inputValue.length > 750 && (
              <p className="text-right text-[10px] text-zinc-500 mt-1 px-1 tabular-nums">
                {inputValue.length}/{MAX_MESSAGE_LENGTH}
              </p>
            )}
          </form>
        </footer>
      </div>
    </dialog>
  );
}
