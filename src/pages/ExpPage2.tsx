import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const ExpPage2 = () => (
  <div className="min-h-screen text-foreground overflow-x-hidden">
    <Navbar />
    <PageHero title="" highlight="Competitions" subtitle="India's most transparent cosplay championship and K-pop dance battle on the main stage." centered />

    {/* Cosplay Championship */}
    <section className="py-6 md:py-8">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-warm text-center flex flex-col items-center"
        >
          <h2 className="section-title mb-6">
            Cosplay <span className="text-primary glow-text-red">Championship</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            The main stage belongs to the cosplayers too. At BANKAI BEATS 2026, cosplay is not a side event. It is a centrepiece. The BANKAI BEATS Cosplay Championship is India's most ambitious cosplay competition, bringing together builders, performers, and creators from every corner of the country onto one of India's biggest festival stages.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mt-4">
            If you live and breathe the characters you bring to life, this is your moment. From the detail of your craft to the power of your performance, every element will be celebrated. Categories will span across anime, K-pop, gaming, and beyond. Judging will recognise craftsmanship, accuracy, creativity, and stage presence. Full competition details, prize structure, and registration will be announced soon.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            <button disabled className="btn-primary opacity-70 cursor-not-allowed">Learn More (Coming Soon)</button>
            <button disabled className="btn-outline opacity-70 cursor-not-allowed">Register Now (Coming Soon)</button>
          </div>
        </motion.div>
      </div>
    </section>

    {/* K-Pop Group Dance Battle */}
    <section className="py-6 md:py-8">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="card-warm text-center flex flex-col items-center"
        >
          <h2 className="section-title mb-6">
            K-Pop Group <span className="text-neon-purple glow-text-purple">Dance Battle</span>
          </h2>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl">
            Your group has been practising in living rooms, studios, and rooftops. Now there is a stage worth showing up for. The BANKAI BEATS K-pop Group Dance Battle is bringing India's best cover dance crews to the festival floor to compete in front of a live crowd of 15,000 fans.
          </p>
          <p className="text-base text-muted-foreground leading-relaxed max-w-3xl mt-4">
            This is not just another dance competition. It is the largest K-pop dance battle stage India has ever seen, built specifically for the community that has kept this culture alive and growing across every city in the country. Synchronisation, formation, energy, and stage presence will all be part of the experience. Whether your crew has been together for six months or six years, if K-pop runs through everything you do, this stage is yours. Competition format, group size requirements, song selection rules, prize details, and registration will all be announced soon. Start preparing.
          </p>
          <div className="flex flex-wrap gap-4 mt-8 justify-center">
            <button disabled className="btn-primary opacity-70 cursor-not-allowed">Learn More (Coming Soon)</button>
            <button disabled className="btn-outline opacity-70 cursor-not-allowed">Register Now (Coming Soon)</button>
          </div>
        </motion.div>
      </div>
    </section>

    <ContactCTA />
    <Footer />
  </div>
);

export default ExpPage2;



