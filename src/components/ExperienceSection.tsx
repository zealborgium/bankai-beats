import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const zones = [
  { title: "Live Music", desc: "Electrifying performances from top Asian music artists", img: "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=400&h=300&fit=crop" },
  { title: "K-pop Headliners", desc: "World-class K-pop groups performing live", img: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=400&h=300&fit=crop" },
  { title: "Anime Music", desc: "Favorite anime soundtracks performed on stage", img: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=400&h=300&fit=crop" },
  { title: "Cosplay Championships", desc: "India's biggest cosplay competition", img: "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?w=400&h=300&fit=crop" },
  { title: "Gaming", desc: "Esports tournaments and exclusive game demos", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=400&h=300&fit=crop" },
  { title: "Merch Marketplace", desc: "Exclusive figures and limited-edition collectibles", img: "https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=400&h=300&fit=crop" },
  { title: "Street Food", desc: "Authentic Japanese, Korean, and pan-Asian cuisine", img: "https://images.unsplash.com/photo-1569025690938-a00729c9e1f9?w=400&h=300&fit=crop" },
  { title: "Fan Meetups", desc: "Community meetups, panels, and Q&As", img: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=300&fit=crop" },
];

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="experience" className="py-6 md:py-8" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="card-warm"
        >
          <h2 className="section-title text-center mb-6">What to <span className="text-secondary glow-text-purple">Expect</span></h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {zones.map((zone, i) => (
              <motion.div
                key={zone.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5 }}
                className="card-inner text-center cursor-default group overflow-hidden"
              >
                <div className="w-full h-32 overflow-hidden mb-4 rounded-xl">
                  <img
                    src={zone.img}
                    alt={zone.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-display font-bold text-base mb-2">
                  {zone.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {zone.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ExperienceSection;



