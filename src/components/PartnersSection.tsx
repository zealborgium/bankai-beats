import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "400M+", label: "Gen-Z population in India" },
  { number: "#1", label: "Anime growth market globally" },
  { number: "10x", label: "K-pop fan growth since 2020" },
];

const opportunities = [
  { title: "Investors", desc: "First-mover advantage in the Asian pop culture festival space" },
  { title: "Brand Sponsors", desc: "Connect with 15,000+ engaged Gen-Z consumers" },
  { title: "Exhibitors & Vendors", desc: "Showcase products to anime, K-pop, and gaming fans" },
  { title: "Media Partners", desc: "Cover India's biggest Asian pop culture movement" },
];

const PartnersSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="partners" className="py-10 md:py-14" ref={ref}>
      <div className="section-container">
        {/* Why this festival matters */}
        <div className="card-warm mb-8">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-label"
          >
            The Opportunity
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="section-title"
          >
            Why This Festival{" "}
            <span className="text-secondary glow-text-purple">Matters</span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
          >
            <p className="text-base text-muted-foreground leading-relaxed mb-4">
              India's Gen-Z audience is rapidly and powerfully embracing anime, K-pop, and Asian pop culture. The community is massive, the passion is undeniable, and the demand for a festival that matches it has never been higher. BANKAI BEATS is that festival.
            </p>
            <p className="text-foreground font-display font-bold text-base">
              BANKAI BEATS aims to become India's flagship festival.
            </p>
          </motion.div>

          <div className="card-inner">
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-display font-bold text-neon-red glow-text-red mb-2">
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Partnership Opportunities */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4 }}
          className="card-warm"
        >
          <div className="text-center mb-6">
            <h2 className="section-title">
              Partnership{" "}
              <span className="text-secondary glow-text-purple">Opportunities</span>
            </h2>
            <p className="text-base text-muted-foreground">
              Join us in shaping India's biggest Asian pop culture experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {opportunities.map((opp, i) => (
              <motion.div
                key={opp.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.06 }}
                className="card-inner cursor-default"
              >
                <div className="w-3 h-3 bg-primary mb-4 rounded-sm" />
                <h3 className="font-display font-bold text-lg mb-2">
                  {opp.title}
                </h3>
                <p className="text-sm text-muted-foreground">{opp.desc}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PartnersSection;
