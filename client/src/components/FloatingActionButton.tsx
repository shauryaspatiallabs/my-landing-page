import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, Phone, Mail, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const FloatingActionButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Phone className="w-5 h-5" />,
      label: "Call Now",
      action: () => window.open("tel:+919719100707"),
      color: "var(--cyber-cyan)"
    },
    {
      icon: <Mail className="w-5 h-5" />,
      label: "Email",
      action: () => window.open("mailto:shaurya@shauryaspatiallabs.com?subject=Project Discussion - Geospatial Solutions&body=Hello Shaurya Spatial Labs,%0D%0A%0D%0AI would like to discuss a geospatial project with your team.%0D%0A%0D%0AProject Details:%0D%0A-%0D%0A-%0D%0A-%0D%0A%0D%0ABest regards"),
      color: "var(--electric-blue)"
    },
    {
      icon: <MessageSquare className="w-5 h-5" />,
      label: "Chat",
      action: () => console.log("Open chat"),
      color: "var(--cyber-cyan)"
    }
  ];

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 20 }}
            className="mb-4 space-y-3"
          >
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="glass-morphism p-3 flex items-center space-x-3 cursor-pointer hover:scale-105 transition-transform"
                      onClick={action.action}>
                  <div 
                    className="w-10 h-10 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: action.color + '20', color: action.color }}
                  >
                    {action.icon}
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'var(--off-white)' }}>
                    {action.label}
                  </span>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Button
          size="icon"
          className="w-14 h-14 rounded-full shadow-lg animate-glow"
          style={{ 
            backgroundColor: 'var(--cyber-cyan)', 
            color: 'var(--deep-navy)' 
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="message"
                initial={{ rotate: 180, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -180, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <MessageSquare className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
        </Button>
      </motion.div>
    </div>
  );
};

export default FloatingActionButton;