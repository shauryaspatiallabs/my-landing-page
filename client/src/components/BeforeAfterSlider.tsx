import { useState, useRef } from "react";
import { motion } from "framer-motion";

const BeforeAfterSlider = () => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  const handleMouseDown = () => {
    isDragging.current = true;
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging.current) {
      handleMove(e.clientX);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  return (
    <section className="py-16 md:py-24 relative" style={{ backgroundColor: "var(--deep-navy)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "Space Grotesk", color: "var(--cyber-cyan)" }}
          >
            The Spatial Advantage
          </h2>
          <p className="text-lg" style={{ color: "var(--light-gray)" }}>
            Drag to compare: Standard map vs. Geospatial Intelligence
          </p>
        </motion.div>

        <motion.div
          ref={containerRef}
          className="relative w-full aspect-video rounded-2xl overflow-hidden cursor-ew-resize select-none"
          style={{ boxShadow: "0 0 40px rgba(100, 255, 218, 0.2)" }}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          {/* Before (Standard Map) */}
          <div className="absolute inset-0">
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)",
              }}
            >
              {/* Simple grid pattern */}
              <div
                className="absolute inset-0 opacity-30"
                style={{
                  backgroundImage: "linear-gradient(#444 1px, transparent 1px), linear-gradient(90deg, #444 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Basic road lines */}
              <svg className="absolute inset-0 w-full h-full opacity-40">
                <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#666" strokeWidth="3" />
                <line x1="60%" y1="0" x2="60%" y2="100%" stroke="#666" strokeWidth="3" />
                <line x1="0" y1="40%" x2="100%" y2="40%" stroke="#666" strokeWidth="3" />
                <line x1="0" y1="70%" x2="100%" y2="70%" stroke="#666" strokeWidth="3" />
              </svg>
              <div className="absolute top-4 left-4 bg-black/50 px-3 py-1 rounded text-sm" style={{ color: "#888" }}>
                STANDARD VIEW
              </div>
            </div>
          </div>

          {/* After (Geospatial Intelligence) */}
          <div
            className="absolute inset-0"
            style={{ clipPath: "inset(0 0 0 " + sliderPosition + "%)" }}
          >
            <div
              className="w-full h-full"
              style={{
                background: "linear-gradient(135deg, var(--deep-navy) 0%, #0a192f 50%, #112240 100%)",
              }}
            >
              {/* Enhanced grid */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  backgroundImage: "linear-gradient(var(--cyber-cyan) 1px, transparent 1px), linear-gradient(90deg, var(--cyber-cyan) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />
              {/* Optimized routes */}
              <svg className="absolute inset-0 w-full h-full">
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--cyber-cyan)" />
                    <stop offset="100%" stopColor="var(--electric-blue)" />
                  </linearGradient>
                </defs>
                <path
                  d="M 10% 80% Q 30% 60% 50% 50% T 90% 20%"
                  stroke="url(#routeGradient)"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                  className="animate-pulse"
                />
                <path
                  d="M 5% 30% Q 25% 45% 45% 40% T 85% 70%"
                  stroke="var(--electric-blue)"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  opacity="0.7"
                />
              </svg>
              {/* Hotspots */}
              {[
                { x: "25%", y: "35%", size: 60, color: "#ef4444" },
                { x: "55%", y: "55%", size: 40, color: "#f97316" },
                { x: "75%", y: "25%", size: 50, color: "#22c55e" },
                { x: "40%", y: "70%", size: 35, color: "#3b82f6" },
              ].map((spot, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    left: spot.x,
                    top: spot.y,
                    width: spot.size,
                    height: spot.size,
                    backgroundColor: spot.color + "40",
                    border: "2px solid " + spot.color,
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: i * 0.3,
                  }}
                />
              ))}
              {/* Data labels */}
              <div className="absolute top-4 left-4 bg-black/70 px-3 py-1 rounded text-sm" style={{ color: "var(--cyber-cyan)" }}>
                GEOSPATIAL INTELLIGENCE
              </div>
              <div className="absolute bottom-4 right-4 bg-black/70 px-3 py-2 rounded text-xs space-y-1">
                <div style={{ color: "#22c55e" }}>Optimal Route: -23% distance</div>
                <div style={{ color: "#ef4444" }}>3 Hazard Zones Detected</div>
                <div style={{ color: "#3b82f6" }}>Real-time Traffic: Active</div>
              </div>
            </div>
          </div>

          {/* Slider handle */}
          <div
            className="absolute top-0 bottom-0 w-1 cursor-ew-resize"
            style={{
              left: sliderPosition + "%",
              transform: "translateX(-50%)",
              backgroundColor: "var(--cyber-cyan)",
              boxShadow: "0 0 20px var(--cyber-cyan)",
            }}
          >
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full flex items-center justify-center"
              style={{
                backgroundColor: "var(--deep-navy)",
                border: "2px solid var(--cyber-cyan)",
                boxShadow: "0 0 20px var(--cyber-cyan)",
              }}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M6 10L2 10M2 10L5 7M2 10L5 13" stroke="var(--cyber-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 10L18 10M18 10L15 7M18 10L15 13" stroke="var(--cyber-cyan)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BeforeAfterSlider;
