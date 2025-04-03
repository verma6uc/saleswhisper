
import { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper';
import CountUp from 'react-countup';
import ModalVideo from 'react-modal-video';
import Masonry from 'react-masonry-css';
import { cn } from '../../../../lib/utils';

// Import required CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'react-modal-video/css/modal-video.css';

import { CaseStudyCard } from './components/CaseStudyCard';
import { TestimonialVideoModal } from './components/TestimonialVideoModal';
import { LogoGallery } from './components/LogoGallery';

// Types
export interface CaseStudy {
  id: string;
  companyName: string;
  industry: string;
  companySize: 'small' | 'medium' | 'large' | 'enterprise';
  logo: string;
  quote: string;
  personName: string;
  personRole: string;
  metrics: {
    label: string;
    before: number;
    after: number;
    unit: string;
  }[];
  hasVideo?: boolean;
  videoId?: string;
  fullCaseStudyUrl?: string;
}

// Filter options for case studies
type FilterOption = 'all' | 'small' | 'medium' | 'large' | 'enterprise' | string;

// Mock data - would come from API or CMS in a real implementation
const CASE_STUDIES: CaseStudy[] = [
  {
    id: '1',
    companyName: 'TechVision Inc.',
    industry: 'SaaS',
    companySize: 'enterprise',
    logo: '/images/case-studies/techvision-logo.svg',
    quote: 'GPTSalesAI transformed our approach to customer conversations. Our team can now prepare for calls in minutes instead of hours.',
    personName: 'Sarah Johnson',
    personRole: 'VP of Sales',
    metrics: [
      { label: 'Deal Conversion Rate', before: 12, after: 28, unit: '%' },
      { label: 'Call Preparation Time', before: 45, after: 5, unit: 'min' }
    ],
    hasVideo: true,
    videoId: 'xyzabc123',
    fullCaseStudyUrl: '/case-studies/techvision'
  },
  {
    id: '2',
    companyName: 'GrowthForce',
    industry: 'Marketing',
    companySize: 'medium',
    logo: '/images/case-studies/growthforce-logo.svg',
    quote: 'The AI-powered insights have increased our sales team\'s productivity by 40%. We\'re closing more deals with less effort.',
    personName: 'Michael Chen',
    personRole: 'Sales Director',
    metrics: [
      { label: 'Sales Productivity', before: 100, after: 140, unit: '%' },
      { label: 'Revenue Growth', before: 15, after: 32, unit: '%' }
    ],
    fullCaseStudyUrl: '/case-studies/growthforce'
  },
  {
    id: '3',
    companyName: 'Retail Pioneers',
    industry: 'Retail',
    companySize: 'large',
    logo: '/images/case-studies/retail-pioneers-logo.svg',
    quote: 'We\'ve seen a remarkable improvement in customer satisfaction since implementing GPTSalesAI. Our sales associates are better equipped to handle inquiries.',
    personName: 'Jessica Rodriguez',
    personRole: 'Customer Success Manager',
    metrics: [
      { label: 'Customer Satisfaction', before: 72, after: 94, unit: '%' },
      { label: 'Average Response Time', before: 24, after: 6, unit: 'hours' }
    ],
    hasVideo: true,
    videoId: 'def456ghi',
    fullCaseStudyUrl: '/case-studies/retail-pioneers'
  },
  {
    id: '4',
    companyName: 'Startup Heroes',
    industry: 'Technology',
    companySize: 'small',
    logo: '/images/case-studies/startup-heroes-logo.svg',
    quote: 'As a small team, we needed to maximize our sales efficiency. GPTSalesAI has been a game-changer for us in understanding customer needs.',
    personName: 'David Patel',
    personRole: 'Founder & CEO',
    metrics: [
      { label: 'Lead Conversion', before: 8, after: 22, unit: '%' },
      { label: 'Sales Cycle Length', before: 45, after: 28, unit: 'days' }
    ],
    fullCaseStudyUrl: '/case-studies/startup-heroes'
  },
  {
    id: '5',
    companyName: 'FinGenius',
    industry: 'Financial Services',
    companySize: 'enterprise',
    logo: '/images/case-studies/fingenius-logo.svg',
    quote: 'GPTSalesAI helped our advisors handle complex client needs with personalized solutions, improving client retention significantly.',
    personName: 'Emma Wright',
    personRole: 'Head of Client Relations',
    metrics: [
      { label: 'Client Retention', before: 84, after: 96, unit: '%' },
      { label: 'Average Deal Size', before: 100, after: 135, unit: 'k$' }
    ],
    hasVideo: true,
    videoId: 'jkl789mno',
    fullCaseStudyUrl: '/case-studies/fingenius'
  }
];

// Industry counts for filter display
const INDUSTRIES = [
  'SaaS',
  'Marketing',
  'Retail',
  'Technology',
  'Financial Services'
];

// Company size labels
const COMPANY_SIZE_LABELS = {
  small: 'Small Business',
  medium: 'Mid-Market',
  large: 'Large Enterprise',
  enterprise: 'Global Enterprise'
};

/**
 * CustomerSuccessStories - Showcases real-world success stories and testimonials
 * from customers using GPTSalesAI
 */
const CustomerSuccessStories = () => {
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [isVideoModalOpen, setVideoModalOpen] = useState(false);
  const [activeVideoId, setActiveVideoId] = useState('');
  const [visibleCount, setVisibleCount] = useState(3);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Filter case studies based on selected filter
  const filteredCaseStudies = CASE_STUDIES.filter(study => {
    if (activeFilter === 'all') return true;
    
    // Check if filter is an industry
    if (INDUSTRIES.includes(activeFilter)) {
      return study.industry === activeFilter;
    }
    
    // Otherwise, filter by company size
    return study.companySize === activeFilter;
  });

  // Handle video modal opening
  const openVideoModal = (videoId: string) => {
    setActiveVideoId(videoId);
    setVideoModalOpen(true);
  };

  // Handle loading more case studies
  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 3, filteredCaseStudies.length));
  };

  // Check if section is in viewport for animations
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [sectionRef]);

  // Responsive breakpoint config for Masonry layout
  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  return (
    <section 
      ref={sectionRef}
      id="customer-success-stories" 
      className="py-16 md:py-24 bg-gradient-to-b from-white to-slate-50"
    >
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className={cn(
          "max-w-3xl mx-auto text-center mb-16 transition-opacity duration-1000",
          isInView ? "opacity-100" : "opacity-0"
        )}>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-900 mb-4 font-helvetica">
            Success Stories from Sales Leaders
          </h2>
          <p className="text-lg text-gray-700 font-roboto">
            Discover how companies are transforming their sales processes and achieving remarkable results with GPTSalesAI.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-2">
          <button
            onClick={() => setActiveFilter('all')}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-all",
              activeFilter === 'all'
                ? "bg-primary-700 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            All
          </button>
          
          {/* Industry filters */}
          {INDUSTRIES.map(industry => (
            <button
              key={industry}
              onClick={() => setActiveFilter(industry)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === industry
                  ? "bg-primary-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {industry}
            </button>
          ))}
          
          {/* Company size filters */}
          {Object.entries(COMPANY_SIZE_LABELS).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveFilter(key)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all",
                activeFilter === key
                  ? "bg-primary-700 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Featured Case Study - First item displayed prominently */}
        {filteredCaseStudies.length > 0 && (
          <div className={cn(
            "mb-16 transition-all duration-700",
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          )}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="flex flex-col lg:flex-row">
                {/* Left Side - Content */}
                <div className="lg:w-1/2 p-8 md:p-12 flex flex-col justify-between">
                  <div>
                    <img 
                      src={filteredCaseStudies[0].logo} 
                      alt={`${filteredCaseStudies[0].companyName} logo`}
                      className="h-12 mb-6"
                    />
                    
                    <blockquote className="mb-6">
                      <p className="text-xl md:text-2xl font-helvetica text-primary-800 italic">
                        "{filteredCaseStudies[0].quote}"
                      </p>
                    </blockquote>
                    
                    <div className="mb-8">
                      <p className="font-bold text-lg text-gray-900">{filteredCaseStudies[0].personName}</p>
                      <p className="text-gray-600">{filteredCaseStudies[0].personRole}, {filteredCaseStudies[0].companyName}</p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-6">
                    {filteredCaseStudies[0].metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="flex items-end gap-2">
                          <div className="text-3xl font-bold text-secondary-700">
                            {isInView && (
                              <CountUp 
                                end={metric.after} 
                                suffix={metric.unit} 
                                duration={2.5} 
                                delay={0.5}
                              />
                            )}
                          </div>
                          <div className="text-green-600 font-medium text-sm">
                            {metric.after > metric.before ? (
                              <>+{Math.round((metric.after - metric.before) / metric.before * 100)}%</>
                            ) : (
                              <>-{Math.round((metric.before - metric.after) / metric.before * 100)}%</>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Right Side - Video or Image */}
                <div className="lg:w-1/2 bg-gray-100 min-h-[300px] relative">
                  {filteredCaseStudies[0].hasVideo ? (
                    <div 
                      className="absolute inset-0 flex items-center justify-center cursor-pointer group"
                      onClick={() => openVideoModal(filteredCaseStudies[0].videoId!)}
                      role="button"
                      aria-label={`Watch ${filteredCaseStudies[0].companyName} video testimonial`}
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openVideoModal(filteredCaseStudies[0].videoId!)}
                    >
                      <div className="absolute inset-0 bg-gray-900 opacity-50 group-hover:opacity-40 transition-opacity"></div>
                      <div className="w-20 h-20 rounded-full bg-white bg-opacity-80 flex items-center justify-center z-10 group-hover:scale-110 transition-transform">
                        <svg className="w-10 h-10 text-primary-700" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                      <p className="absolute bottom-6 left-0 right-0 text-center text-white font-medium">Watch Testimonial</p>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-primary-900 to-secondary-800 opacity-20"></div>
                  )}
                  <img 
                    src={`/images/case-studies/${filteredCaseStudies[0].id}-featured.jpg`} 
                    alt={`${filteredCaseStudies[0].companyName} success story`}
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
              
              {/* CTA Button */}
              {filteredCaseStudies[0].fullCaseStudyUrl && (
                <div className="p-6 bg-gray-50 border-t border-gray-100">
                  <a 
                    href={filteredCaseStudies[0].fullCaseStudyUrl}
                    className="inline-flex items-center text-primary-700 font-medium hover:text-primary-800 transition-colors"
                  >
                    Read the full case study
                    <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                    </svg>
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Key Metrics Highlight */}
        <div className={cn(
          "bg-gradient-to-r from-primary-900 to-secondary-800 rounded-xl p-8 mb-16 text-white",
          "transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {isInView && <CountUp end={87} suffix="%" duration={2.5} />}
              </div>
              <p className="text-white text-opacity-80">Average Increase in Sales Productivity</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {isInView && <CountUp end={42} suffix="%" duration={2.5} />}
              </div>
              <p className="text-white text-opacity-80">Lead Conversion Improvement</p>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold mb-2">
                {isInView && <CountUp end={3.5} suffix="x" decimals={1} duration={2.5} />}
              </div>
              <p className="text-white text-opacity-80">Return on Investment</p>
            </div>
          </div>
        </div>

        {/* Case Study Grid */}
        <div className="mb-16">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="flex w-auto -ml-4"
            columnClassName="pl-4 bg-clip-padding"
          >
            {filteredCaseStudies.slice(1, visibleCount).map((caseStudy, index) => (
              <div 
                key={caseStudy.id}
                className={cn(
                  "mb-4 transition-all duration-700",
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10",
                  { "transition-delay-300": index % 3 === 0 },
                  { "transition-delay-500": index % 3 === 1 },
                  { "transition-delay-700": index % 3 === 2 }
                )}
              >
                <CaseStudyCard 
                  caseStudy={caseStudy} 
                  onVideoClick={() => caseStudy.hasVideo && openVideoModal(caseStudy.videoId!)} 
                />
              </div>
            ))}
          </Masonry>
          
          {/* Load More Button */}
          {visibleCount < filteredCaseStudies.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMore}
                className="px-6 py-3 bg-white border border-primary-700 text-primary-700 rounded-lg font-medium hover:bg-primary-50 transition-colors"
              >
                Load More Success Stories
              </button>
            </div>
          )}
        </div>
        
        {/* Company Logo Gallery */}
        <div className={cn(
          "mt-16 transition-all duration-700",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h3 className="text-2xl font-bold text-center mb-10 font-helvetica text-gray-800">
            Trusted by Sales Teams Worldwide
          </h3>
          <LogoGallery />
        </div>
        
        {/* CTA Section */}
        <div className={cn(
          "mt-16 text-center bg-gray-50 rounded-xl p-10",
          "transition-all duration-700 delay-300",
          isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        )}>
          <h3 className="text-2xl md:text-3xl font-bold mb-4 font-helvetica text-primary-900">
            Ready to achieve similar results?
          </h3>
          <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            Join the growing number of sales teams using GPTSalesAI to transform their sales process and drive exceptional results.
          </p>
          <button className="px-8 py-4 bg-primary-700 text-white rounded-lg font-medium hover:bg-primary-800 transition-colors shadow-lg">
            Request a Personalized Demo
          </button>
        </div>
      </div>
      
      {/* Video Modal */}
      <TestimonialVideoModal 
        isOpen={isVideoModalOpen}
        videoId={activeVideoId}
        onClose={() => setVideoModalOpen(false)}
      />
    </section>
  );
};

export default CustomerSuccessStories;
