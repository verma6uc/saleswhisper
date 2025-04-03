
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Typed from 'typed.js';
import { cn } from '../../../../lib/utils';
import { CtaButtonGroup } from './components/CtaButtonGroup';
import { MetricsDisplay } from './components/MetricsDisplay';
import { NeuralNetworkBackground } from './components/NeuralNetworkBackground';

/**
 * HeroSection component for SalesWhisper Homepage
 * 
 * Displays the main value proposition, animated visualization,
 * CTA buttons, and key metrics in a responsive layout.
 */
export const HeroSection = () => {
  const typedElement = useRef<HTMLSpanElement>(null);
  const typedInstance = useRef<Typed | null>(null);

  useEffect(() => {
    if (typedElement.current) {
      typedInstance.current = new Typed(typedElement.current, {
        strings: [
          'sales conversations',
          'sales performance',
          'customer engagement',
          'deal closure rates'
        ],
        typeSpeed: 70,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
      });
    }

    return () => {
      typedInstance.current?.destroy();
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <section 
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-[#1A237E] to-[#4527A0] text-white py-16 md:py-24 lg:py-28"
      aria-labelledby="hero-heading"
    >
      {/* Neural Network Background */}
      <NeuralNetworkBackground />

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <motion.div
          className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <motion.div 
            className="lg:w-1/2 text-center lg:text-left"
            variants={itemVariants}
          >
            <h1 
              id="hero-heading"
              className="font-['Helvetica_Neue'] font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6"
            >
              Transform <span ref={typedElement} className="text-[#B2FF59]"></span> with GPT-Powered Intelligence
            </h1>
            
            <motion.p 
              className="text-lg md:text-xl font-['Roboto'] text-[#ECEFF1] mb-8 max-w-2xl mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Leverage advanced large language models to analyze, coach, and enhance your sales team's performance in real-time.
            </motion.p>
            
            <motion.div variants={itemVariants}>
              <CtaButtonGroup />
            </motion.div>

            <motion.div 
              className="mt-12"
              variants={itemVariants}
            >
              <MetricsDisplay />
            </motion.div>
          </motion.div>

          {/* Animated Visualization */}
          <motion.div 
            className="lg:w-1/2 w-full"
            variants={itemVariants}
          >
            <AnimatedVisualization />
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 cursor-pointer"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          whileHover={{ y: 5 }}
          onClick={() => {
            const featuresSection = document.getElementById('features-section');
            featuresSection?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <div className="flex flex-col items-center">
            <span className="text-sm mb-2 font-['Roboto']">See how it works</span>
            <svg 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="animate-bounce"
            >
              <path d="M7 10L12 15L17 10" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper component for the animated visualization
const AnimatedVisualization = () => {
  return (
    <div className={cn(
      "relative aspect-square max-w-[550px] mx-auto",
      "rounded-xl bg-opacity-10 bg-white p-4",
      "border border-white/20 shadow-lg backdrop-blur-sm",
      "overflow-hidden"
    )}>
      <div className="absolute inset-0 bg-gradient-to-br from-[#4527A0]/30 to-[#7E57C2]/30 z-0"></div>
      
      {/* Visualization content */}
      <div className="relative z-10 h-full flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs md:text-sm font-['Roboto'] font-medium">SalesWhisper Analysis</div>
          <div className="flex space-x-1">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#B2FF59] animate-pulse"></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FFEB3B] animate-pulse" style={{ animationDelay: '0.3s' }}></div>
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-[#FF4081] animate-pulse" style={{ animationDelay: '0.6s' }}></div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col space-y-4 p-2">
          {/* Mock conversation */}
          <div className="flex items-start">
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#1A237E] flex items-center justify-center text-xs md:text-sm font-bold">C</div>
            <div className="ml-3 bg-[#263238]/60 rounded-lg p-3 max-w-[80%]">
              <p className="text-xs md:text-sm">Can you tell me more about your pricing plans?</p>
            </div>
          </div>
          
          <div className="flex items-start justify-end">
            <div className="mr-3 bg-[#4527A0]/60 rounded-lg p-3 max-w-[80%]">
              <p className="text-xs md:text-sm">Our pricing is flexible and based on team size. For a company your size, I recommend our Growth plan at $49/user/month.</p>
            </div>
            <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-[#4527A0] flex items-center justify-center text-xs md:text-sm font-bold">S</div>
          </div>
          
          {/* GPT Analysis highlight */}
          <motion.div 
            className="mt-2 border border-[#B2FF59]/50 rounded-lg p-3 bg-[#263238]/60"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <div className="flex items-center mb-2">
              <svg className="w-4 h-4 mr-2 text-[#B2FF59]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path>
              </svg>
              <span className="text-xs md:text-sm text-[#B2FF59] font-semibold">GPT Analysis</span>
            </div>
            <p className="text-xs md:text-sm">Opportunity to personalize. Consider asking about specific needs before recommending pricing tier.</p>
            <div className="mt-2 text-xs text-[#B2FF59]/80">Success rate for this approach: +42%</div>
          </motion.div>
          
          <motion.div 
            className="mt-auto grid grid-cols-2 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          >
            <div className="bg-[#263238]/40 p-2 rounded text-center">
              <div className="text-xs">Sentiment</div>
              <div className="text-sm font-semibold text-[#4FC3F7]">Neutral → Positive</div>
            </div>
            <div className="bg-[#263238]/40 p-2 rounded text-center">
              <div className="text-xs">Engagement</div>
              <div className="text-sm font-semibold text-[#B2FF59]">78%</div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
  