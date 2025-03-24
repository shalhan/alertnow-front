import { useInView } from 'react-intersection-observer';
import { Zap, Shield, Users, BarChart, Bell, Clock } from "lucide-react";

const features = [
  {
    icon: <Bell size={24} />,
    title: "Real-Time Alerts",
    description: "Get instant notifications when metrics change or issues arise, so you can act before users notice.",
    color: "bg-blue-50",
    iconColor: "text-blue-500"
  },
  {
    icon: <Zap size={24} />,
    title: "Smart Filtering",
    description: "Our intelligent system ensures you only get alerts that matter, eliminating notification fatigue.",
    color: "bg-purple-50",
    iconColor: "text-purple-500"
  },
  {
    icon: <Shield size={24} />,
    title: "Proactive Monitoring",
    description: "Continuous system checks identify potential issues before they impact your service or customers.",
    color: "bg-green-50",
    iconColor: "text-green-500"
  },
  {
    icon: <Users size={24} />,
    title: "Team Collaboration",
    description: "Route alerts to the right team members and track resolution progress in real-time.",
    color: "bg-amber-50",
    iconColor: "text-amber-500"
  },
  {
    icon: <BarChart size={24} />,
    title: "Analytics Dashboard",
    description: "Visualize system performance and alert patterns to identify trends and make improvements.",
    color: "bg-pink-50",
    iconColor: "text-pink-500"
  },
  {
    icon: <Clock size={24} />,
    title: "Fast Integration",
    description: "Set up in minutes with our simple API that connects to your existing infrastructure without hassle.",
    color: "bg-indigo-50",
    iconColor: "text-indigo-500"
  }
];

const Features = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id="features" className="section py-24 bg-white">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
            <Zap size={16} className="inline mr-1" />
            Powerful Features
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Stay Ahead</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            AlertNow provides a comprehensive suite of tools designed to keep your systems running smoothly
            and your team informed exactly when it matters.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
        >
          {features.map((feature, index) => (
            <div 
              key={index} 
              className={`transition-all duration-500 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm h-full hover:shadow-md transition-all duration-300 hover:translate-y-[-5px]">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${feature.color}`}>
                  <div className={feature.iconColor}>
                    {feature.icon}
                  </div>
                </div>
                
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-slate-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;