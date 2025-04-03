
import { motion } from 'framer-motion';
import { cn } from '../../../../../lib/utils';

/**
 * Component for displaying the primary and secondary CTA buttons.
 */
export const CtaButtonGroup = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
      <motion.button
        className={cn(
          "relative inline-flex items-center justify-center",
          "px-8 py-3 text-base md:text-lg font-['Roboto'] font-medium",
          "rounded-lg bg-gradient-to-r from-[#B2FF59] to-[#69F0AE]",
          "text-[#1A237E] shadow-lg transition-transform duration-200 ease-in-out",
          "hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2",
          "focus:ring-[#69F0AE] focus:ring-offset-2 focus:ring-offset-[#1A237E]"
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Get Started Free
        <svg 
          className="ml-2 w-5 h-5" 
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth="2" 
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          ></path>
        </svg>
      </motion.button>

      <motion.button
        className={cn(
          "inline-flex items-center justify-center",
          "px-8 py-3 text-base md:text-lg font-['Roboto'] font-medium",
          "rounded-lg border-2 border-white text-white",
          "transition-all duration-200 ease-in-out",
          "hover:bg-white/10 focus:outline-none focus:ring-2",
          "focus:ring-white focus:ring-offset-2 focus:ring-offset-[#1A237E]"
        )}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
      >
        Schedule Demo
      </motion.button>
    </div>
  );
};

export default CtaButtonGroup;
  