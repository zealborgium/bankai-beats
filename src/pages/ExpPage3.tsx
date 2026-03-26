import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage3 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="Entertainment" highlight="Arena" subtitle="Gaming, karaoke, mechanical bull, bouncy castle and more — fun in every corner." />
    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage3;
