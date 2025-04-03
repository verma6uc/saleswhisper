
import { useEffect, useRef } from 'react';
import { useMediaQuery } from 'react-responsive';

const timelineEvents = [
  {
    year: 2020,
    title: 'GPT-3 Launch',
    description: 'OpenAI releases GPT-3 with 175 billion parameters, opening new possibilities for AI language models.',
    highlight: false
  },
  {
    year: 2021, 
    title: 'Initial Testing',
    description: 'SalesWhisper begins early exploration of applying GPT models to sales conversation analysis.',
    highlight: true
  },
  {
    year: 2022,
    title: 'GPT-3.5 Release',
    description: 'Improved version with better instruction following and reduced biases.',
    highlight: false
  },
  {
    year: 2022,
    title: 'Sales-specific Model Training',
    description: 'Development of the first sales-optimized language model on GPT-3.5 architecture.',
    highlight: true
  },
  {
    year: 2023,
    title: 'GPT-4 Release',
    description: 'Breakthrough model with improved reasoning and expert-level knowledge.',
    highlight: false
  },
  {
    year: 2023,
    title: 'SalesWhisper Engine',
    description: 'Launch of multi-model architecture with specialized GPT models for different sales analysis tasks.',
    highlight: true
  },
  {
    year: 2023,
    title: 'Fine-tuned GPT-4',
    description: 'Implementation of custom-trained GPT-4 models optimized for sales conversations and coaching.',
    highlight: true
  },
  {
    year: 2024,
    title: 'Next-Generation Architecture',
    description: 'Ongoing development of proprietary fine-tuning techniques and model optimizations.',
    highlight: true
  }
];

/**
 * A timeline component showing GPT model evolution and SalesWhisper's implementation
 */
export const TimelineChart = () => {
  const timelineRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  
  useEffect(() => {
    const handleScroll = () => {
      if (!timelineRef.current) return;
      
      const timelineElements = timelineRef.current.querySelectorAll('.timeline-item');
      
      timelineElements.forEach(item => {
        const rect = item.getBoundingClientRect();
        
        if (rect.top < window.innerHeight * 0.9 && rect.bottom > 0) {
          item.classList.add('timeline-visible');
        }
      });
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div 
      ref={timelineRef}
      className="relative bg-white rounded-xl shadow-md p-4 md:p-6 overflow-hidden"
    >
      <h3 className="text-xl md:text-2xl font-bold text-primary mb-6">GPT Model Evolution & SalesWhisper Integration</h3>
      
      <div className="relative">
        {/* Timeline stem */}
        <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform md:translate-x-[-0.5px]"></div>
        
        {/* Timeline events */}
        <div className="relative space-y-8 md:space-y-12">
          {timelineEvents.map((event, index) => (
            <div 
              key={`${event.year}-${index}`}
              className={`timeline-item flex ${
                isMobile ? 'flex-row pl-12' : (index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row')
              } opacity-0 transition-opacity duration-500 ease-in`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Event dot */}
              <div className={`absolute left-4 md:left-1/2 w-4 h-4 rounded-full transform md:translate-x-[-50%] border-2 ${
                event.highlight ? 'bg-primary border-primary' : 'bg-white border-gray-300'
              }`}></div>
              
              {/* Content */}
              <div className={`w-full md:w-[calc(50%-20px)] ${
                isMobile ? '' : (index % 2 === 0 ? 'md:pr-12' : 'md:pl-12')
              }`}>
                <div className={`p-4 rounded-lg ${
                  event.highlight ? 'bg-primary/5 border border-primary/20' : 'bg-gray-50'
                }`}>
                  <div className="flex items-center mb-2">
                    <span className={`text-sm font-bold px-2 py-0.5 rounded ${
                      event.highlight ? 'bg-primary text-white' : 'bg-gray-200 text-gray-700'
                    }`}>
                      {event.year}
                    </span>
                    {event.highlight && (
                      <span className="ml-2 text-xs uppercase text-primary font-medium">SalesWhisper</span>
                    )}
                  </div>
                  <h4 className={`font-bold ${event.highlight ? 'text-primary' : 'text-gray-800'}`}>
                    {event.title}
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        .timeline-visible {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
