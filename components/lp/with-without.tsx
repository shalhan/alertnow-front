import { useState, useEffect } from 'react';
import { useInView } from 'react-intersection-observer';
import { Check, X, Clock, AlertTriangle, Smile, Frown } from "lucide-react";

const WithWithout = () => {
  const { ref: refLeft, inView: inViewLeft } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });
  
  const { ref: refRight, inView: inViewRight } = useInView({
    threshold: 0.1,
    triggerOnce: false
  });

  return (
    <section className="section py-24 bg-white">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16 max-w-6xl mx-auto">
          {/* Without AlertNow */}
          <div 
            ref={refLeft}
            className={`bg-slate-50 rounded-2xl p-8 border border-slate-200 shadow-sm transition-all duration-500 ${
              inViewLeft ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-red-100 mr-4">
                <X size={20} className="text-red-500" />
              </div>
              <h3 className="text-xl font-semibold">Without AlertNow</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="mt-1 mr-4">
                  <Clock size={18} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-800">
                    <span className="font-medium">Morning surprise:</span> You wake up to 100+ angry customer emails.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mt-1 mr-4">
                  <AlertTriangle size={18} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-800">
                    <span className="font-medium">Crisis mode:</span> Your API crashed overnight. No alerts.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mt-1 mr-4">
                  <Frown size={18} className="text-slate-400" />
                </div>
                <div>
                  <p className="text-slate-800">
                    <span className="font-medium">Lost revenue:</span> Customers churning while you sleep.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 py-4 px-6 bg-red-50 rounded-lg border border-red-100">
              <p className="text-red-700 text-sm">
                <span className="font-medium">Result:</span> Stress, lost revenue, and damaged reputation.
              </p>
            </div>
          </div>
          
          {/* With AlertNow */}
          <div 
            ref={refRight}
            className={`bg-white rounded-2xl p-8 border border-slate-200 shadow-sm transition-all duration-500 ${
              inViewRight ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
            }`}
          >
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 rounded-full flex items-center justify-center bg-green-100 mr-4">
                <Check size={20} className="text-green-500" />
              </div>
              <h3 className="text-xl font-semibold">With AlertNow</h3>
            </div>
            
            <div className="space-y-6">
              <div className="flex">
                <div className="mt-1 mr-4">
                  <Clock size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-slate-800">
                    <span className="font-medium">Immediate notification:</span> Your phone buzzes at 2 AM with a precise alert.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mt-1 mr-4">
                  <AlertTriangle size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-slate-800">
                    <span className="font-medium">Quick response:</span> AlertNow detects the issue before users notice.
                  </p>
                </div>
              </div>
              
              <div className="flex">
                <div className="mt-1 mr-4">
                  <Smile size={18} className="text-primary" />
                </div>
                <div>
                  <p className="text-slate-800">
                    <span className="font-medium">Crisis averted:</span> You fix it in minutes, no customer impact.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-8 py-4 px-6 bg-primary/5 rounded-lg border border-primary/20">
              <p className="text-primary text-sm">
                <span className="font-medium">Result:</span> Peace of mind, protected revenue, happy customers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WithWithout;