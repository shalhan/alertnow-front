import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Rocket, Bell, Zap, Wrench, Clock } from "lucide-react";

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-purple-100 rounded-full filter blur-3xl opacity-30 -z-10"></div>
      
      <div className="container px-4 mx-auto">
        <div className="max-w-3xl mx-auto text-center">
          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100' : 'opacity-0 transform translate-y-4'}`}>
            <div className="flex items-center justify-center mb-5">
              <Rocket size={28} className="text-primary mr-2" />
              <span className="inline-block py-1 px-3 text-sm font-medium text-primary bg-primary/10 rounded-full">
                For Your Lovely SaaS
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight md:leading-tight lg:leading-tight mb-6">
            <span className="text-primary md:mt-1">Real-Time Alerts</span> for Founders Who Move Fast
            </h1>
            
            <p className="text-lg md:text-xl text-slate-600 mb-8 max-w-2xl mx-auto">
              Stay ahead of issues before they become problems. Get instant alerts, take action, and keep your business running smoothly.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Button className="rounded-full text-white bg-primary hover:bg-primary/90 hover:shadow-lg px-8 py-6 transition-all duration-300 text-base">
                <Zap size={18} className="mr-2" />
                Start For Free
              </Button>
              <Button variant="outline" className="rounded-full border-slate-300 hover:bg-slate-100 px-8 py-6 transition-all duration-300 text-base">
                See How It Works
              </Button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 max-w-3xl mx-auto">
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '100ms' }}>
                <Bell size={22} className="text-primary mb-2" />
                <p className="text-sm text-slate-600">Instant Notifications</p>
              </div>
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '200ms' }}>
                <Zap size={22} className="text-primary mb-2" />
                <p className="text-sm text-slate-600">Smart Filtering</p>
              </div>
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '300ms' }}>
                <Wrench size={22} className="text-primary mb-2" />
                <p className="text-sm text-slate-600">Easy Integration</p>
              </div>
              <div className="flex flex-col items-center animate-fade-in" style={{ animationDelay: '400ms' }}>
                <Clock size={22} className="text-primary mb-2" />
                <p className="text-sm text-slate-600">5-Min Setup</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;