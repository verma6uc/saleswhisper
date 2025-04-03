
import { useEffect } from 'react';
import MainLayout from '../../layouts/MainLayout';
import HeroSection from './sections/HeroSection/HeroSection';
import AIFeaturesShowcase from './sections/AIFeaturesShowcase/AIFeaturesShowcase';
import LiveGptDemo from './sections/LiveGptDemo/LiveGptDemo';
import GPTModelComparison from './sections/GPTModelComparison/GPTModelComparison';
import RoiCalculator from './sections/RoiCalculator/RoiCalculator';
import CustomerSuccessStories from './sections/CustomerSuccessStories/CustomerSuccessStories';
import PricingPlans from './sections/PricingPlans/PricingPlans';
import IntegrationEcosystem from './sections/IntegrationEcosystem/IntegrationEcosystem';
import CallToActionSignup from './sections/CallToActionSignup';

/**
 * Homepage component
 * 
 * This is the main landing page for SalesWhisper that integrates all section components
 * in a logical flow to guide users through the platform's value proposition.
 */
const Homepage = () => {
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="homepage">
      {/* Hero section - Primary value proposition and CTA */}
      <HeroSection />
      
      {/* Showcase of AI capabilities */}
      <AIFeaturesShowcase />
      
      {/* Interactive demo of the platform */}
      <LiveGptDemo />
      
      {/* Comparison of different GPT models used */}
      <GPTModelComparison />
      
      {/* ROI calculator to demonstrate value */}
      <RoiCalculator />
      
      {/* Success stories and testimonials */}
      <CustomerSuccessStories />
      
      {/* Pricing plans and options */}
      <PricingPlans />
      
      {/* Integration capabilities */}
      <IntegrationEcosystem />
      
      {/* Final call to action */}
      <CallToActionSignup />
    </div>
  );
};

export default Homepage;
