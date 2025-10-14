import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { 
  Database, 
  Globe as GlobeIcon, 
  Layers, 
  Smartphone, 
  Cloud, 
  MapPin 
} from "lucide-react";

interface Skill {
  name: string;
  level: number; // 0-100
  icon: React.ReactNode;
  description: string;
  color: string;
}

const SkillsGrid = () => {
  const skills: Skill[] = [
    { 
      name: "ArcGIS Enterprise", 
      level: 95, 
      icon: <Layers className="w-6 h-6" />,
      description: "Enterprise GIS infrastructure & deployment",
      color: "var(--cyber-cyan)" 
    },
    { 
      name: "Google Earth Engine", 
      level: 90, 
      icon: <GlobeIcon className="w-6 h-6" />,
      description: "Cloud-based planetary analysis",
      color: "var(--electric-blue)" 
    },
    { 
      name: "Python/GIS", 
      level: 92, 
      icon: <Database className="w-6 h-6" />,
      description: "Geospatial data processing & automation",
      color: "var(--cyber-cyan)" 
    },
    { 
      name: "Cloud Architecture", 
      level: 85, 
      icon: <Cloud className="w-6 h-6" />,
      description: "Scalable spatial solutions deployment",
      color: "var(--electric-blue)" 
    },
    { 
      name: "Mobile GIS", 
      level: 80, 
      icon: <Smartphone className="w-6 h-6" />,
      description: "Field data collection solutions",
      color: "var(--cyber-cyan)" 
    },
    { 
      name: "Spatial Analytics", 
      level: 88, 
      icon: <MapPin className="w-6 h-6" />,
      description: "Advanced geospatial analysis",
      color: "var(--electric-blue)" 
    },
  ];

  return (
    <Card className="glass-morphism p-6">
      <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: 'var(--off-white)' }}>
        Core Expertise Areas
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="relative p-4 rounded-lg border border-white/10 hover:border-white/20 transition-all duration-300"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-start space-x-3 mb-3">
              <div 
                className="p-2 rounded-lg"
                style={{ backgroundColor: skill.color + '20', color: skill.color }}
              >
                {skill.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-sm mb-1" style={{ color: 'var(--off-white)' }}>
                  {skill.name}
                </h4>
                <p className="text-xs" style={{ color: 'var(--light-gray)' }}>
                  {skill.description}
                </p>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold" style={{ color: skill.color }}>
                  {skill.level}%
                </div>
              </div>
            </div>
            
            {/* Progress bar */}
            <div className="w-full bg-white/10 rounded-full h-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: skill.color }}
                initial={{ width: 0 }}
                whileInView={{ width: `${skill.level}%` }}
                transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                viewport={{ once: true }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  );
};

export default SkillsGrid;