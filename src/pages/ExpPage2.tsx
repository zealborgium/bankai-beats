import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage2 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="" highlight="Competitions" subtitle="India's most transparent cosplay championship and K-pop dance battle on the main stage." />
    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage2;
