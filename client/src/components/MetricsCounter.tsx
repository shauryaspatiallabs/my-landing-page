import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface MetricsCounterProps {
  end: number;
  duration?: number;
  label: string;
  prefix?: string;
  suffix?: string;
  className?: string;
}

const MetricsCounter = ({ 
  end, 
  duration = 2000, 
  label, 
  prefix = "", 
  suffix = "",
  className = ""
}: MetricsCounterProps) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (!isInView) return;

    let startTime: number;
    let animationFrame: number;

    const animate = (currentTime: number) => {
      if (startTime === undefined) {
        startTime = currentTime;
      }

      const progress = Math.min((currentTime - startTime) / duration, 1);
      
      // Easing function for smooth animation
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentCount = Math.floor(easeOut * end);
      
      setCount(currentCount);

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [end, duration, isInView]);

  return (
    <motion.div 
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center">
        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--cyber-cyan)' }}>
          {prefix}{count.toLocaleString()}{suffix}
        </div>
        <div className="text-sm" style={{ color: 'var(--light-gray)' }}>
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default MetricsCounter;