
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../../../../lib/utils';

interface PricingToggleProps {
  onToggle: (value: boolean) => void;
  labels: [string, string];
  discount?: string;
}

/**
 * PricingToggle Component
 * 
 * A toggle switch used to change between monthly and annual billing options.
 */
const PricingToggle: React.FC<PricingToggleProps> = ({ 
  onToggle, 
  labels,
  discount 
}) => {
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    const newValue = !isToggled;
    setIsToggled(newValue);
    onToggle(newValue);
  };

  return (
    <div className="inline-flex flex-col sm:flex-row items-center gap-3">
      <span 
        className={cn(
          "text-base font-medium transition-colors",
          isToggled ? "text-gray-500" : "text-accent"
        )}
      >
        {labels[0]}
      </span>
      
      <button 
        className={cn(
          "relative w-16 h-8 flex items-center rounded-full p-1 cursor-pointer",
          "focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2",
          isToggled ? "bg-primary" : "bg-gray-300"
        )}
        onClick={handleToggle}
        aria-checked={isToggled}
        role="switch"
        aria-label="Toggle billing cycle"
      >
        <motion.div 
          className="bg-white w-6 h-6 rounded-full shadow-md"
          initial={false}
          animate={{ x: isToggled ? 32 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      </button>
      
      <span 
        className={cn(
          "text-base font-medium transition-colors",
          isToggled ? "text-accent" : "text-gray-500"
        )}
      >
        {labels[1]}
      </span>
      
      {discount && isToggled && (
        <span className="bg-green-100 text-green-800 text-xs font-medium px-2.5 py-1 rounded-full ml-2">
          {discount}
        </span>
      )}
    </div>
  );
};

export default PricingToggle;
  