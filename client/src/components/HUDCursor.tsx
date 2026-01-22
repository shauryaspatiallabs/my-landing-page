import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const HUDCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
    };

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.classList.contains("interactive")
      ) {
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const handleMouseOut = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseover", handleMouseEnter);
    document.addEventListener("mouseout", handleMouseLeave);
    document.body.addEventListener("mouseleave", handleMouseOut);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handleMouseEnter);
      document.removeEventListener("mouseout", handleMouseLeave);
      document.body.removeEventListener("mouseleave", handleMouseOut);
    };
  }, []);

  if (typeof window !== "undefined" && window.innerWidth < 1024) {
    return null;
  }

  const activeColor = isHovering ? "#22c55e" : "var(--cyber-cyan)";

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed pointer-events-none z-[9999]"
          style={{ left: position.x, top: position.y }}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
        >
          <motion.div
            className="absolute -translate-x-1/2 -translate-y-1/2"
            animate={{ rotate: isHovering ? 45 : 0, scale: isHovering ? 1.5 : 1 }}
            transition={{ duration: 0.2 }}
          >
            <div
              className="w-8 h-8 rounded-full border-2 flex items-center justify-center"
              style={{ borderColor: activeColor, boxShadow: "0 0 10px " + activeColor }}
            >
              <div className="absolute w-3 h-[1px]" style={{ backgroundColor: activeColor, left: "-6px" }} />
              <div className="absolute w-3 h-[1px]" style={{ backgroundColor: activeColor, right: "-6px" }} />
              <div className="absolute w-[1px] h-3" style={{ backgroundColor: activeColor, top: "-6px" }} />
              <div className="absolute w-[1px] h-3" style={{ backgroundColor: activeColor, bottom: "-6px" }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: activeColor }} />
            </div>
          </motion.div>

          <motion.div
            className="absolute left-6 top-6 font-mono text-xs whitespace-nowrap"
            style={{ color: "var(--cyber-cyan)" }}
            animate={{ opacity: isHovering ? 0 : 0.8 }}
          >
            <div>X: {Math.round(position.x).toString().padStart(4, "0")}</div>
            <div>Y: {Math.round(position.y).toString().padStart(4, "0")}</div>
          </motion.div>

          <AnimatePresence>
            {isHovering && (
              <motion.div
                className="absolute left-6 top-4 font-mono text-xs"
                style={{ color: "#22c55e" }}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <motion.span animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>
                  TARGETING...
                </motion.span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default HUDCursor;
