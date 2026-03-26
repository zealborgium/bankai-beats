import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage6 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="Fan" highlight="Meetup" subtitle="Exclusive access to meet international headliners up close. Limited spots." />
    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage6;
