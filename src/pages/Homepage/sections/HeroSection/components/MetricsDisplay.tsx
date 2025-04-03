
import { motion } from 'framer-motion';
import { cn } from '../../../../../lib/utils';

/**
 * Component that displays key performance metrics.
 */
export const MetricsDisplay = () => {
  const metrics = [
    {
      value: "30%",
      label: "Average increase in conversion rates",
      color: "from-[#B2FF59] to-[#69F0AE]"
    },
    {
      value: "45%",
      label: "Reduction in sales cycle length",
      color: "from-[#40C4FF] to-[#448AFF]"
    },
    {
      value: "3.5x",
      label: "Return on investment",
      color: "from-[#FF4081] to-[#F50057]"
    }
  ];

  return (
    <div className="pt-6 pb-2">
      <h3 className="text-base md:text-lg font-['Roboto'] font-medium text-[#ECEFF1] mb-4 text-center lg:text-left">
        Proven results across companies:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={index}
            className={cn(
              "bg-[#263238]/20 backdrop-blur-sm rounded-lg p-4",
              "border border-white/10 flex flex-col items-center md:items-start"
            )}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
          >
            <div className={cn(
              "text-2xl md:text-3xl font-bold mb-1",
              "bg-gradient-to-r", metric.color,
              "bg-clip-text text-transparent"
            )}>
              {metric.value}
            </div>
            <div className="text-sm text-[#ECEFF1] text-center md:text-left">
              {metric.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default MetricsDisplay;
  