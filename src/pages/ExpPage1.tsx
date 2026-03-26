import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage1 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="Live" highlight="Music" subtitle="The heart of BANKAI BEATS. 10+ hours of non-stop live performances on the main stage." />
    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage1;
