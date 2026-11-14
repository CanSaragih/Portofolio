"use client";

import { useRef, useState } from "react";
import { Bot } from "lucide-react";
import { useChat } from "@/hooks/useChat";
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
      {/* Floating Circular Bot Icon Trigger */}
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setIsOpen(true)}
        aria-expanded={isOpen}
        aria-hidden={isOpen}
        tabIndex={isOpen ? -1 : 0}
        aria-label="Open Can Assistant chat"
        className={`fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#1f1f23] hover:bg-[#27272d] border border-white/15 hover:border-[#ffaa40]/60 text-[#ffaa40] shadow-2xl shadow-black/75 flex items-center justify-center transition-all duration-300 cursor-pointer ${
          isOpen
            ? "opacity-0 scale-75 pointer-events-none"
            : "opacity-100 scale-100 hover:scale-105"
        }`}
      >
        <Bot className="w-6 h-6" />
        <span
          className="absolute top-0.5 right-0.5 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-[#171717]"
          aria-hidden="true"
        />
      </button>

      {/* Bottom-Right Floating Chat Form with Sidebar Slide-In/Out Animation */}
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
        modelLabel="Online"
      />
    </>
  );
}
