"use client";

import { useRef, useState } from "react";
import { useChat } from "@/hooks/useChat";
import { AiOrbLottie } from "./chat/AiOrbLottie";
import { ChatDrawer } from "./chat/ChatDrawer";

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const {
    messages,
    isStreaming,
    sendMessage,
    stopGenerating,
    clearMessages,
    retryLastMessage,
  } = useChat();

  return (
    <>
      {/* Floating White Circular Lottie AI Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
        aria-label="Open Can Saragih AI Assistant"
        className={`fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-40 w-15 h-15 rounded-full bg-white border border-zinc-200/90 shadow-[0_12px_35px_-6px_rgba(116,124,236,0.25),0_4px_14px_rgba(0,0,0,0.3)] flex items-center justify-center overflow-hidden transition-all duration-300 cursor-pointer ${
          isOpen
            ? "opacity-0 scale-75 pointer-events-none"
            : "opacity-100 scale-100 hover:scale-105 hover:border-indigo-300"
        }`}
      >
        <AiOrbLottie className="w-14 h-14" />
      </button>

      {/* Bottom-Right Light Floating Chat Card with GSAP Reveal Animation */}
      <ChatDrawer
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        triggerRef={triggerRef}
        messages={messages}
        isStreaming={isStreaming}
        onSendMessage={sendMessage}
        onStopGenerating={stopGenerating}
        onClearMessages={clearMessages}
        onRetryLast={retryLastMessage}
      />
    </>
  );
}
