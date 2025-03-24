import { Button } from "@/components/ui/button";
import { Zap, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10">
      <div className="container mx-auto">
        <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden bg-white shadow-xl">
          {/* Background decorations */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500"></div>
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-indigo-200 rounded-full opacity-20 blur-3xl"></div>
          
          {/* Content */}
          <div className="px-8 py-12 md:p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Get Started in Minutes</h2>
            <p className="text-slate-600 max-w-xl mx-auto mb-8">
              Start monitoring your critical services today. Set up in 5 minutes and get your first 100 alerts completely free.
            </p>
            
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-10">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 rounded-full shadow-sm hover:shadow-md w-full md:w-auto"
              >
                <Zap size={18} className="mr-2" />
                Sign Up & Get 100 Free Alerts
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                className="hover:bg-slate-100 px-6 py-6 rounded-full w-full md:w-auto group"
              >
                <span>See Pricing</span>
                <ArrowRight size={16} className="ml-2 transition-transform group-hover:translate-x-1" />
              </Button>
            </div>
            
            <div className="flex items-center justify-center gap-6 flex-wrap">
              <div className="flex items-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-primary">
                  <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM14.293 8.207L9.293 13.207C9.098 13.402 8.839 13.5 8.586 13.5C8.333 13.5 8.074 13.402 7.879 13.207L5.707 11.035C5.316 10.644 5.316 10.011 5.707 9.621C6.098 9.23 6.731 9.23 7.121 9.621L8.586 11.086L12.879 6.793C13.27 6.402 13.903 6.402 14.293 6.793C14.684 7.184 14.684 7.816 14.293 8.207Z" fill="currentColor"/>
                </svg>
                <span className="text-sm font-medium">5-Minute Setup</span>
              </div>
              <div className="flex items-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-primary">
                  <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM14.293 8.207L9.293 13.207C9.098 13.402 8.839 13.5 8.586 13.5C8.333 13.5 8.074 13.402 7.879 13.207L5.707 11.035C5.316 10.644 5.316 10.011 5.707 9.621C6.098 9.23 6.731 9.23 7.121 9.621L8.586 11.086L12.879 6.793C13.27 6.402 13.903 6.402 14.293 6.793C14.684 7.184 14.684 7.816 14.293 8.207Z" fill="currentColor"/>
                </svg>
                <span className="text-sm font-medium">No Credit Card Required</span>
              </div>
              <div className="flex items-center">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2 text-primary">
                  <path d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM14.293 8.207L9.293 13.207C9.098 13.402 8.839 13.5 8.586 13.5C8.333 13.5 8.074 13.402 7.879 13.207L5.707 11.035C5.316 10.644 5.316 10.011 5.707 9.621C6.098 9.23 6.731 9.23 7.121 9.621L8.586 11.086L12.879 6.793C13.27 6.402 13.903 6.402 14.293 6.793C14.684 7.184 14.684 7.816 14.293 8.207Z" fill="currentColor"/>
                </svg>
                <span className="text-sm font-medium">Cancel Anytime</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;