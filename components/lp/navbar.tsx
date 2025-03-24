import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Rocket } from "lucide-react";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'py-3 glassmorphism border-b border-slate-200/30' : 'py-5'
    }`}>
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center">
          <div className="mr-2 text-primary">
            <Rocket size={24} className="animate-float" />
          </div>
          <span className="text-xl font-semibold tracking-tight">AlertNow</span>
        </div>
        
        <nav className="hidden md:flex space-x-1">
          <a href="#why" className="nav-link">Why AlertNow</a>
          <a href="#how" className="nav-link">How It Works</a>
          <a href="#testimonials" className="nav-link">Testimonials</a>
          <a href="#who" className="nav-link">For Who</a>
        </nav>
        
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            className="hidden md:inline-flex hover:bg-slate-100"
          >
            Log In
          </Button>
          <Button 
            variant="default" 
            className="bg-primary hover:bg-primary/90 transition-all duration-300 rounded-full shadow-sm hover:shadow-md"
          >
            <span>Sign Up Free</span>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;