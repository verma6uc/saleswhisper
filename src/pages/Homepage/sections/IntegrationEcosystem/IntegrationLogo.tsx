
import React from 'react';
import { motion } from 'framer-motion';

interface Integration {
  id: string;
  name: string;
  logo: string;
  category: string;
  description: string;
  useCase: string;
}

interface IntegrationLogoProps {
  integration: Integration;
}

export const IntegrationLogo: React.FC<IntegrationLogoProps> = ({ integration }) => {
  return (
    <motion.div
      className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow flex items-center justify-center h-24"
      whileHover={{ scale: 1.05 }}
      data-tooltip-id="integration-tooltip"
      data-tooltip-content={integration.description}
    >
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 flex items-center justify-center mb-2">
          {/* Fallback to displaying the name if no logo is available */}
          {integration.logo ? (
            <img 
              src={integration.logo} 
              alt={`${integration.name} logo`} 
              className="max-w-full max-h-full object-contain"
            />
          ) : (
            <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
              <span className="text-gray-500 font-semibold text-sm">
                {integration.name.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}
        </div>
        <span className="text-xs font-medium text-gray-700 text-center">{integration.name}</span>
      </div>
    </motion.div>
  );
};
