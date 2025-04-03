
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider';
import { FeatureData } from '../types';

interface FeatureCardProps {
  feature: FeatureData;
}

/**
 * FeatureCard component that displays a feature with expandable details
 * and interactive demonstrations.
 */
const FeatureCard = ({ feature }: FeatureCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'technical' | 'integration'>('technical');
  
  return (
    <div 
      className="relative h-full overflow-hidden rounded-xl border border-gray-100 bg-white shadow-sm transition-all duration-300 hover:shadow-md"
      style={{
        background: 'linear-gradient(to bottom right, rgba(255, 255, 255, 1), rgba(236, 239, 241, 0.5))'
      }}
    >
      <div className="relative p-6">
        <div className="mb-4 flex items-center justify-between">
          <div className="rounded-full bg-primary bg-opacity-10 p-2 text-primary">
            {feature.icon}
          </div>
          <div className="rounded-full bg-secondary bg-opacity-10 px-3 py-1 text-xs font-semibold text-secondary">
            {feature.model}
          </div>
        </div>
        
        <h3 className="mb-2 font-helvetica text-xl font-bold text-gray-800">
          {feature.title}
        </h3>
        
        <p className="mb-6 font-roboto text-gray-600">
          {feature.description}
        </p>
        
        <div className="mb-6 overflow-hidden rounded-lg border border-gray-200">
          {feature.animation}
        </div>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex w-full items-center justify-center rounded-lg bg-primary px-4 py-2 font-medium text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-expanded={isExpanded}
          aria-controls={`details-${feature.id}`}
        >
          {isExpanded ? 'Show Less' : 'Learn More'}
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`ml-2 h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            id={`details-${feature.id}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-gray-200 bg-white"
          >
            <div className="p-6">
              <h4 className="mb-4 font-helvetica text-lg font-semibold text-gray-800">Interactive Demo</h4>
              
              {feature.compareSlider && (
                <div className="mb-6 overflow-hidden rounded-lg">
                  <ReactCompareSlider
                    itemOne={
                      <div className="relative h-48 w-full md:h-64">
                        <div className="absolute left-2 top-2 rounded-md bg-black bg-opacity-70 px-2 py-1 text-xs text-white">
                          {feature.compareSlider.beforeLabel}
                        </div>
                        <div className="flex h-full items-center justify-center bg-gray-200 text-center text-gray-500">
                          <span>Before Image Placeholder</span>
                        </div>
                      </div>
                    }
                    itemTwo={
                      <div className="relative h-48 w-full md:h-64">
                        <div className="absolute right-2 top-2 rounded-md bg-primary bg-opacity-90 px-2 py-1 text-xs text-white">
                          {feature.compareSlider.afterLabel}
                        </div>
                        <div className="flex h-full items-center justify-center bg-gray-100 text-center text-gray-500">
                          <span>After Image Placeholder</span>
                        </div>
                      </div>
                    }
                    position={50}
                    className="h-48 md:h-64"
                  />
                </div>
              )}
              
              <div className="mb-4 flex border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('technical')}
                  className={`mr-4 border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'technical' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  aria-selected={activeTab === 'technical'}
                  role="tab"
                >
                  Technical Details
                </button>
                <button
                  onClick={() => setActiveTab('integration')}
                  className={`px-4 py-2 text-sm font-medium transition-colors ${
                    activeTab === 'integration' 
                      ? 'border-b-2 border-primary text-primary' 
                      : 'border-b-2 border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                  aria-selected={activeTab === 'integration'}
                  role="tab"
                >
                  Integration Info
                </button>
              </div>
              
              <div className="rounded-lg bg-gray-50 p-4 font-roboto text-sm leading-relaxed text-gray-700">
                {activeTab === 'technical' ? (
                  <p>{feature.technicalDetails}</p>
                ) : (
                  <p>{feature.integrationInfo}</p>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeatureCard;
  