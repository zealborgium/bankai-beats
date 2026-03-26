import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage8 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="Live" highlight="Bar" subtitle="Sake, rice beer and a full selection of liquor. Served responsibly to guests of legal drinking age." />
    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage8;
