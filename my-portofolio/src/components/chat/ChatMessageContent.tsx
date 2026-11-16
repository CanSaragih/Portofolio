"use client";

import React, { useState } from "react";
import { Check, Copy } from "lucide-react";

function isSafeHref(rawHref: string): boolean {
  const trimmed = rawHref.trim();
  if (trimmed.startsWith("/") && !trimmed.startsWith("//")) return true;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function renderInlineTokens(text: string, keyPrefix: string): React.ReactNode[] {
  const tokenRegex = /(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\)|https?:\/\/[^\s)]+)/g;
  const nodes: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let tokenIdx = 0;

  while ((match = tokenRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    const token = match[0];
    const key = `${keyPrefix}-${tokenIdx++}`;

    if (token.startsWith("**") && token.endsWith("**")) {
      nodes.push(
        <strong key={key} className="font-semibold text-zinc-950">
          {token.slice(2, -2)}
        </strong>,
      );
    } else if (token.startsWith("`") && token.endsWith("`")) {
      nodes.push(
        <code
          key={key}
          className="px-1.5 py-0.5 rounded bg-zinc-100 border border-zinc-200 text-indigo-700 font-mono text-[12px]"
        >
          {token.slice(1, -1)}
        </code>,
      );
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(token);
      if (linkMatch && isSafeHref(linkMatch[2])) {
        const href = linkMatch[2].trim();
        const isExternal = href.startsWith("http") || href.endsWith(".pdf");
        nodes.push(
          <a
            key={key}
            href={href}
            target={isExternal ? "_blank" : undefined}
            rel={isExternal ? "noopener noreferrer" : undefined}
            className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 transition-colors break-words"
          >
            {linkMatch[1]}
          </a>,
        );
      } else {
        nodes.push(token);
      }
    } else if (token.startsWith("http") && isSafeHref(token)) {
      nodes.push(
        <a
          key={key}
          href={token}
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800 transition-colors break-all"
        >
          {token}
        </a>,
      );
    } else {
      nodes.push(token);
    }

    lastIndex = tokenRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

interface ChatMessageContentProps {
  content: string;
  isUser: boolean;
  isStreamingThis?: boolean;
}

export function ChatMessageContent({
  content,
  isUser,
  isStreamingThis = false,
}: ChatMessageContentProps) {
  const [copied, setCopied] = useState(false);

  if (isUser) {
    return (
      <p className="text-sm leading-relaxed whitespace-pre-wrap break-words text-white">
        {content}
      </p>
    );
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      // Clipboard unavailable
    }
  };

  const lines = content.split("\n");
  const blocks: React.ReactNode[] = [];
  let listItems: { ordered: boolean; items: string[] } | null = null;

  const flushList = (keySuffix: number) => {
    if (!listItems) return;
    const Tag = listItems.ordered ? "ol" : "ul";
    blocks.push(
      <Tag
        key={`list-${keySuffix}`}
        className={
          listItems.ordered
            ? "list-decimal pl-5 space-y-1 my-1.5"
            : "list-disc pl-5 space-y-1 my-1.5"
        }
      >
        {listItems.items.map((item, idx) => (
          <li key={idx} className="text-sm leading-relaxed text-zinc-700">
            {renderInlineTokens(item, `li-${keySuffix}-${idx}`)}
          </li>
        ))}
      </Tag>,
    );
    listItems = null;
  };

  lines.forEach((rawLine, index) => {
    const trimmed = rawLine.trim();
    const bulletMatch = /^[-*•]\s+(.+)$/.exec(trimmed);
    const orderedMatch = /^\d+\.\s+(.+)$/.exec(trimmed);

    if (bulletMatch) {
      if (listItems && listItems.ordered) flushList(index);
      if (!listItems) listItems = { ordered: false, items: [] };
      listItems.items.push(bulletMatch[1]);
      return;
    }

    if (orderedMatch) {
      if (listItems && !listItems.ordered) flushList(index);
      if (!listItems) listItems = { ordered: true, items: [] };
      listItems.items.push(orderedMatch[1]);
      return;
    }

    flushList(index);

    if (!trimmed) {
      if (blocks.length > 0) {
        blocks.push(<div key={`gap-${index}`} className="h-2" />);
      }
      return;
    }

    const headingMatch = /^#{1,3}\s+(.+)$/.exec(trimmed);
    if (headingMatch) {
      blocks.push(
        <p key={`h-${index}`} className="text-sm font-semibold text-zinc-950 mt-1.5 mb-0.5">
          {renderInlineTokens(headingMatch[1], `h-${index}`)}
        </p>,
      );
      return;
    }

    blocks.push(
      <p key={`p-${index}`} className="text-sm leading-relaxed text-zinc-700 break-words">
        {renderInlineTokens(rawLine, `p-${index}`)}
      </p>,
    );
  });

  flushList(lines.length);

  return (
    <div className="space-y-1.5">
      <div className="space-y-1">
        {blocks}
        {isStreamingThis && (
          <span
            className="inline-block w-1.5 h-4 align-middle ml-1 bg-indigo-500 animate-pulse rounded-sm"
            aria-hidden="true"
          />
        )}
      </div>

      {!isStreamingThis && content.trim().length > 0 && (
        <div className="flex justify-start pt-0.5">
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1 text-[11px] font-medium text-zinc-500 hover:text-zinc-900 transition-colors cursor-pointer"
            aria-label="Copy response"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}
