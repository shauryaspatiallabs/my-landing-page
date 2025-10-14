import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  visualization: ReactNode;
}

const ServiceCard = ({ icon, title, description, visualization }: ServiceCardProps) => {
  return (
    <Card className="service-card glass-morphism p-8 hover:border-[var(--cyber-cyan)] transition-all duration-500 relative overflow-hidden group cursor-pointer transform hover:-translate-y-2">
      <div className="relative z-10">
        <div className="w-16 h-16 bg-[var(--cyber-cyan)]/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-[var(--cyber-cyan)]/30 transition-colors duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-semibold mb-4 text-[var(--off-white)]" style={{ fontFamily: 'Space Grotesk' }}>
          {title}
        </h3>
        <p className="text-[var(--light-gray)] mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Service Visualization */}
        <div className="service-visualization absolute inset-0 bg-gradient-to-br from-[var(--cyber-cyan)]/10 to-[var(--electric-blue)]/10 rounded-xl">
          <div className="flex items-center justify-center h-full">
            {visualization}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ServiceCard;
