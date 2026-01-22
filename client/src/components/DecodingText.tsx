import { useState, useEffect, useRef } from "react";
import { useInView } from "framer-motion";

interface DecodingTextProps {
  text: string;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
  speed?: number;
}

const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*<>[]{}";

const DecodingText = ({
  text,
  className = "",
  style = {},
  delay = 0,
  speed = 50,
}: DecodingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [isDecoding, setIsDecoding] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;

    const timeout = setTimeout(() => {
      setIsDecoding(true);
    }, delay);

    return () => clearTimeout(timeout);
  }, [isInView, delay]);

  useEffect(() => {
    if (!isDecoding) return;

    let iteration = 0;
    const maxIterations = text.length;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join("")
      );

      iteration += 1 / 3;

      if (iteration >= maxIterations) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [isDecoding, text, speed]);

  return (
    <span ref={ref} className={className} style={style}>
      {isDecoding ? displayText : text.replace(/./g, " ")}
    </span>
  );
};

export default DecodingText;
