import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage5 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="Food" highlight="Court" subtitle="25+ curated stalls with authentic Japanese and Korean cuisine." />
    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage5;
