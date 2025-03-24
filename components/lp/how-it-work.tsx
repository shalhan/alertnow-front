import { useInView } from 'react-intersection-observer';
import { Wrench, AlertCircle, Bell } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: <Wrench size={24} />,
    title: "Integrate in 5 Minutes",
    description: "Simple API, no complex setup. Connect AlertNow to your application with just a few lines of code.",
    color: "bg-blue-500"
  },
  {
    number: "02",
    icon: <AlertCircle size={24} />,
    title: "Set Your Triggers",
    description: "Define exactly what you want to be alerted for. Customize thresholds and conditions to match your needs.",
    color: "bg-indigo-500"
  },
  {
    number: "03",
    icon: <Bell size={24} />,
    title: "Get Notified Instantly",
    description: "Email, Slack, or SMS—your choice. Receive alerts through your preferred channel whenever issues arise.",
    color: "bg-purple-500"
  }
];

const HowItWorks = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id="how" className="section py-24 bg-gradient-to-b from-slate-50 to-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
            <Wrench size={16} className="inline mr-1" />
            How It Works
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simple Setup, Powerful Results</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Get up and running in minutes with our straightforward integration process.
          </p>
        </div>
        
        <div 
          ref={ref} 
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`relative transition-all duration-500 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm h-full">
                <div className={`absolute -top-4 -left-4 w-12 h-12 rounded-xl flex items-center justify-center text-white ${step.color}`}>
                  {step.icon}
                </div>
                
                <div className="pt-2">
                  <span className="text-5xl font-bold text-slate-100">{step.number}</span>
                  <h3 className="text-xl font-semibold mb-3 -mt-8">{step.title}</h3>
                  <p className="text-slate-600 text-sm">{step.description}</p>
                </div>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-3 w-6 h-6 transform translate-x-1/2 -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="#CBD5E1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;