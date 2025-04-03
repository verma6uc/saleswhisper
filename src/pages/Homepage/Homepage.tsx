
import { HeroSection, CustomerSuccessStories, RoiCalculator, CallToActionSignup } from './sections';

const Homepage = () => {
  return (
    <main>
      <HeroSection />
      <CustomerSuccessStories />
      <RoiCalculator />
      {/* Other sections would go here */}
      <CallToActionSignup />
    </main>
  );
};

export default Homepage;
  