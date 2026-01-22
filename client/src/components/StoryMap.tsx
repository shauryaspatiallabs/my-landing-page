import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Navigation, Radar, Globe } from "lucide-react";

const StoryMap = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0.1, 0.2, 0.8, 0.9], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.1, 0.9], [0.8, 1]);

  const stages = [
    {
      title: "From Pocket...",
      subtitle: "Personal Navigation",
      description: "It starts with a blue dot. Your GPS receiver triangulates signals from 4+ satellites to pinpoint your location with 5-meter accuracy.",
      icon: MapPin,
      color: "var(--cyber-cyan)",
      image: "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83?auto=format&fit=crop&w=800&q=80" // Placeholder or use local if available
    },
    {
      title: "...To City",
      subtitle: "Urban Intelligence",
      description: "Those dots aggregate into traffic flows, delivery routes, and utility grids. GIS optimizes the pulse of the metropolis.",
      icon: Navigation,
      color: "var(--electric-blue)",
      image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "...To Nation",
      subtitle: "Strategic Defense",
      description: "Across borders, geospatial intelligence guides assets, monitors security, and manages critical infrastructure resources.",
      icon: Radar,
      color: "#a855f7",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80"
    },
    {
      title: "...To Planetary",
      subtitle: "Global Sustainment",
      description: "Ultimately, we monitor the Earth's vital signs—climate change, deforestation, and water resources—to secure our collective future.",
      icon: Globe,
      color: "#22c55e",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80" 
    }
  ];

  return (
    <section 
      ref={containerRef} 
      className="py-24 relative overflow-hidden" 
      style={{ backgroundColor: 'var(--deep-navy)' }}
    >
      <div className="absolute inset-0 bg-[url('/images/satellite-earth.jpg')] bg-cover bg-center opacity-10 fixed-bg"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10">
        <motion.div 
          className="text-center mb-16"
          style={{ opacity }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: 'var(--cyber-cyan)' }}>
            The Silent Pulse of the World
          </h2>
          <div className="w-24 h-1 mx-auto mb-6" style={{ backgroundColor: 'var(--cyber-cyan)' }}></div>
          <p className="text-xl max-w-2xl mx-auto" style={{ color: 'var(--light-gray)' }}>
            How geospatial intelligence powers everything from your morning commute to global security.
          </p>
        </motion.div>

        <div className="space-y-32">
          {stages.map((stage, index) => {
            const isEven = index % 2 === 0;
            return (
              <motion.div 
                key={index}
                className={`flex flex-col ${isEven ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-12`}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
              >
                <div className="flex-1 space-y-6">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 rounded-lg glass-morphism" style={{ borderColor: stage.color }}>
                      <stage.icon className="w-8 h-8" style={{ color: stage.color }} />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold tracking-widest uppercase" style={{ color: stage.color }}>{stage.title}</h3>
                      <h4 className="text-3xl md:text-4xl font-bold mt-1" style={{ fontFamily: 'Space Grotesk' }}>{stage.subtitle}</h4>
                    </div>
                  </div>
                  
                  <p className="text-lg leading-relaxed md:text-xl" style={{ color: 'var(--light-gray)' }}>
                    {stage.description}
                  </p>
                  
                  <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                </div>

                <div className="flex-1 w-full">
                  <div className="relative aspect-video rounded-xl overflow-hidden glass-morphism p-2 group">
                    <div className="absolute inset-0 bg-gradient-to-tr from-[var(--cyber-cyan)]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                    
                    {/* Placeholder for actual image implementation - using colored divs if images fail */}
                    <div className="w-full h-full rounded-lg bg-gray-900 relative overflow-hidden">
                       <img 
                          src={stage.image} 
                          alt={stage.subtitle}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                        />
                       
                       {/* Overlay UI elements */}
                       <div className="absolute top-4 left-4 flex space-x-2">
                         <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
                         <div className="text-xs font-mono text-white/70">LIVE FEED</div>
                       </div>
                       
                       <div className="absolute bottom-4 right-4 text-xs font-mono text-white/70">
                         LAT: {(34.0522 + index).toFixed(4)} N <br/>
                         LNG: {(-118.2437 + index).toFixed(4)} W
                       </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StoryMap;
