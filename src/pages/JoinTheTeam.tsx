import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const JoinTheTeam = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero
      title="Join The"
      highlight="Team"
      subtitle="Be part of the team building India's first Anime & K-Pop Music Festival. We're looking for passionate people who live and breathe the culture."
    />
    <ContactCTA />
    <Footer />
  </div>
);

export default JoinTheTeam;
