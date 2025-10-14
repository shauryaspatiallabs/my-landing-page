import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { 
  Building, 
  Network, 
  Smartphone, 
  ChevronDown, 
  Award, 
  Phone, 
  Mail, 
  MapPin, 
  Linkedin, 
  Github, 
  Twitter,
  Layers,
  Database,
  Brain,
  Zap,
  Map,
  Globe as GlobeIcon,
  Satellite,
  Rocket,
  Users
} from "lucide-react";
import { SiPython, SiReact, SiNodedotjs, SiAmazonwebservices, SiDocker } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import EnhancedGlobe from "@/components/EnhancedGlobe";
import CodeRain from "@/components/CodeRain";
import ServiceCard from "@/components/ServiceCard";
import TechCard from "@/components/TechCard";
import LiveEarthquakeMap from "@/components/LiveEarthquakeMap";
import ParallaxStars from "@/components/ParallaxStars";
import TypewriterText from "@/components/TypewriterText";
import MetricsCounter from "@/components/MetricsCounter";
import SkillsGrid from "@/components/SkillsGrid";
import FloatingActionButton from "@/components/FloatingActionButton";
import InteractiveTimeline from "@/components/InteractiveTimeline";

const Home = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, -50]);
  const y2 = useTransform(scrollY, [0, 300], [0, -25]);

  const [liveDataStats, setLiveDataStats] = useState({
    dataPoints: 1247,
    activeConnections: 89
  });

  useEffect(() => {
    // Simulate live data updates
    const interval = setInterval(() => {
      setLiveDataStats(prev => ({
        dataPoints: prev.dataPoints + Math.floor(Math.random() * 10) - 5,
        activeConnections: prev.activeConnections + Math.floor(Math.random() * 6) - 3
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[var(--deep-navy)] text-[var(--off-white)] overflow-x-hidden">
      <ParallaxStars />
      <Navigation />
      <CodeRain />

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen grid-bg overflow-hidden">
        <EnhancedGlobe />
        
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 md:mb-6 animate-float leading-tight"
              style={{ fontFamily: 'Space Grotesk' }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
            >
              <span style={{ color: 'var(--cyber-cyan)' }}>Shaurya Spatial Labs</span>
            </motion.h1>
            
            <motion.h2 
              className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium mb-6 md:mb-8"
              style={{ fontFamily: 'Space Grotesk', color: 'var(--light-gray)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <TypewriterText 
                texts={[
                  "Premium Geospatial Solutions Architecture & Development",
                  "Enterprise-Scale GIS Implementation",
                  "Real-Time Spatial Data Processing",
                  "Advanced Earth Engine Analytics"
                ]}
                speed={60}
                deleteSpeed={30}
                delayBetween={3000}
              />
            </motion.h2>
            
            <motion.p 
              className="text-base sm:text-lg md:text-xl lg:text-xl mb-8 md:mb-12 max-w-3xl mx-auto leading-relaxed px-2 sm:px-0"
              style={{ color: 'var(--off-white)' }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              Shaurya Spatial Labs delivers end-to-end GIS and geospatial solution architecture for enterprises of any scale. 
              Leveraging 7+ years of expertise in ArcGIS Enterprise, Google Earth Engine, and 
              cutting-edge automation to provide personalized geospatial solutions that drive operational excellence.
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center px-4 sm:px-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.6 }}
            >
              <Button 
                className="btn-responsive font-semibold rounded-lg animate-glow touch-target"
                style={{ 
                  backgroundColor: 'var(--cyber-cyan)', 
                  color: 'var(--deep-navy)' 
                }}
              >
                Start Your Project
              </Button>
              <Button 
                variant="outline"
                className="btn-responsive font-semibold rounded-lg transition-all duration-300 touch-target"
                style={{ 
                  borderColor: 'var(--cyber-cyan)', 
                  color: 'var(--cyber-cyan)' 
                }}
              >
                Explore Solutions
              </Button>
            </motion.div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <motion.div 
            className="animate-bounce"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown className="text-2xl" style={{ color: 'var(--cyber-cyan)' }} />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-12 md:py-16 lg:py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div 
              className="space-y-8"
              style={{ y: y1 }}
            >
              <div>
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Space Grotesk', color: 'var(--cyber-cyan)' }}>
                  Meet the Architect
                </h2>
                <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--cyber-cyan)' }}></div>
              </div>
              
              <div className="flex flex-col items-center space-y-6">
                {/* Profile Picture */}
                <div className="mb-6">
                  <img 
                    src="https://i.ibb.co/HfCxm1Cg/1000021829.jpg"
                    alt="Shaurya Arora - Profile" 
                    className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 rounded-full object-cover border-4 shadow-lg"
                    style={{ borderColor: 'var(--cyber-cyan)' }}
                  />
                </div>
                
                <h3 className="text-2xl sm:text-3xl md:text-3xl lg:text-4xl font-semibold" style={{ fontFamily: 'Space Grotesk', color: 'var(--off-white)' }}>
                  Shaurya Arora
                </h3>
                <p className="text-lg sm:text-xl md:text-xl lg:text-2xl font-medium" style={{ color: 'var(--electric-blue)' }}>
                  Founder & Lead Architect
                </p>
                
                <div className="flex items-center space-x-3">
                  <Award className="text-xl" style={{ color: 'var(--cyber-cyan)' }} />
                  <span className="text-lg font-semibold">7+ Years of Excellence</span>
                </div>
              </div>
              
              <p className="text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed text-center max-w-3xl mx-auto px-4 sm:px-0" style={{ color: 'var(--light-gray)' }}>
                Pioneering the future of geospatial technology with innovative solutions that transform 
                how enterprises understand and interact with spatial data. From enterprise-scale GIS 
                implementations to cutting-edge Earth Engine applications, every project is architected 
                for scalability, performance, and operational excellence.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-sm sm:max-w-md mx-auto mb-8 px-4 sm:px-0">
                <Card className="glass-morphism p-6">
                  <MetricsCounter 
                    end={100}
                    suffix="+"
                    label="Projects Delivered"
                    duration={2500}
                  />
                </Card>
                <Card className="glass-morphism p-6">
                  <MetricsCounter 
                    end={50}
                    suffix="+"
                    label="Enterprise Clients"
                    duration={2000}
                  />
                </Card>
              </div>
              
              <div className="max-w-4xl mx-auto">
                <SkillsGrid />
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-12 md:py-16 lg:py-24 relative" style={{ backgroundColor: 'var(--charcoal)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Space Grotesk', color: 'var(--cyber-cyan)' }}>
              Specialized Services
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--cyber-cyan)' }}></div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--light-gray)' }}>
              Comprehensive geospatial solutions tailored to your enterprise needs
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={<Building className="text-2xl" style={{ color: 'var(--cyber-cyan)' }} />}
                title="Enterprise Architecture"
                description="Scalable GIS infrastructure design and implementation for large-scale operations with comprehensive enterprise-grade solutions."
                visualization={
                  <div className="grid grid-cols-3 gap-2 opacity-60">
                    {[...Array(6)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-8 h-8 rounded animate-pulse-glow"
                        style={{ 
                          backgroundColor: i % 2 === 0 ? 'var(--cyber-cyan)' : 'var(--electric-blue)',
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={<Network className="text-2xl" style={{ color: 'var(--cyber-cyan)' }} />}
                title="Utility Network Solutions"
                description="Advanced utility network modeling and analysis for smart grid implementations with real-time monitoring capabilities."
                visualization={
                  <svg width="120" height="80" className="opacity-60">
                    {[
                      { cx: 20, cy: 20, delay: 0 },
                      { cx: 60, cy: 20, delay: 0.3 },
                      { cx: 100, cy: 20, delay: 0.6 },
                      { cx: 40, cy: 60, delay: 0.9 },
                      { cx: 80, cy: 60, delay: 1.2 },
                    ].map((point, i) => (
                      <circle 
                        key={i}
                        cx={point.cx} 
                        cy={point.cy} 
                        r="4" 
                        fill={i % 2 === 0 ? "var(--cyber-cyan)" : "var(--electric-blue)"}
                        className="animate-pulse-glow"
                        style={{ animationDelay: `${point.delay}s` }}
                      />
                    ))}
                    <line x1="20" y1="20" x2="60" y2="20" stroke="var(--cyber-cyan)" strokeWidth="1" opacity="0.6"/>
                    <line x1="60" y1="20" x2="100" y2="20" stroke="var(--cyber-cyan)" strokeWidth="1" opacity="0.6"/>
                    <line x1="40" y1="60" x2="80" y2="60" stroke="var(--cyber-cyan)" strokeWidth="1" opacity="0.6"/>
                    <line x1="30" y1="30" x2="50" y2="50" stroke="var(--cyber-cyan)" strokeWidth="1" opacity="0.6"/>
                    <line x1="70" y1="30" x2="70" y2="50" stroke="var(--cyber-cyan)" strokeWidth="1" opacity="0.6"/>
                  </svg>
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={<Smartphone className="text-2xl" style={{ color: 'var(--cyber-cyan)' }} />}
                title="Mobile GIS Ecosystem"
                description="Field-ready mobile applications with offline capabilities. Real-time data collection and synchronization across distributed teams and field operations."
                visualization={
                  <div 
                    className="w-20 h-32 rounded-lg border relative"
                    style={{ 
                      background: `linear-gradient(to bottom, var(--cyber-cyan)/30, var(--electric-blue)/30)`,
                      borderColor: 'var(--cyber-cyan)'
                    }}
                  >
                    <div 
                      className="absolute inset-2 rounded"
                      style={{ backgroundColor: 'var(--deep-navy)' }}
                    >
                      {[
                        { top: '8px', left: '8px', delay: 0 },
                        { top: '8px', right: '8px', delay: 0.5 },
                        { bottom: '8px', left: '8px', delay: 1 },
                        { bottom: '8px', right: '8px', delay: 1.5 },
                      ].map((pos, i) => (
                        <div 
                          key={i}
                          className="w-2 h-2 rounded-full absolute animate-pulse-glow"
                          style={{
                            backgroundColor: i % 2 === 0 ? 'var(--cyber-cyan)' : 'var(--electric-blue)',
                            animationDelay: `${pos.delay}s`,
                            ...pos
                          }}
                        />
                      ))}
                    </div>
                  </div>
                }
              />
            </motion.div>
          </div>
          
          {/* Additional Services Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={<GlobeIcon className="text-2xl" style={{ color: 'var(--cyber-cyan)' }} />}
                title="Google Earth Engine Solutions"
                description="Cloud-based planetary analysis and satellite imagery processing with advanced machine learning capabilities."
                visualization={
                  <div className="relative w-24 h-16 rounded-lg overflow-hidden" style={{ backgroundColor: 'var(--deep-navy)' }}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-10 rounded border-2 animate-pulse-glow" style={{ borderColor: 'var(--cyber-cyan)' }}>
                        <div className="w-full h-full bg-gradient-to-r from-cyber-cyan/20 to-electric-blue/20 rounded"></div>
                      </div>
                    </div>
                    <div className="absolute top-1 right-1 w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--cyber-cyan)' }}></div>
                    <div className="absolute bottom-1 left-1 w-2 h-2 rounded-full animate-pulse-glow" style={{ backgroundColor: 'var(--electric-blue)' }}></div>
                  </div>
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={<Layers className="text-2xl" style={{ color: 'var(--cyber-cyan)' }} />}
                title="Desktop GIS Solutions"
                description="ArcGIS Pro and ArcMap integration for comprehensive desktop workflows and advanced spatial analysis."
                visualization={
                  <div className="grid grid-cols-2 gap-1 opacity-60">
                    {[...Array(4)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-10 h-6 rounded animate-pulse-glow"
                        style={{ 
                          backgroundColor: i % 2 === 0 ? 'var(--cyber-cyan)' : 'var(--electric-blue)',
                          animationDelay: `${i * 0.3}s`
                        }}
                      />
                    ))}
                  </div>
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={<Database className="text-2xl" style={{ color: 'var(--cyber-cyan)' }} />}
                title="Spatial Database Solutions"
                description="PostgreSQL/PostGIS implementation with advanced spatial indexing and real-time data processing."
                visualization={
                  <div className="flex space-x-1 opacity-60">
                    {[...Array(5)].map((_, i) => (
                      <div 
                        key={i}
                        className="w-3 rounded animate-pulse-glow"
                        style={{ 
                          height: `${20 + i * 8}px`,
                          backgroundColor: i % 2 === 0 ? 'var(--cyber-cyan)' : 'var(--electric-blue)',
                          animationDelay: `${i * 0.2}s`
                        }}
                      />
                    ))}
                  </div>
                }
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                icon={<Users className="text-2xl" style={{ color: 'var(--cyber-cyan)' }} />}
                title="Spatial CRM Solutions"
                description="Customer Relationship Management systems enhanced with geospatial capabilities for location-based insights and territory management."
                visualization={
                  <div className="relative w-24 h-16">
                    {/* Customer locations */}
                    {[
                      { x: 8, y: 8, size: 'w-2 h-2', delay: 0 },
                      { x: 16, y: 4, size: 'w-3 h-3', delay: 0.2 },
                      { x: 4, y: 12, size: 'w-2 h-2', delay: 0.4 },
                      { x: 20, y: 10, size: 'w-2 h-2', delay: 0.6 },
                    ].map((point, i) => (
                      <div 
                        key={i}
                        className={`${point.size} rounded-full absolute animate-pulse-glow`}
                        style={{
                          left: `${point.x * 4}px`,
                          top: `${point.y * 4}px`,
                          backgroundColor: i % 2 === 0 ? 'var(--cyber-cyan)' : 'var(--electric-blue)',
                          animationDelay: `${point.delay}s`
                        }}
                      />
                    ))}
                    {/* Connection lines */}
                    <svg className="absolute inset-0 w-full h-full opacity-40">
                      <line x1="32" y1="32" x2="64" y2="16" stroke="var(--cyber-cyan)" strokeWidth="1"/>
                      <line x1="32" y1="32" x2="16" y2="48" stroke="var(--cyber-cyan)" strokeWidth="1"/>
                      <line x1="32" y1="32" x2="80" y2="40" stroke="var(--cyber-cyan)" strokeWidth="1"/>
                    </svg>
                  </div>
                }
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Live Data Showcase */}
      <section className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Space Grotesk', color: 'var(--cyber-cyan)' }}>
              Live Data Capabilities
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto mb-6 md:mb-8" style={{ backgroundColor: 'var(--cyber-cyan)' }}></div>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 sm:px-0" style={{ color: 'var(--light-gray)' }}>
              Real-time geospatial data processing and visualization demonstrations
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12 md:mb-16">
            <motion.div 
              className="glass-morphism rounded-2xl p-4 sm:p-6 md:p-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden" style={{ background: `linear-gradient(to bottom right, var(--deep-navy), var(--charcoal))` }}>
                <img 
                  src="https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&h=600" 
                  alt="Global satellite view of Earth at night" 
                  className="w-full h-full object-cover opacity-70"
                />
                
                <div className="absolute inset-0">
                  {[
                    { top: '20%', left: '32%', name: 'New York', delay: 0 },
                    { top: '24%', left: '80%', name: 'London', delay: 0.5 },
                    { top: '32%', right: '48%', name: 'Tokyo', delay: 1 },
                    { bottom: '32%', left: '48%', name: 'São Paulo', delay: 1.5 },
                    { top: '40%', right: '80%', name: 'Mumbai', delay: 2 },
                  ].map((point, i) => (
                    <div 
                      key={i}
                      className="absolute w-4 h-4 rounded-full animate-pulse-glow cursor-pointer"
                      style={{
                        backgroundColor: i % 2 === 0 ? 'var(--cyber-cyan)' : 'var(--electric-blue)',
                        animationDelay: `${point.delay}s`,
                        ...point
                      }}
                      title={point.name}
                    />
                  ))}
                </div>
                
                <div className="absolute bottom-4 left-4 glass-morphism rounded-lg p-4">
                  <div className="text-sm mb-1" style={{ color: 'var(--cyber-cyan)' }}>Live Data Points</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--off-white)' }}>
                    <MetricsCounter end={liveDataStats.dataPoints} duration={1000} label="" />
                  </div>
                </div>
                
                <div className="absolute bottom-4 right-4 glass-morphism rounded-lg p-4">
                  <div className="text-sm mb-1" style={{ color: 'var(--electric-blue)' }}>Active Connections</div>
                  <div className="text-2xl font-bold" style={{ color: 'var(--off-white)' }}>
                    <MetricsCounter end={liveDataStats.activeConnections} duration={800} label="" />
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <LiveEarthquakeMap />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies Section */}
      <section id="technologies" className="section-padding relative" style={{ backgroundColor: 'var(--charcoal)' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6" style={{ fontFamily: 'Space Grotesk', color: 'var(--cyber-cyan)' }}>
              Technology Stack
            </h2>
            <div className="w-16 sm:w-20 md:w-24 h-1 mx-auto mb-6 md:mb-8" style={{ backgroundColor: 'var(--cyber-cyan)' }}></div>
            <p className="text-base sm:text-lg md:text-xl max-w-3xl mx-auto px-4 sm:px-0" style={{ color: 'var(--light-gray)' }}>
              Cutting-edge tools and platforms powering next-generation geospatial solutions
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6 md:gap-8">
            {[
              { icon: <Layers />, name: "ArcGIS Enterprise" },
              { icon: <GlobeIcon />, name: "Earth Engine" },
              { icon: <SiPython />, name: "Python" },
              { icon: <Database />, name: "PostgreSQL" },
              { icon: <SiAmazonwebservices />, name: "AWS" },
              { icon: <SiDocker />, name: "Docker" },
              { icon: <SiReact />, name: "React" },
              { icon: <SiNodedotjs />, name: "Node.js" },
              { icon: <Map />, name: "QGIS" },
              { icon: <Brain />, name: "TensorFlow" },
              { icon: <Network />, name: "Kubernetes" },
              { icon: <Zap />, name: "Apache Spark" },
            ].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <TechCard icon={tech.icon} name={tech.name} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section-padding relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk', color: 'var(--cyber-cyan)' }}>
              Let's Build the Future
            </h2>
            <div className="w-24 h-1 mx-auto mb-8" style={{ backgroundColor: 'var(--cyber-cyan)' }}></div>
            <p className="text-xl max-w-3xl mx-auto" style={{ color: 'var(--light-gray)' }}>
              Ready to transform your geospatial capabilities? Connect with our expert team today.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-6">
                {[
                  { icon: <Mail />, label: "Email", value: "shaurya@shauryaspatiallabs.com" },
                  { icon: <Phone />, label: "Phone", value: "+91-9719100707" },
                  { icon: <MapPin />, label: "Location", value: "Noida, India" },
                ].map((contact, i) => (
                  <div 
                    key={i} 
                    className={`flex items-center space-x-4 ${contact.label !== 'Location' ? 'cursor-pointer hover:bg-gray-800/20 p-3 rounded-lg transition-all duration-300' : 'p-3'}`}
                    onClick={() => {
                      if (contact.label === 'Email') {
                        window.open("mailto:shaurya@shauryaspatiallabs.com?subject=Project Discussion - Geospatial Solutions&body=Hello Shaurya Spatial Labs,%0D%0A%0D%0AI would like to discuss a geospatial project with your team.%0D%0A%0D%0AProject Details:%0D%0A-%0D%0A-%0D%0A-%0D%0A%0D%0ABest regards");
                      } else if (contact.label === 'Phone') {
                        window.open("tel:+919719100707");
                      }
                    }}
                  >
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ backgroundColor: 'var(--cyber-cyan)/20' }}>
                      <span style={{ color: 'var(--cyber-cyan)' }}>{contact.icon}</span>
                    </div>
                    <div>
                      <div className="text-sm" style={{ color: 'var(--light-gray)' }}>{contact.label}</div>
                      <div className="text-lg font-medium" style={{ color: 'var(--off-white)' }}>{contact.value}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full px-8 py-4 font-semibold rounded-lg animate-glow touch-target"
                  style={{ backgroundColor: 'var(--cyber-cyan)', color: 'var(--deep-navy)' }}
                  onClick={() => window.open("tel:+919719100707")}
                >
                  <Phone className="mr-3" />
                  Call Now for Consultation
                </Button>
                
                <Button 
                  variant="outline"
                  className="w-full px-8 py-4 font-semibold rounded-lg transition-all duration-300 touch-target"
                  style={{ borderColor: 'var(--cyber-cyan)', color: 'var(--cyber-cyan)' }}
                  onClick={() => window.open("mailto:shaurya@shauryaspatiallabs.com?subject=Project Discussion - Geospatial Solutions&body=Hello Shaurya Spatial Labs,%0D%0A%0D%0AI would like to discuss a geospatial project with your team.%0D%0A%0D%0AProject Details:%0D%0A-%0D%0A-%0D%0A-%0D%0A%0D%0ABest regards")}
                >
                  <Mail className="mr-3" />
                  Email for Project Discussion
                </Button>
              </div>
              
              <div className="flex space-x-6 justify-center">
                {[
                  { icon: <Linkedin />, href: "#" },
                  { icon: <Github />, href: "#" },
                  { icon: <Twitter />, href: "#" },
                ].map((social, i) => (
                  <a 
                    key={i}
                    href={social.href}
                    className="w-12 h-12 glass-morphism rounded-lg flex items-center justify-center hover:border-[var(--cyber-cyan)] transition-all duration-300"
                  >
                    <span style={{ color: 'var(--cyber-cyan)' }}>{social.icon}</span>
                  </a>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <img 
                src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Futuristic command center with data visualization screens" 
                className="rounded-xl shadow-2xl w-full h-auto"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-[var(--cyber-cyan)]/20 to-transparent rounded-xl"></div>
              
              <div className="absolute inset-0 glass-morphism rounded-xl opacity-0 hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                <div className="text-center p-8">
                  <Rocket className="text-4xl mb-4 mx-auto" style={{ color: 'var(--cyber-cyan)' }} />
                  <h3 className="text-2xl font-bold mb-2" style={{ fontFamily: 'Space Grotesk' }}>Ready to Launch?</h3>
                  <p style={{ color: 'var(--light-gray)' }}>Let's discuss your next geospatial project</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t" style={{ borderColor: 'var(--cyber-cyan)/20' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: 'Space Grotesk', color: 'var(--cyber-cyan)' }}>
              Shaurya Spatial Labs
            </h3>
            <p className="mb-6" style={{ color: 'var(--light-gray)' }}>
              Architecting the Future of Geospatial Technology
            </p>
            <div className="text-sm" style={{ color: 'var(--light-gray)' }}>
              © 2025 Shaurya Spatial Labs. All rights reserved. | Transforming spatial data into intelligent solutions.
            </div>
          </div>
        </div>
      </footer>
      
      <FloatingActionButton />
    </div>
  );
};

export default Home;
