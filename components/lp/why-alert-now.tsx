import { useState, useEffect, useRef } from 'react';
import { Bell, Zap, Wrench, Clock } from "lucide-react";
import { useInView } from 'react-intersection-observer';

const features = [
  {
    icon: <Bell size={24} />,
    title: "Know Before It's Too Late",
    description: "Get notified the moment something goes wrong, allowing you to address issues before they impact your users.",
    color: "bg-blue-50",
    iconColor: "text-blue-500",
    delay: 100
  },
  {
    icon: <Zap size={24} />,
    title: "Only Alerts That Matter",
    description: "No noise, just the updates you need. Our smart filtering ensures you only receive relevant notifications.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-500",
    delay: 200
  },
  {
    icon: <Wrench size={24} />,
    title: "Easy Integration",
    description: "Set up in minutes with zero headaches. Simple API connection to get you monitoring in no time.",
    color: "bg-purple-50",
    iconColor: "text-purple-500",
    delay: 300
  },
  {
    icon: <Clock size={24} />,
    title: "Save Time, Reduce Stress",
    description: "Focus on building, let AlertNow handle the monitoring. Gain peace of mind knowing you'll be alerted if anything breaks.",
    color: "bg-sky-50",
    iconColor: "text-sky-500",
    delay: 400
  }
];

const FeatureCard = ({ feature, inView }: any) => {
  return (
    <div 
      className={`feature-card transform transition-all duration-500 ${
        inView 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${feature.delay}ms` }}
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
        <div className={feature.iconColor}>
          {feature.icon}
        </div>
      </div>
      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
      <p className="text-slate-600 text-sm">{feature.description}</p>
    </div>
  );
};

const WhyAlertNow = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id="why" className="section py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
            <Bell size={16} className="inline mr-1" />
            Why AlertNow?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Keep Your Business Running Smoothly</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            AlertNow helps founders prevent issues from becoming problems by providing real-time monitoring and intelligent alerts.
          </p>
        </div>
        
        <div ref={ref} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyAlertNow;