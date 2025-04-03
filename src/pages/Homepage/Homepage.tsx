
import { MainLayout } from '../../layouts/MainLayout';
import { 
  HeroSection, 
  AIFeaturesShowcase, 
  GPTModelComparison, 
  LiveGptDemo,
  CustomerSuccessStories
} from './sections';

const Homepage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AIFeaturesShowcase />
      <GPTModelComparison />
      <LiveGptDemo />
      <CustomerSuccessStories />
    </MainLayout>
  );
};

export default Homepage;
