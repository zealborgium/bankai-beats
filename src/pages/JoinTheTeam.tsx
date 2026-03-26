import { motion } from "framer-motion";
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

    <section className="py-10 md:py-14">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-6 justify-center"
        >
          {/* Member */}
          <div className="card-warm flex-1 flex flex-col items-center justify-center text-center">
            <button
              disabled
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm tracking-wide uppercase rounded-full text-white opacity-70 cursor-not-allowed"
              style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 16px hsl(var(--neon-red) / 0.3)' }}
            >
              Join as a Member (Coming Soon)
            </button>
          </div>

          {/* Volunteer */}
          <div className="card-warm flex-1 flex flex-col items-center justify-center text-center">
            <button
              disabled
              className="inline-flex items-center justify-center px-8 py-4 font-bold text-sm tracking-wide uppercase rounded-full text-white opacity-70 cursor-not-allowed"
              style={{ background: 'hsl(var(--secondary))', boxShadow: '0 4px 16px hsl(var(--neon-purple) / 0.3)' }}
            >
              Join as a Volunteer (Coming Soon)
            </button>
          </div>
        </motion.div>
      </div>
    </section>

    <ContactCTA />
    <Footer />
  </div>
);

export default JoinTheTeam;
