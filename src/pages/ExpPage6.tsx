import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

import fanMeetImg from "@/assets/fan meet.png";

const ExpPage6 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="Fan" highlight="Meetup" subtitle="Exclusive access to meet international headliners up close. Limited spots." centered />

    <section className="py-6 md:py-8">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-warm text-center flex flex-col items-center"
        >
          <p className="text-base text-muted-foreground leading-relaxed max-w-2xl font-bold uppercase">
            Get close enough to say everything you have been saving up. Fan meet experiences with BANKAI BEATS 2026 headliners are coming. Passes will be announced alongside our full lineup reveal. Watch this space.
          </p>
          <button
            disabled
            className="mt-8 inline-flex items-center justify-center px-8 py-4 font-bold text-sm tracking-wide uppercase rounded-full text-white opacity-80 cursor-not-allowed"
            style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 16px hsl(var(--neon-red) / 0.3)' }}
          >
            Coming Soon
          </button>
        </motion.div>
      </div>
    </section>

    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage6;



