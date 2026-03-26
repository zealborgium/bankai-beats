import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage4 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="Live" highlight="Experience" subtitle="Kimono, yukata, hanbok trials, face painting, tattoos and flow artists." />
    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage4;
