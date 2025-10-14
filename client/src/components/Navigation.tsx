import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? 'glass-morphism shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
        <div className="flex justify-between items-center py-3 md:py-4">
          <div className="flex items-center cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="w-10 h-8 mr-3 flex items-center justify-center rounded bg-gradient-to-r from-green-400 to-blue-500 p-1">
              <div className="w-6 h-6 rounded-full bg-green-400 border border-green-300 relative">
                <div className="absolute inset-1 rounded-full border border-green-200 opacity-60"></div>
                <div className="absolute top-1 right-1 w-1 h-1 bg-blue-400 rounded-full"></div>
                <div className="absolute bottom-1 left-1 w-1 h-1 bg-cyan-400 rounded-full"></div>
              </div>
            </div>
            <h1 
              className="text-lg sm:text-xl md:text-2xl font-bold" 
              style={{ color: 'var(--cyber-cyan)', fontFamily: 'Space Grotesk' }}
            >
              <span className="block sm:hidden">SSL</span>
              <span className="hidden sm:block">Shaurya Spatial Labs</span>
            </h1>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-6 lg:ml-10 flex items-baseline space-x-4 lg:space-x-8">
              {['Home', 'About', 'Services', 'Technologies', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="hover:text-[var(--cyber-cyan)] transition-colors duration-300 text-[var(--off-white)] text-sm lg:text-base font-medium touch-target"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
              className="text-[var(--cyber-cyan)] hover:text-white"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-4 pt-4 pb-6 space-y-3 glass-morphism rounded-lg mt-2">
              {['Home', 'About', 'Services', 'Technologies', 'Contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="block w-full text-left px-3 py-2 text-[var(--off-white)] hover:text-[var(--cyber-cyan)] transition-colors duration-300"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
