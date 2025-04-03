
import { 
  HeroSection, 
  AIFeaturesShowcase, 
  LiveGptDemo, 
  GPTModelComparison,
  RoiCalculator
} from "./sections";
import MainLayout from "@/layouts/MainLayout";

const Homepage = () => {
  return (
    <MainLayout>
      <HeroSection />
      <AIFeaturesShowcase />
      <LiveGptDemo />
      <GPTModelComparison />
      <RoiCalculator />
    </MainLayout>
  );
};

export default Homepage;
  