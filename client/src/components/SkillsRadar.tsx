import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

interface Skill {
  name: string;
  level: number; // 0-100
  color: string;
}

const SkillsRadar = () => {
  const skills: Skill[] = [
    { name: "ArcGIS Enterprise", level: 95, color: "var(--cyber-cyan)" },
    { name: "Google Earth Engine", level: 90, color: "var(--electric-blue)" },
    { name: "Python/GIS", level: 92, color: "var(--cyber-cyan)" },
    { name: "PostgreSQL/PostGIS", level: 88, color: "var(--electric-blue)" },
    { name: "Cloud Architecture", level: 85, color: "var(--cyber-cyan)" },
    { name: "Mobile GIS", level: 80, color: "var(--electric-blue)" },
  ];

  const radius = 80;
  const center = 100;
  
  const getPolygonPoints = (values: number[]) => {
    const angleStep = (2 * Math.PI) / values.length;
    return values.map((value, index) => {
      const angle = index * angleStep - Math.PI / 2; // Start from top
      const distance = (value / 100) * radius;
      const x = center + distance * Math.cos(angle);
      const y = center + distance * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');
  };

  const getAxisPoints = () => {
    const angleStep = (2 * Math.PI) / skills.length;
    return skills.map((_, index) => {
      const angle = index * angleStep - Math.PI / 2;
      const x = center + radius * Math.cos(angle);
      const y = center + radius * Math.sin(angle);
      return { x, y, angle, skill: skills[index] };
    });
  };

  const axisPoints = getAxisPoints();
  const skillLevels = skills.map(skill => skill.level);

  return (
    <Card className="glass-morphism p-6">
      <h3 className="text-xl font-semibold mb-6 text-center" style={{ color: 'var(--off-white)' }}>
        Expertise Radar
      </h3>
      
      <div className="relative">
        <svg width="200" height="200" className="mx-auto">
          {/* Background grid circles */}
          {[20, 40, 60, 80, 100].map((percentage) => (
            <circle
              key={percentage}
              cx={center}
              cy={center}
              r={(percentage / 100) * radius}
              fill="none"
              stroke="rgba(255, 255, 255, 0.1)"
              strokeWidth="1"
            />
          ))}
          
          {/* Axis lines */}
          {axisPoints.map((point, index) => (
            <line
              key={index}
              x1={center}
              y1={center}
              x2={point.x}
              y2={point.y}
              stroke="rgba(255, 255, 255, 0.2)"
              strokeWidth="1"
            />
          ))}
          
          {/* Skill polygon */}
          <motion.polygon
            points={getPolygonPoints(skillLevels)}
            fill="var(--cyber-cyan)"
            fillOpacity="0.2"
            stroke="var(--cyber-cyan)"
            strokeWidth="2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* Skill points */}
          {axisPoints.map((point, index) => (
            <motion.circle
              key={index}
              cx={center + (skillLevels[index] / 100) * radius * Math.cos(point.angle)}
              cy={center + (skillLevels[index] / 100) * radius * Math.sin(point.angle)}
              r="4"
              fill={skills[index].color}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
            />
          ))}
        </svg>
        
        {/* Skill labels */}
        <div className="absolute inset-0">
          {axisPoints.map((point, index) => {
            const labelX = center + (radius + 20) * Math.cos(point.angle);
            const labelY = center + (radius + 20) * Math.sin(point.angle);
            
            return (
              <motion.div
                key={index}
                className="absolute text-xs font-medium"
                style={{
                  left: `${labelX}px`,
                  top: `${labelY}px`,
                  transform: 'translate(-50%, -50%)',
                  color: 'var(--light-gray)',
                  textAlign: 'center',
                  width: '80px',
                }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              >
                <div>{point.skill.name}</div>
                <div style={{ color: point.skill.color, fontWeight: 'bold' }}>
                  {point.skill.level}%
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};

export default SkillsRadar;