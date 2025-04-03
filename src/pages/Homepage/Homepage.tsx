
import { MainLayout } from '../../layouts';
import { AIFeaturesShowcase, PricingPlans } from './sections';

/**
 * Homepage Component
 * 
 * The main landing page of the application that showcases the product
 * features, benefits, and pricing plans.
 */
const Homepage = () => {
  return (
    <MainLayout>
      {/* Hero section would go here */}
      <AIFeaturesShowcase />
      {/* Other sections would go here */}
      <PricingPlans />
      {/* More sections would go here */}
    </MainLayout>
  );
};

export default Homepage;
  