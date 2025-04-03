
import { useRef, useEffect, useState } from 'react';
import Masonry from 'react-masonry-css';
import { cn } from '../../../../../lib/utils';

// Mock company logos data
const COMPANY_LOGOS = [
  { id: 1, name: 'TechVision Inc.', logo: '/images/logos/techvision.svg', tier: 'enterprise' },
  { id: 2, name: 'GrowthForce', logo: '/images/logos/growthforce.svg', tier: 'medium' },
  { id: 3, name: 'Retail Pioneers', logo: '/images/logos/retailpioneers.svg', tier: 'large' },
  { id: 4, name: 'Startup Heroes', logo: '/images/logos/startupheros.svg', tier: 'small' },
  { id: 5, name: 'FinGenius', logo: '/images/logos/fingenius.svg', tier: 'enterprise' },
  { id: 6, name: 'Global Tech', logo: '/images/logos/globaltech.svg', tier: 'large' },
  { id: 7, name: 'Innovate AI', logo: '/images/logos/innovateai.svg', tier: 'medium' },
  { id: 8, name: 'Future Systems', logo: '/images/logos/futuresystems.svg', tier: 'enterprise' },
  { id: 9, name: 'Smart Solutions', logo: '/images/logos/smartsolutions.svg', tier: 'small' },
  { id: 10, name: 'Cloud Nine', logo: '/images/logos/cloudnine.svg', tier: 'medium' },
  { id: 11, name: 'Bright Ideas', logo: '/images/logos/brightideas.svg', tier: 'small' },
  { id: 12, name: 'Tech Forward', logo: '/images/logos/techforward.svg', tier: 'large' }
];

/**
 * LogoGallery - Displays a grid of customer logos with subtle animation
 */
export const LogoGallery = () => {
  const [isInView, setIsInView] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (galleryRef.current) {
      observer.observe(galleryRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [galleryRef]);

  // Responsive breakpoint configuration for the Masonry layout
  const breakpointColumnsObj = {
    default: 6,
    1100: 5,
    900: 4,
    700: 3,
    500: 2
  };

  return (
    <div ref={galleryRef} className="overflow-hidden">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex -ml-4"
        columnClassName="pl-4"
      >
        {COMPANY_LOGOS.map((company, index) => (
          <div 
            key={company.id}
            className={cn(
              "p-4 mb-4 flex items-center justify-center transition-all duration-700",
              isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              `delay-${(index % 6) * 100}`
            )}
          >
            <div className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow w-full h-24 flex items-center justify-center">
              <img 
                src={company.logo} 
                alt={`${company.name} logo`} 
                className="max-h-12 max-w-full opacity-80 hover:opacity-100 transition-opacity" 
              />
            </div>
          </div>
        ))}
      </Masonry>
    </div>
  );
};
