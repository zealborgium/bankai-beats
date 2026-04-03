import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ContactCTA from "@/components/ContactCTA";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <CTASection />
      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Index;



