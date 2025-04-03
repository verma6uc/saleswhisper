
import React from 'react';
import MainLayout from '../../layouts/MainLayout';
import {
  AIFeaturesShowcase,
  CustomerSuccessStories,
  RoiCalculator,
  IntegrationEcosystem
} from './sections';

const Homepage: React.FC = () => {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero section would go here */}
        
        {/* Features showcase */}
        <AIFeaturesShowcase />
        
        {/* Integration ecosystem */}
        <IntegrationEcosystem />
        
        {/* Success stories */}
        <CustomerSuccessStories />
        
        {/* ROI calculator */}
        <RoiCalculator />
        
        {/* Other sections */}
      </div>
    </MainLayout>
  );
};

export default Homepage;
