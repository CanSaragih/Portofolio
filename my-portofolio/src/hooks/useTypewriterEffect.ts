import { useState, useEffect } from "react";

interface UseTypewriterEffectProps {
  text: string;
  delay?: number;
  onComplete?: () => void;
}

export const useTypewriterEffect = ({
  text,
  delay = 15,
  onComplete,
}: UseTypewriterEffectProps) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    if (!text) return;

    let index = 0;
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        setIsComplete(true);
        clearInterval(timer);
        onComplete?.();
      }
    }, delay);

    return () => clearInterval(timer);
  }, [text, delay, onComplete]);

  return { displayedText, isComplete };
};
