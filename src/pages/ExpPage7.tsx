import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage7 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="Merch" highlight="Marketplace" subtitle="40+ vendors with exclusive anime and K-pop merchandise, collectibles and more." />
    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage7;
