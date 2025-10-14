import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Award, Rocket } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  category: "milestone" | "project" | "award" | "innovation";
  details?: string[];
}

const InteractiveTimeline = () => {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null);

  const events: TimelineEvent[] = [
    {
      year: "2017",
      title: "Founded Shaurya Spatial Labs",
      description: "Started with a vision to revolutionize geospatial solutions",
      icon: <Rocket className="w-5 h-5" />,
      category: "milestone",
      details: [
        "Established core team of GIS experts",
        "Developed first enterprise solution",
        "Secured initial client partnerships"
      ]
    },
    {
      year: "2019",
      title: "Major Enterprise Deployment",
      description: "Successfully deployed large-scale GIS infrastructure for Fortune 500 company",
      icon: <MapPin className="w-5 h-5" />,
      category: "project",
      details: [
        "100+ concurrent users supported",
        "Real-time data processing pipeline",
        "99.9% uptime achieved"
      ]
    },
    {
      year: "2021",
      title: "Innovation Excellence Award",
      description: "Recognized for breakthrough in Earth Engine automation",
      icon: <Award className="w-5 h-5" />,
      category: "award",
      details: [
        "Advanced satellite imagery processing",
        "Machine learning integration",
        "Industry recognition for innovation"
      ]
    },
    {
      year: "2023",
      title: "Cloud-Native Architecture",
      description: "Launched next-generation cloud-native geospatial platform",
      icon: <Calendar className="w-5 h-5" />,
      category: "innovation",
      details: [
        "Serverless architecture implementation",
        "Auto-scaling data processing",
        "Global deployment capabilities"
      ]
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "milestone": return "var(--cyber-cyan)";
      case "project": return "var(--electric-blue)";
      case "award": return "#ffd700";
      case "innovation": return "#ff6b6b";
      default: return "var(--cyber-cyan)";
    }
  };

  return (
    <Card className="glass-morphism p-8">
      <h3 className="text-2xl font-bold mb-8 text-center" style={{ color: 'var(--off-white)' }}>
        Journey of Innovation
      </h3>
      
      <div className="relative">
        {/* Timeline line */}
        <div 
          className="absolute left-8 top-0 w-0.5 h-full"
          style={{ backgroundColor: 'var(--cyber-cyan)', opacity: 0.3 }}
        />
        
        <div className="space-y-8">
          {events.map((event, index) => (
            <motion.div
              key={index}
              className="relative flex items-start space-x-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
            >
              {/* Timeline dot */}
              <div 
                className="relative z-10 w-16 h-16 rounded-full flex items-center justify-center border-4 animate-pulse-glow"
                style={{ 
                  backgroundColor: getCategoryColor(event.category),
                  borderColor: 'var(--deep-navy)'
                }}
              >
                <div style={{ color: 'var(--deep-navy)' }}>
                  {event.icon}
                </div>
              </div>
              
              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <span 
                    className="text-2xl font-bold"
                    style={{ color: getCategoryColor(event.category) }}
                  >
                    {event.year}
                  </span>
                  <div 
                    className="px-3 py-1 rounded-full text-xs font-medium"
                    style={{ 
                      backgroundColor: getCategoryColor(event.category) + '20',
                      color: getCategoryColor(event.category)
                    }}
                  >
                    {event.category.toUpperCase()}
                  </div>
                </div>
                
                <h4 className="text-lg font-semibold mb-2" style={{ color: 'var(--off-white)' }}>
                  {event.title}
                </h4>
                
                <p className="text-sm mb-4" style={{ color: 'var(--light-gray)' }}>
                  {event.description}
                </p>
                
                {event.details && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
                    style={{ 
                      borderColor: getCategoryColor(event.category),
                      color: getCategoryColor(event.category)
                    }}
                  >
                    {selectedEvent === index ? "Hide Details" : "Show Details"}
                  </Button>
                )}
                
                <AnimatePresence>
                  {selectedEvent === index && event.details && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-4 space-y-2"
                    >
                      {event.details.map((detail, detailIndex) => (
                        <motion.div
                          key={detailIndex}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: detailIndex * 0.1 }}
                          className="flex items-center space-x-2"
                        >
                          <div 
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: getCategoryColor(event.category) }}
                          />
                          <span className="text-sm" style={{ color: 'var(--light-gray)' }}>
                            {detail}
                          </span>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default InteractiveTimeline;