
import { useState } from 'react';
import CountUp from 'react-countup';
import { cn } from '../../../../../lib/utils';
import type { CaseStudy } from '../CustomerSuccessStories';

interface CaseStudyCardProps {
  caseStudy: CaseStudy;
  onVideoClick: () => void;
}

/**
 * CaseStudyCard - Displays an individual customer success story
 * with company details, metrics, and optional video thumbnail
 */
export const CaseStudyCard = ({ caseStudy, onVideoClick }: CaseStudyCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  // Calculate improvement percentage
  const calculateImprovement = (before: number, after: number) => {
    return Math.round((after - before) / before * 100);
  };
  
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg">
      {/* Card Header with Logo */}
      <div className="p-6 flex items-center justify-between border-b border-gray-100">
        <img 
          src={caseStudy.logo} 
          alt={`${caseStudy.companyName} logo`} 
          className="h-8 object-contain"
        />
        <div className="flex space-x-2">
          <span className="inline-block bg-gray-100 text-gray-700 text-xs px-2 py-1 rounded-full">
            {caseStudy.industry}
          </span>
        </div>
      </div>
      
      {/* Card Body */}
      <div className="p-6">
        {/* Video Thumbnail if available */}
        {caseStudy.hasVideo && (
          <div className="mb-4 relative rounded-lg overflow-hidden">
            <img 
              src={`/images/case-studies/${caseStudy.id}-thumbnail.jpg`}
              alt={`${caseStudy.companyName} video thumbnail`}
              className="w-full h-48 object-cover"
            />
            <div 
              className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer group"
              onClick={onVideoClick}
              role="button"
              aria-label={`Play ${caseStudy.companyName} testimonial video`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onVideoClick()}
            >
              <div className="w-14 h-14 rounded-full bg-white bg-opacity-80 flex items-center justify-center group-hover:scale-110 transition-transform">
                <svg className="w-6 h-6 text-primary-700" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </div>
          </div>
        )}
        
        {/* Quote */}
        <blockquote className="mb-4">
          <p className={cn(
            "text-gray-700 italic font-helvetica transition-all",
            isExpanded ? "line-clamp-none" : "line-clamp-4"
          )}>
            "{caseStudy.quote}"
          </p>
          {caseStudy.quote.length > 150 && !isExpanded && (
            <button 
              onClick={() => setIsExpanded(true)}
              className="text-primary-600 text-sm mt-1 hover:underline focus:outline-none"
            >
              Read more
            </button>
          )}
        </blockquote>
        
        {/* Person Information */}
        <div className="mb-6">
          <p className="font-bold text-gray-900">{caseStudy.personName}</p>
          <p className="text-gray-600 text-sm">{caseStudy.personRole}, {caseStudy.companyName}</p>
        </div>
        
        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {caseStudy.metrics.map((metric, idx) => (
            <div key={idx} className="bg-gray-50 p-3 rounded-lg">
              <p className="text-xs text-gray-500 mb-1">{metric.label}</p>
              <div className="flex items-end">
                <span className="text-xl font-bold text-secondary-700">
                  <CountUp end={metric.after} suffix={metric.unit} duration={2} />
                </span>
                <span className="ml-2 text-xs text-green-600">
                  {metric.after > metric.before && '+'}{calculateImprovement(metric.before, metric.after)}%
                </span>
              </div>
              <p className="text-xs text-gray-400 mt-1">From {metric.before}{metric.unit}</p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Card Footer with CTA */}
      {caseStudy.fullCaseStudyUrl && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
          <a 
            href={caseStudy.fullCaseStudyUrl}
            className="text-sm text-primary-700 font-medium hover:text-primary-800 transition-colors inline-flex items-center"
          >
            Read full case study
            <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      )}
    </div>
  );
};
