import { useState, useRef, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import { FaRobot, FaUser } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

interface Message {
  id: string;
  content: string;
  isUser: boolean;
  timestamp: Date;
}

const SUGGESTION_CHIPS = [
  "Who is Can?",
  "What projects has he built?",
  "What tech stack does he use?",
  "Tell me about his background",
];

const formatMessageContent = (content: string) => {
  // Replace variations of Can's name with bold formatting
  const nameVariations = ["Can Whardana Saragih", "Feronicha Charly"];

  let formattedContent = content;

  // Sort by length (longest first) to avoid partial replacements
  nameVariations.sort((a, b) => b.length - a.length);

  nameVariations.forEach((name) => {
    const regex = new RegExp(
      `\\b${name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "gi"
    );
    formattedContent = formattedContent.replace(regex, `**${name}**`);
  });

  return formattedContent;
};

const renderFormattedText = (text: string) => {
  const parts = text.split(/(\*\*.*?\*\*)/g);

  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      const boldText = part.slice(2, -2);
      return <strong key={index}>{boldText}</strong>;
    }
    return part;
  });
};

export function ChatBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const clearChat = () => {
    setMessages([]);
  };

  const handleSendMessage = async (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content }),
      });

      const data = await response.json();

      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: formatMessageContent(data.response),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I'm having trouble responding right now. Please try again.",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSendMessage(inputValue);
  };

  const handleChipClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  const openChat = () => {
    setIsOpen(true);
    // Small delay to ensure DOM is ready
    setTimeout(() => {
      setIsAnimating(true);
    }, 10);
  };

  const closeChat = () => {
    setIsAnimating(false);
    // Longer delay for smoother exit animation
    setTimeout(() => {
      setIsOpen(false);
    }, 400);
  };

  return (
    <>
      {/* Chat Bubble Icon */}
      {!isOpen && (
        <button
          onClick={openChat}
          className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105"
        >
          <FaRobot className="text-white w-7 h-7" />
        </button>
      )}

      {/* Chat Box with enhanced slide animation */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 w-[85vw] max-w-sm bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transition-all duration-400 ease-in-out ${
            isAnimating
              ? "transform translate-x-0 opacity-100 scale-100"
              : "transform translate-x-[120%] opacity-0 scale-95"
          }`}
          style={{
            transform: isAnimating
              ? "translateX(0) scale(1)"
              : "translateX(120%) scale(0.95)",
            opacity: isAnimating ? 1 : 0,
            transformOrigin: "bottom right",
          }}
        >
          {/* Enhanced Header with staggered animation */}
          <div
            className={`bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-4 transition-all duration-500 delay-100 ${
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-[-20px] opacity-0"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-9 h-9 bg-white rounded-full flex items-center justify-center shadow-md">
                    <FaRobot className="text-slate-700 w-4 h-4" />
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <h2 className="font-semibold text-white text-base">
                    Can Assistant
                  </h2>
                  <p className="text-slate-300 text-xs flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    Online
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                    title="Clear chat"
                  >
                    <MdDelete size={18} />
                  </button>
                )}
                <button
                  onClick={closeChat}
                  className="p-2 text-slate-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                  title="Close chat"
                >
                  <IoClose size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* Messages Area with staggered animation */}
          <div
            className={`overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-slate-50/30 to-white transition-all duration-500 delay-200 ${
              messages.length === 0 ? "h-80" : "h-[400px]"
            } ${
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-[20px] opacity-0"
            }`}
          >
            {messages.length === 0 ? (
              <div className="text-center text-gray-600 py-6">
                <div className="w-14 h-14 bg-gradient-to-r from-slate-700 to-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                  <FaRobot className="text-white text-xl" />
                </div>
                <p className="font-semibold text-slate-800 text-base mb-2">
                  Hi! I'm Can's AI Assistant
                </p>
                <p className="text-sm text-slate-600 leading-relaxed px-2">
                  Ask me anything about Can's background, skills, projects, or
                  personal life!
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-2.5 ${
                    message.isUser ? "flex-row-reverse" : ""
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center shadow-sm ${
                      message.isUser
                        ? "bg-gradient-to-r from-slate-700 to-slate-900"
                        : "bg-white border border-slate-200"
                    }`}
                  >
                    {message.isUser ? (
                      <FaUser className="w-3.5 h-3.5 text-white" />
                    ) : (
                      <FaRobot className="w-3.5 h-3.5 text-slate-700" />
                    )}
                  </div>
                  <div
                    className={`max-w-[82%] p-3 rounded-xl shadow-sm ${
                      message.isUser
                        ? "bg-gradient-to-r from-slate-700 to-slate-900 text-white rounded-br-sm"
                        : "bg-white text-slate-800 border border-slate-100 rounded-bl-sm"
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {message.isUser
                        ? message.content
                        : renderFormattedText(message.content)}
                    </p>
                  </div>
                </div>
              ))
            )}

            {isLoading && (
              <div className="flex items-start gap-2.5">
                <div className="flex-shrink-0 w-7 h-7 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <FaRobot className="w-3.5 h-3.5 text-slate-700" />
                </div>
                <div className="bg-white p-3 rounded-xl rounded-bl-sm shadow-sm border border-slate-100">
                  <div className="flex space-x-1.5">
                    <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                    <div
                      className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                      className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Enhanced Suggestion Chips with staggered animation */}
          {messages.length === 0 && (
            <div
              className={`px-4 pb-3 bg-white h-[80px] flex flex-col justify-center transition-all duration-500 delay-300 ${
                isAnimating
                  ? "translate-y-0 opacity-100"
                  : "translate-y-[20px] opacity-0"
              }`}
            >
              <p className="text-xs text-slate-500 mb-2 font-medium">
                Quick questions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTION_CHIPS.map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleChipClick(suggestion)}
                    className="px-3 py-1.5 text-xs bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-full text-slate-700 transition-all duration-200 hover:shadow-sm"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Enhanced Input with staggered animation */}
          <div
            className={`p-4 border-t border-slate-100 bg-white h-[76px] flex items-center transition-all duration-500 delay-400 ${
              isAnimating
                ? "translate-y-0 opacity-100"
                : "translate-y-[20px] opacity-0"
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="flex items-center gap-2.5 w-full"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 px-3.5 py-2.5 border border-slate-200 rounded-xl text-sm outline-none text-slate-800 placeholder-slate-400 focus:border-slate-400 focus:ring-2 focus:ring-slate-100 disabled:opacity-50 transition-all duration-200"
              />
              <button
                type="submit"
                disabled={isLoading || !inputValue.trim()}
                className="p-2.5 text-white bg-gradient-to-r from-slate-700 to-slate-900 rounded-xl hover:from-slate-600 hover:to-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg"
              >
                <svg
                  className="w-4 h-4 rotate-45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 4l16 8-16 8V4z"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
