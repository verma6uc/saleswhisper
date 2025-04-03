
import { motion } from 'framer-motion';
import { cn } from '../../../../../lib/utils';
import { PricingCardProps } from '../types';
import { CheckIcon } from './Icons';

/**
 * PricingCard Component
 * 
 * Displays a pricing tier with its details, features, and CTA button.
 */
const PricingCard: React.FC<PricingCardProps> = ({ 
  plan, 
  index,
  billingCycle 
}) => {
  const isRecommended = plan.recommended;
  const price = billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice;
  
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut'
      }
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      className={cn(
        "relative flex flex-col rounded-xl shadow-md overflow-hidden h-full",
        isRecommended ? "border-2 border-primary" : "border border-gray-200",
        isRecommended ? "bg-white" : "bg-white",
      )}
    >
      {isRecommended && (
        <div className="bg-primary text-white text-center py-1 text-sm font-medium">
          Recommended
        </div>
      )}
      
      <div className="p-6 flex flex-col h-full">
        <div>
          <h3 className="text-xl font-bold text-gray-900 font-helvetica mb-2">
            {plan.name}
          </h3>
          <p className="text-gray-600 mb-4 font-roboto min-h-[48px]">
            {plan.description}
          </p>
          
          <div className="mt-4 mb-6">
            {price !== null ? (
              <>
                <div className="flex items-baseline">
                  <span className="text-3xl font-bold text-accent">${price}</span>
                  <span className="text-gray-600 ml-1">/month</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className="text-sm text-green-600 mt-1">
                    Billed annually (${price * 12}/year)
                  </p>
                )}
              </>
            ) : (
              <div className="text-2xl font-bold text-accent">Custom Pricing</div>
            )}
          </div>
        </div>
        
        <div className="flex-grow mb-6">
          <h4 className="font-medium text-gray-800 mb-3 font-helvetica">Features include:</h4>
          <ul className="space-y-3">
            {plan.features.map((feature, i) => (
              <li key={i} className="flex items-start">
                <span className="text-primary mt-1 mr-2"><CheckIcon /></span>
                <span className="text-gray-600 font-roboto">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
        
        <button 
          className={cn(
            "w-full py-3 px-4 rounded-md font-medium transition-all focus:outline-none focus:ring-2 focus:ring-offset-2",
            isRecommended 
              ? "bg-primary hover:bg-primary/90 text-white focus:ring-primary" 
              : "bg-secondary hover:bg-secondary/90 text-white focus:ring-secondary"
          )}
        >
          {plan.ctaText}
        </button>
      </div>
    </motion.div>
  );
};

export default PricingCard;
  