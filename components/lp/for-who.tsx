import { useInView } from 'react-intersection-observer';
import { Target, User, Server, Shield } from "lucide-react";

const targetUsers = [
  {
    icon: <User size={24} />,
    title: "Solo Founders",
    description: "Who can't afford downtime and need eyes on their service 24/7 without the overhead.",
    color: "bg-blue-500"
  },
  {
    icon: <Server size={24} />,
    title: "Indie Hackers",
    description: "Who want peace of mind while scaling their products and focusing on growth.",
    color: "bg-indigo-500"
  },
  {
    icon: <Shield size={24} />,
    title: "SaaS & API Businesses",
    description: "Needing real-time monitoring of critical services and endpoints to maintain uptime.",
    color: "bg-purple-500"
  }
];

const ForWho = () => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section id="who" className="section py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-700 text-sm font-medium mb-4">
            <Target size={16} className="inline mr-1" />
            Who Is This For?
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built For Makers Like You</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            AlertNow is specifically designed for entrepreneurs who need reliable monitoring without the enterprise complexity.
          </p>
        </div>
        
        <div 
          ref={ref}
          className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {targetUsers.map((user, index) => (
            <div 
              key={index}
              className={`transition-all duration-500 ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-sm h-full hover:shadow-md transition-all duration-300">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-white mb-6 ${user.color}`}>
                  {user.icon}
                </div>
                
                <h3 className="text-xl font-semibold mb-3">{user.title}</h3>
                <p className="text-slate-600">{user.description}</p>
                
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="flex items-center">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-green-500">
                      <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM14.293 8.207L9.293 13.207C9.098 13.402 8.839 13.5 8.586 13.5C8.333 13.5 8.074 13.402 7.879 13.207L5.707 11.035C5.316 10.644 5.316 10.011 5.707 9.621C6.098 9.23 6.731 9.23 7.121 9.621L8.586 11.086L12.879 6.793C13.27 6.402 13.903 6.402 14.293 6.793C14.684 7.184 14.684 7.816 14.293 8.207Z" fill="currentColor"/>
                    </svg>
                    <span className="text-sm">Perfect Fit</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForWho;