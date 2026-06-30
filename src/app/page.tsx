import HeroSection from "./components/AUtomation";
import CaseStudies from "./components/casestudies";
import CTASection from "./components/CTASection";
import Hero from "./components/Hero";
import FeaturesSection from "./components/Scroll";
import OfferBanner from "./components/OfferBanner";
import PackagesSection from "./components/Packages";
import SolutionsSection from "./components/Solutions";
import ToolsSection from "./components/Tools";
import TestimonialsSection from "./components/Testimonials";
import VideoSection from "./components/Video";
import GlobeSection from "./components/GlobeSection";

export default function Home() {
  return (
    <main className="relative z-0">
      <Hero />
      <GlobeSection />
      <div id="features-section">
        <FeaturesSection />
      </div>
      <SolutionsSection />
      <VideoSection />
      <HeroSection />
      <ToolsSection />
      <CaseStudies />
      <TestimonialsSection />
      <PackagesSection />
      <OfferBanner />
      <CTASection />
    </main>
  );
}
