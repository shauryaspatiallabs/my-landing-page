import { ReactNode } from "react";
import { Card } from "@/components/ui/card";

interface TechCardProps {
  icon: ReactNode;
  name: string;
}

const TechCard = ({ icon, name }: TechCardProps) => {
  return (
    <Card className="tech-logo glass-morphism p-6 text-center hover:border-[var(--cyber-cyan)] transition-all duration-300 group cursor-pointer">
      <div className="text-4xl mb-4 text-[var(--off-white)] group-hover:text-[var(--cyber-cyan)] transition-colors duration-300">
        {icon}
      </div>
      <div className="text-sm font-medium text-[var(--off-white)]">{name}</div>
    </Card>
  );
};

export default TechCard;
