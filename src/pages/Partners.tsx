import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import PartnerDialog from "@/components/PartnerDialog";
import Footer from "@/components/Footer";
import ContactForm from "@/components/ContactForm";
import PageHero from "@/components/PageHero";

const stats = [
  { number: "400M+", label: "Gen-Z population in India" },
  { number: "#1", label: "Anime growth market globally" },
  { number: "10x", label: "K-pop fan growth since 2020" },
  { number: "15,000+", label: "Expected attendees" },
];

const opportunities = [
  { title: "Investors", desc: "First-mover advantage in the Asian pop culture festival space. Early-stage opportunity with massive growth potential.", img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=450&fit=crop" },
  { title: "Brand Sponsors", desc: "Connect with 15,000+ engaged Gen-Z consumers through branded activations, product sampling, and immersive experiences.", img: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=450&fit=crop" },
  { title: "Exhibitors & Vendors", desc: "Showcase products to anime, K-pop, and gaming fans. 40+ stall spaces available for merch, art, and collectibles.", img: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=600&h=450&fit=crop" },
  { title: "Media Partners", desc: "Cover India's biggest Asian pop culture movement. Exclusive press access, interviews, and behind-the-scenes content.", img: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=600&h=450&fit=crop" },
  { title: "F&B Partners", desc: "Serve authentic Asian cuisine to 15,000+ hungry festival-goers. 25+ curated food stall spaces available.", img: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=450&fit=crop" },
];

const Partners = () => {
  const ref = useRef(null);
  const formRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const location = useLocation();

  const handlePartnerClick = () => {
    setFormOpen(true);
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  useEffect(() => {
    if (location.hash === "#contact-form") {
      setFormOpen(true);
      setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 300);
    }
  }, [location.hash]);

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Why This Festival"
        highlight="Matters"
        subtitle="India's Gen-Z audience is rapidly and powerfully embracing anime, K-pop, and Asian pop culture. The community is massive, the passion is undeniable, and the demand for a festival that matches it has never been higher. BANKAI BEATS is that festival."
      />

      {/* Stats */}
      <section className="py-10 md:py-14">
        <div className="section-container">
          <div className="card-warm">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-neon-purple glow-text-purple mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section className="py-10 md:py-14" ref={ref}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="card-warm"
          >
            <div className="text-center mb-8">
              <h2 className="section-title">
                Partnership <span className="text-primary glow-text-red">Opportunities</span>
              </h2>
              <p className="text-base text-muted-foreground">
                Join us in shaping India's biggest Asian pop culture experience.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {opportunities.map((opp, i) => (
                <motion.div
                  key={opp.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.06 }}
                  className="card-inner cursor-pointer overflow-hidden group text-center w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
                  onClick={() => { setSelectedPartner(opp.title); setDialogOpen(true); }}
                >
                  <div className="w-full h-36 overflow-hidden mb-4 -mt-1 rounded-xl">
                    <img
                      src={opp.img}
                      alt={opp.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-display font-bold text-lg mb-2">{opp.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{opp.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 md:py-14">
        <div className="section-container text-center">
          <div className="card-warm">
            <h2 className="section-title">Let's Build This <span className="text-secondary glow-text-purple">Together</span></h2>
            <p className="text-base text-muted-foreground mb-8">
              BANKAI BEATS aims to become India's flagship Asian pop culture festival. Be an early partner.
            </p>
            <a onClick={handlePartnerClick} className="btn-primary cursor-pointer">Partner With Us</a>
          </div>
        </div>
      </section>

      {/* Contact Form - expands below CTA when triggered */}
      <AnimatePresence>
        {formOpen && (
          <motion.div
            ref={formRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <ContactForm page="Partners" excludeOptions={["Fan / Attendee"]} heading={<><span className="text-neon-purple glow-text-purple">Partner</span> With Us</>} usePartnersSheet />
          </motion.div>
        )}
      </AnimatePresence>

      <PartnerDialog open={dialogOpen} onOpenChange={setDialogOpen} partnerType={selectedPartner} />

      <Footer />
    </div>
  );
};

export default Partners;
