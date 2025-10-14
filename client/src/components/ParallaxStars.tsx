import { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const ParallaxStars = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  // Different parallax speeds for depth layers
  const y1 = useTransform(scrollY, [0, 1000], [0, -100]);
  const y2 = useTransform(scrollY, [0, 1000], [0, -200]);
  const y3 = useTransform(scrollY, [0, 1000], [0, -300]);

  const generateStars = (count: number, size: string) => {
    return Array.from({ length: count }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      animationDelay: Math.random() * 3,
      animationDuration: 2 + Math.random() * 2,
    }));
  };

  const smallStars = generateStars(50, '1px');
  const mediumStars = generateStars(30, '2px');
  const largeStars = generateStars(20, '3px');

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {/* Small stars - fastest parallax */}
      <motion.div style={{ y: y3 }} className="absolute inset-0">
        {smallStars.map((star) => (
          <div
            key={`small-${star.id}`}
            className="absolute w-px h-px animate-pulse-glow"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              backgroundColor: 'var(--cyber-cyan)',
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Medium stars - medium parallax */}
      <motion.div style={{ y: y2 }} className="absolute inset-0">
        {mediumStars.map((star) => (
          <div
            key={`medium-${star.id}`}
            className="absolute w-0.5 h-0.5 animate-pulse-glow"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              backgroundColor: 'var(--electric-blue)',
              borderRadius: '50%',
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Large stars - slow parallax */}
      <motion.div style={{ y: y1 }} className="absolute inset-0">
        {largeStars.map((star) => (
          <div
            key={`large-${star.id}`}
            className="absolute w-1 h-1 animate-pulse-glow"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              backgroundColor: 'var(--off-white)',
              borderRadius: '50%',
              animationDelay: `${star.animationDelay}s`,
              animationDuration: `${star.animationDuration}s`,
            }}
          />
        ))}
      </motion.div>

      {/* Subtle nebula effect */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse-glow"
          style={{
            background: `radial-gradient(circle, var(--cyber-cyan)/10 0%, transparent 70%)`,
            animationDuration: '8s',
          }}
        />
        <div 
          className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full blur-3xl animate-pulse-glow"
          style={{
            background: `radial-gradient(circle, var(--electric-blue)/10 0%, transparent 70%)`,
            animationDuration: '12s',
            animationDelay: '4s',
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxStars;