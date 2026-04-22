
import HeroSection from "./components/AUtomation";
import CaseStudies from "./components/casestudies";
import CTASection from "./components/CTASection";
import Hero from "./components/Hero";
import OfferBanner from "./components/OfferBanner";
import PackagesSection from "./components/Packages";
import SolutionsSection from "./components/Solutions";
import ToolsSection from "./components/Tools";
import TestimonialsSection from "./components/Testimonials";
import VideoSection from "./components/Video";

export default function Home() {
  return (
    <main className="relative">
      <Hero />
      <SolutionsSection />
      <VideoSection />
      <HeroSection />
      <PackagesSection />
      <ToolsSection />
      <CaseStudies />
      <TestimonialsSection />
      <CTASection />
      <OfferBanner />
    </main>
  );
}
