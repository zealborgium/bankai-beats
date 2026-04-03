import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const team = [
  { name: "Shashank Rawat", role: "Founder & Festival Director" },
  { name: "Aamir", role: "Head — Production & Security" },
  { name: "Ravi", role: "Chief Operations Officer" },
  { name: "Smaran", role: "Head — Operations & Logistics" },
  { name: "Vaibhav", role: "Head — Talent & Hospitality" },
  { name: "KP", role: "Head — Revenue & Partnerships" },
];

const stats = [
  { number: "15+", label: "Events Executed" },
  { number: "10+", label: "Cities Covered" },
  { number: "100K+", label: "Community Reach" },
];

const communityImages = [
  { src: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=400&h=300&fit=crop", alt: "Festival event venue" },
  { src: "https://images.unsplash.com/photo-1504680177321-2e6a879aac86?w=400&h=300&fit=crop", alt: "DJ performance" },
  { src: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=400&h=300&fit=crop", alt: "Festival activities" },
];

const CommunitySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="community" className="py-6 md:py-8" ref={ref}>
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="card-warm"
        >
          <div className="text-center mb-6">
            <h2 className="section-title">
              An Event Run by The{" "}
              <span className="text-secondary glow-text-purple">Community</span>, For The{" "}
              <span className="text-primary glow-text-red">Community</span>
            </h2>
            <p className="text-base text-muted-foreground">
              This event is run by passionate community members at Dellusion
              Entertainment. Our motivation is to lead with kindness, inclusivity,
              and amazing experiences for every fan.
            </p>
          </div>

          {/* Team */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            {team.map((member, i) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="card-inner text-center"
              >
                <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center text-lg font-display font-bold text-primary rounded-full border-2 border-border bg-muted">
                  {member.name[0]}
                </div>
                <h4 className="font-display font-bold text-sm">{member.name}</h4>
                <p className="text-xs text-muted-foreground mt-1 font-mono">
                  {member.role}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Community images */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {communityImages.map((img, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.1 }}
                className="aspect-[4/3] rounded-2xl overflow-hidden"
                style={{ border: '1px solid hsla(0, 0%, 100%, 0.07)' }}
              >
                <img src={img.src} alt={img.alt} className="w-full h-full object-cover" loading="lazy" />
              </motion.div>
            ))}
          </div>

          {/* Stats */}
          <div className="card-inner">
            <div className="grid grid-cols-3 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.7 + i * 0.1 }}
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
        </motion.div>
      </div>
    </section>
  );
};

export default CommunitySection;



