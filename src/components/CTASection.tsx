import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const CTASection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-6 md:py-8 relative" ref={ref}>
      {/* Ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />
      
      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center card-warm"
        >
          <h2 className="section-title">
            Be Part of the{" "}
            <span className="text-neon-purple glow-text-purple whitespace-nowrap">Community-Led</span>
            <br />
            Festival of the Year
          </h2>
          <div className="text-base text-muted-foreground mb-6 leading-relaxed space-y-4">
            <p>The fandom in India is massive. The festivals never matched it. We were fans first. The same late nights watching anime, the same K-pop playlists on repeat, the same frustration of watching the rest of the world get festivals India deserved. So we built it.</p>
            <p>BANKAI BEATS was born from the culture, designed for the community, and scaled for the moment India's anime and K-pop scene has been building toward for years. An incredible journey celebrating Asian pop culture with live music, amazing food, and unforgettable experiences. This is that moment.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;



