
import { Suspense } from 'react';
import MainLayout from '../../layouts/MainLayout';
import HeroSection from './sections/HeroSection/HeroSection';
import AIFeaturesShowcase from './sections/AIFeaturesShowcase/AIFeaturesShowcase';

const Homepage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <Suspense fallback={<div className="h-96 w-full bg-gray-100"></div>}>
        <AIFeaturesShowcase />
      </Suspense>
      {/* Add other sections here as they are created */}
    </MainLayout>
  );
};

export default Homepage;
  