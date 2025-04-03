
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

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  company: string;
  integration: string;
}

interface IntegrationCardProps {
  integration: Integration;
  testimonial?: Testimonial | undefined;
}

export const IntegrationCard: React.FC<IntegrationCardProps> = ({ integration, testimonial }) => {
  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100 h-full flex flex-col"
      whileHover={{ y: -5, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
      transition={{ duration: 0.2 }}
    >
      <div className="p-6 flex-grow">
        <div className="flex items-center mb-4">
          <div className="w-12 h-12 flex-shrink-0 mr-4">
            {integration.logo ? (
              <img 
                src={integration.logo} 
                alt={`${integration.name} logo`} 
                className="w-full h-full object-contain"
              />
            ) : (
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center">
                <span className="text-gray-500 font-semibold">
                  {integration.name.substring(0, 2).toUpperCase()}
                </span>
              </div>
            )}
          </div>
          <h4 className="text-lg font-semibold text-gray-900">{integration.name}</h4>
        </div>
        
        <p className="text-gray-600 mb-4">{integration.description}</p>
        
        <div className="mb-4">
          <h5 className="text-sm font-semibold text-gray-700 mb-2">Key Use Case:</h5>
          <p className="text-sm text-gray-600">{integration.useCase}</p>
        </div>
        
        {testimonial && (
          <div className="bg-gray-50 p-4 rounded-md mt-auto">
            <blockquote className="text-sm italic text-gray-600 mb-2">"{testimonial.quote}"</blockquote>
            <div className="text-xs text-gray-500">
              <span className="font-medium">{testimonial.author}</span>
              {testimonial.company && <span>, {testimonial.company}</span>}
            </div>
          </div>
        )}
      </div>
      
      <div className="border-t border-gray-100 bg-gray-50 px-6 py-3">
        <a 
          href={`/integrations/${integration.id}`}
          className="text-primary hover:text-primary-dark text-sm font-medium flex items-center"
        >
          Learn more
          <svg 
            className="w-4 h-4 ml-1" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </a>
      </div>
    </motion.div>
  );
};
