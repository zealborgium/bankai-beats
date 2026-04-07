import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import heroConcert from "@/assets/hero-concert.jpg";
import marqueeTheater from "@/assets/marquee-theater.jpg";
import heroGaming from "@/assets/hero-gaming.jpg";
import heroBand from "@/assets/hero-band.jpg";
import heroCosplay from "@/assets/hero-cosplay.jpg";
import heroFestival from "@/assets/hero-festival.jpg";

const zoneFood = "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=600&h=300&fit=crop";
const zoneKpop = "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop";

const marqueeImages = [
  { src: heroConcert, alt: "Live music" },
  { src: marqueeTheater, alt: "Theater performance" },
  { src: heroGaming, alt: "Gaming zone" },
  { src: zoneFood, alt: "Street food" },
  { src: heroBand, alt: "Band performance" },
  { src: heroCosplay, alt: "Cosplay" },
  { src: heroFestival, alt: "Festival crowd" },
  { src: zoneKpop, alt: "K-pop dance" },
];

const stats = [
  { number: "15,000+", label: "Expected Attendees" },
  { number: "10+", label: "International & Indian Artists" },
  { number: "12 Hrs", label: "Of Festival" },
  { number: "8+", label: "Experience Zones" },
];

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="about" className="py-16 md:py-20" ref={ref}>
      <div className="section-container">
        {/* Image marquee strip */}
        <div className="overflow-hidden mb-12 w-screen -ml-[calc((100vw-100%)/2)]">
          <div className="marquee-track">
            {[...marqueeImages, ...marqueeImages, ...marqueeImages, ...marqueeImages].map((img, i) => (
              <div
                key={i}
                className="w-48 h-36 rounded-2xl mx-3 overflow-hidden shrink-0"
                style={{ border: '1px solid hsla(0, 0%, 100%, 0.1)', background: 'hsla(0, 0%, 100%, 0.04)', boxShadow: '0 4px 24px hsla(0, 0%, 100%, 0.05)' }}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="card-warm">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="section-label"
          >
            What is BANKAI BEATS?
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="section-title"
          >
            The No.1 Fest for:{" "}
            <span className="text-neon-red glow-text-red">Anime</span> &{" "}
            <span className="text-neon-purple glow-text-purple">K-pop</span>{" "}
            <span className="text-foreground">Fandom</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-base text-muted-foreground leading-relaxed"
          >
            The culture was always here. The festival never built. Until now!
            BANKAI BEATS is India's first full-scale anime and K-pop festival. International headliners flying in from Korea and Japan. Cosplay Championship & Dance Battle on the main stage. 15,000+ fans. One day. One stage. One festival that changes everything.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="card-warm mt-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.1 }}
                className="text-center"
              >
                <div className={`text-3xl md:text-4xl font-display font-bold ${i % 2 === 0 ? 'text-primary glow-text-red' : 'text-secondary glow-text-purple'} mb-2`}>
                  {stat.number}
                </div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;



