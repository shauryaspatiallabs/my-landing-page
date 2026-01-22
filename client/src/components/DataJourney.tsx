import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Satellite, Cloud, Building2, Zap } from "lucide-react";

const DataJourney = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const beamProgress = useTransform(scrollYProgress, [0.1, 0.9], [0, 100]);
  const satelliteY = useTransform(scrollYProgress, [0, 0.3], [0, 50]);
  const cloudY = useTransform(scrollYProgress, [0.2, 0.5], [0, 30]);
  const cityY = useTransform(scrollYProgress, [0.4, 0.7], [0, 20]);
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const stages = [
    {
      icon: Satellite,
      title: "Data Acquisition",
      description: "Satellite imagery and sensor data collection from multiple sources",
      color: "var(--cyber-cyan)",
    },
    {
      icon: Cloud,
      title: "Cloud Processing",
      description: "Real-time processing through distributed computing infrastructure",
      color: "var(--electric-blue)",
    },
    {
      icon: Zap,
      title: "AI Analysis",
      description: "Machine learning models extract patterns and insights",
      color: "#a855f7",
    },
    {
      icon: Building2,
      title: "Actionable Intelligence",
      description: "Transformed data delivered to decision-makers in real-time",
      color: "#22c55e",
    },
  ];

  return (
    <section
      ref={containerRef}
      className="relative min-h-[200vh] overflow-hidden"
      style={{ backgroundColor: "var(--charcoal)" }}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{ y: bgY }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url('/images/satellite-earth.jpg')`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(var(--cyber-cyan) 1px, transparent 1px),
            linear-gradient(90deg, var(--cyber-cyan) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="sticky top-0 h-screen flex items-center justify-center">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-center mb-16"
            style={{ fontFamily: "Space Grotesk", color: "var(--cyber-cyan)" }}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            The Data Journey
          </motion.h2>

          {/* Data beam visualization */}
          <div className="relative flex flex-col items-center gap-8">
            {/* Central beam line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2">
              <motion.div
                className="absolute top-0 left-0 w-full rounded-full"
                style={{
                  height: beamProgress.get() + "%",
                  background: `linear-gradient(to bottom, var(--cyber-cyan), var(--electric-blue), #a855f7, #22c55e)`,
                  boxShadow: "0 0 20px var(--cyber-cyan), 0 0 40px var(--electric-blue)",
                }}
              />
              {/* Animated pulse */}
              <motion.div
                className="absolute w-4 h-4 -left-1.5 rounded-full"
                style={{
                  top: beamProgress.get() + "%",
                  backgroundColor: "var(--cyber-cyan)",
                  boxShadow: "0 0 20px var(--cyber-cyan)",
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                }}
              />
            </div>

            {/* Journey stages */}
            {stages.map((stage, index) => {
              const Icon = stage.icon;
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={stage.title}
                  className={`flex items-center gap-8 w-full ${
                    isLeft ? "flex-row" : "flex-row-reverse"
                  }`}
                  style={{
                    y: index === 0 ? satelliteY : index === 1 ? cloudY : cityY,
                  }}
                  initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className={`flex-1 ${isLeft ? "text-right" : "text-left"}`}>
                    <h3
                      className="text-xl md:text-2xl font-bold mb-2"
                      style={{ color: stage.color }}
                    >
                      {stage.title}
                    </h3>
                    <p
                      className="text-sm md:text-base"
                      style={{ color: "var(--light-gray)" }}
                    >
                      {stage.description}
                    </p>
                  </div>

                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center z-10"
                    style={{
                      backgroundColor: "var(--deep-navy)",
                      border: `2px solid ${stage.color}`,
                      boxShadow: `0 0 20px ${stage.color}40`,
                    }}
                  >
                    <Icon
                      className="w-8 h-8 md:w-10 md:h-10"
                      style={{ color: stage.color }}
                    />
                  </div>

                  <div className="flex-1" />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DataJourney;
