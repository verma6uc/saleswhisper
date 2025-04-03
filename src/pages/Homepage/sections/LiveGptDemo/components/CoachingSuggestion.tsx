
import React from 'react';
import { CoachingSuggestion as CoachingSuggestionType } from '../types';

interface CoachingSuggestionProps {
  suggestion: CoachingSuggestionType;
  onClose: () => void;
}

/**
 * Component to display coaching suggestions that appear during the demo
 */
const CoachingSuggestion: React.FC<CoachingSuggestionProps> = ({
  suggestion,
  onClose,
}) => {
  return (
    <div className="fixed bottom-8 right-8 max-w-xs bg-white rounded-lg shadow-lg border-l-4 border-primary p-4 transform transition-all duration-500 animate-fade-slide-up z-50">
      <div className="flex justify-between items-start">
        <div className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
          </svg>
          <h4 className="font-medium text-gray-900">{suggestion.title}</h4>
        </div>
        <button 
          onClick={onClose}
          className="text-gray-400 hover:text-gray-600 focus:outline-none"
          aria-label="Close suggestion"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="mt-2">
        <p className="text-sm text-gray-700">{suggestion.description}</p>
        <div className="mt-2 flex">
          <span className={`text-xs px-2 py-1 rounded-full ${getCategoryStyles(suggestion.category)}`}>
            {formatCategory(suggestion.category)}
          </span>
        </div>
      </div>
    </div>
  );
};

/**
 * Format category text for display
 */
const formatCategory = (category: string): string => {
  const formatted = category.split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return formatted;
};

/**
 * Get styles for different suggestion categories
 */
const getCategoryStyles = (category: string): string => {
  switch (category) {
    case 'technique':
      return 'bg-blue-100 text-blue-800';
    case 'phrasing':
      return 'bg-green-100 text-green-800';
    case 'next-steps':
      return 'bg-purple-100 text-purple-800';
    case 'objection-handling':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export default CoachingSuggestion;
