import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

const values = [
  { title: "Community First", desc: "Every decision we make starts with what's best for the fans. We listen, we adapt, and we build together." },
  { title: "Inclusivity", desc: "Whether you're a cosplayer, a casual anime watcher, or a hardcore K-pop stan, there's a place for you here." },
  { title: "Authenticity", desc: "No watered-down experiences. We bring real artists, real food, real culture, the way fans deserve it." },
  { title: "Innovation", desc: "We push boundaries in event production, blending cutting-edge tech with grassroots community energy." },
];

const team = [
  { name: "Shashank", role: "Founder & Festival Director", emoji: "🎪" },
  { name: "Ravi", role: "Chief Operations Officer", emoji: "⚙️" },
  { name: "Akash", role: "Head — Marketing & Communications", emoji: "📣" },
  { name: "Adhitya", role: "Head — Revenue & Partnerships", emoji: "💰" },
  { name: "Vaibhav", role: "Head — Talent & Hospitality", emoji: "🎤" },
  { name: "Smaran", role: "Head — Operations & Logistics", emoji: "📦" },
  { name: "Aamir", role: "Head — Production & Security", emoji: "🛡️" },
];

const About = () => {
  const storyRef = useRef(null);
  const valuesRef = useRef(null);
  const visionRef = useRef(null);
  const teamRef = useRef(null);
  const storyInView = useInView(storyRef, { once: true, margin: "-80px" });
  const valuesInView = useInView(valuesRef, { once: true, margin: "-80px" });
  const visionInView = useInView(visionRef, { once: true, margin: "-80px" });
  const teamInView = useInView(teamRef, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <PageHero
        title="About"
        highlight="Us"
        subtitle="Every festival has an origin story. Ours started with a fandom that deserved better. Built by fans. Backed by experience. This is the story behind India's First Anime & K-Pop Music Festival."
      />

      {/* Dellusion Entertainment */}
      <section className="py-10 md:py-14" ref={storyRef}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={storyInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="card-warm"
          >
            <span className="section-label">Who We Are</span>
            <h2 className="section-title !mb-4">
              <span className="text-secondary glow-text-purple">Dellusion</span> Entertainment
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                Dellusion Entertainment was born inside the fandom, not outside it. We are anime watchers, K-pop listeners, and culture obsessives who realized that the community we were part of deserved a festival built by people who actually understood it.
              </p>
              <p>
                Every event we have run has been community-first, fan-driven, and built with genuine love for the culture. We are not here to capitalize on a trend. We are here because this is our culture too and we had the drive to build something worthy of it.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What is Bankai Beats */}
      <section className="py-10 md:py-14">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-warm"
          >
            <span className="section-label">The Festival</span>
            <h2 className="section-title">
              What is <span className="text-primary glow-text-red">BANKAI BEATS</span>?
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                It isn't a convention. It isn't a concert. It's something India has never had before. A full-scale Music Festival built entirely around Anime and K-pop culture. Conventions give you stalls. Concerts give you one artist. BANKAI BEATS gives you both and then some. International headliners flying in from Korea and Japan. A cosplay championship that belongs on the main stage. 15,000+ fans under one sky. One day. One stage. One festival that changes everything.
              </p>
              <p>
                India's Anime and K-pop fandom is one of the fastest growing in the world. Millions of fans, hundreds of communities, and years of passion with nowhere near enough to show for it on the live events stage. BANKAI BEATS was built to change that. Built by fans who were tired of waiting. Built for a community that has always deserved better.
              </p>
              <p>
                Step inside and you will find a world built entirely around the culture you love. International K-pop & J-pop headliners performing on a massive stage. A fully transparent cosplay championship with the platform it has always deserved. Kimono and hanbok trial zones. Authentic ramen and Korean BBQ. 40+ merch stalls. 25+ food stalls. Karaoke rooms, fan meetups, gaming zone, bar setup, and energy that does not stop from the moment the gates open to the final note of the night.
              </p>
              <p>
                This is not just a festival. It is the moment the anime and K-pop community in India has been building toward.
              </p>
              <p>
                The pilot festival date and venue will be announced soon with future editions planned for multiple cities across India.
              </p>
              <p className="text-foreground font-display font-bold text-base">
                The name "BANKAI," borrowed from the anime BLEACH, means to release your full power. That's exactly what this festival is about.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="py-10 md:py-14" ref={valuesRef}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            className="card-warm"
          >
            <h2 className="section-title text-center mb-6">
              Our <span className="text-secondary glow-text-purple">Values</span>
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((value, i) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={valuesInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="card-inner"
                >
                  <div className="w-3 h-3 bg-primary mb-4 rounded-sm" />
                  <h3 className="font-display font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{value.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-10 md:py-14" ref={visionRef}>
        <div className="section-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={visionInView ? { opacity: 1, y: 0 } : {}}
            className="card-warm"
          >
            <h2 className="section-title">
              The <span className="text-primary glow-text-red">Vision</span>
            </h2>
            <div className="space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                India is at an inflection point. The anime and K-pop fandom here is not just growing. It is becoming one of the most powerful youth culture forces in the world. We are not here to ride that wave. We are here to lead it.
              </p>
              <p>
                BANKAI BEATS starts in Delhi. But the vision goes far beyond one city and one festival. We are building a live entertainment brand that grows with the community, pushes the boundaries of what a music festival can be, and creates new benchmarks for Asian pop culture events in India every single year.
              </p>
              <p>
                More cities. Bigger headliners. New experiences that have never been done before in this country. And a community that gets stronger, louder, and more connected with every edition.
              </p>
              <p>
                The fandom built this culture. We are here to give it the stage it deserves. And we are just getting started.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Team */}
      <section className="py-10 md:py-14" ref={teamRef}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={teamInView ? { opacity: 1, y: 0 } : {}}
            className="card-warm"
          >
            <div className="text-center mb-8">
              <h2 className="section-title">
                Meet The <span className="text-secondary glow-text-purple">Team</span>
              </h2>
              <p className="text-base text-muted-foreground">
                The passionate people behind BANKAI BEATS.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              {team.map((member, i) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={teamInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="card-inner text-center w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
                >
                  <div className="w-20 h-20 mx-auto mb-3 flex items-center justify-center rounded-full border-2 border-border bg-muted text-3xl">
                    {member.emoji}
                  </div>
                  <h4 className="font-display font-bold text-base">{member.name}</h4>
                  <p className="text-xs text-muted-foreground mt-1 font-mono">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 md:py-14">
        <div className="section-container">
          <div className="card-warm">
            <h2 className="section-title text-center mb-8">
              What We Have <span className="text-primary glow-text-red">Done So Far</span>
            </h2>
            <div className="grid grid-cols-3 gap-8">
              {[
                { number: "15+", label: "Events Executed via Team Members" },
                { number: "10+", label: "Cities Covered" },
                { number: "100K+", label: "Community Reach" },
              ].map((stat, i) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.1 }}
                  className="text-center"
                >
                  <div className={`text-3xl md:text-4xl font-display font-bold ${i % 2 === 0 ? 'text-primary glow-text-red' : 'text-secondary glow-text-purple'} mb-2`}>
                    {stat.number}
                  </div>
                  <p className="text-sm text-muted-foreground font-mono uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <ContactForm page="About" />
      <Footer />
    </div>
  );
};

export default About;
