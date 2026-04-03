import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactCTA from "@/components/ContactCTA";
import PageHero from "@/components/PageHero";
import stagImg from "@/assets/Stage_imgupscaler.ai_General_8K.jpg";
import merchImg from "@/assets/merch.jpeg";
import barImg from "@/assets/bar.png";
import fanMeetImg from "@/assets/fan meet.png";
import foodCourtImg from "@/assets/food court.png";
import liveExpImg from "@/assets/live experience.png";
import cosplayImg from "@/assets/cosplay.png";

const zones = [
  { title: "Live Music", desc: "The heart of BANKAI BEATS. Our main stage runs for 10+ hours of non-stop action. International K-pop and J-pop artists. A live international DJ set. India's best anime and K-pop cover performers. Live band performances. Every performance backed by full festival-grade production with massive LED walls, intelligent lighting, lasers, and sound that hits you in the chest.", details: "This is not a convention side stage. This is the real thing.", img: stagImg },
  { title: "Cosplay Championship & K-pop Dance Battle", desc: "India's most transparent cosplay championship. National and international judges. Clear rules, clear categories, zero ambiguity. All genres welcome across armour, fabric, VFX, and more. Not just anime and K-pop. If the craft is there, the stage is yours. Alongside it, India's best K-pop dance crews go head to head in a battle that only one team can win.", details: "Two competitions. Serious prizes. Unforgettable moments.", img: cosplayImg },
  { title: "Entertainment Arena", desc: "Because a festival should be fun in every single corner. The Entertainment Arena is where attendees come to let loose and exist in the moment. A mechanical bull ride and bouncy castle for adults. A gaming area for those who live for the competition. Karaoke rooms to belt out favourite anime openings and K-pop bangers. Photo booths built for the culture. And more surprises that only reveal themselves on the day.", details: "No agenda. No schedule. Just good times from the moment the gates open.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Live Experience", desc: "Where the culture comes to life beyond the stage. Try on a kimono, yukata, or hanbok and step into the aesthetic that inspires millions. Get a face painting, a temporary tattoo, or go permanent for the ones who are ready. Watch flow artists move through the grounds with an energy that is hard to look away from.", details: "And more experiences scattered across the zone that make every visit feel different.", img: liveExpImg },
  { title: "Food Court", desc: "A festival for the culture deserves food that matches it. 25+ specially curated food stalls bringing authentic Japanese and Korean cuisine to the grounds. Ramen, takoyaki, Korean BBQ, tteokbokki, and more, prepared the way it is meant to taste. For those who want something more familiar, fast food options are available across the zone. And for the ones with a sweet tooth, cotton candy stalls and more keep the good times going.", details: "Good food. Good company. Good vibes.", img: foodCourtImg },
  { title: "Fan Meetup", desc: "The closest fans can get to the artists they love. Purchase a Fan Meetup pass and get exclusive access to meet the international headliners up close. A rare opportunity that does not come around often. Available at an additional cost with limited spots.", details: "Do not miss it.", img: fanMeetImg },
  { title: "Merch Marketplace", desc: "40+ carefully selected vendors bringing exclusive anime and K-pop merchandise to one place. Figures, posters, apparel, accessories, limited edition collectibles, and more. The kind of finds that do not show up anywhere else. For the casual fan picking up a memento or the serious collector hunting for something rare, the Merch Marketplace delivers.", details: "A collector's paradise. All under one roof.", img: merchImg },
  { title: "Live Bar", desc: "A festival experience is not complete without a bar that matches the culture. The Live Bar brings sake and rice beer for the anime and K-pop faithful, alongside a full selection of liquor for every taste.", details: "Served responsibly and exclusively to guests of legal drinking age.", img: barImg },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <PageHero
        title="The"
        highlight="Experience"
        subtitle="8 immersive zones, 12 hours of non-stop entertainment, 1 festival built entirely around the culture you love and memories that last a lifetime."
      />

      <section className="py-6 md:py-8" ref={ref}>
        <div className="section-container">
          <div className="card-warm">
            <h2 className="section-label mb-6 text-primary">Festival Zones</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {zones.map((zone, i) => (
                <motion.div
                  key={zone.title}
                  initial={{ opacity: 0, y: 40 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.6 }}
                  className="card-inner group overflow-hidden"
                >
                  <div className="aspect-[4/3] overflow-hidden rounded-2xl mb-4 relative">
                    <img
                      src={zone.img}
                      alt={zone.title}
                      className={`transition-transform duration-500 ${
                        zone.title === "Cosplay Championship & K-pop Dance Battle"
                          ? "absolute inset-0 w-full h-full object-cover object-center scale-[2] group-hover:scale-[2.05]"
                          : zone.title === "Live Experience"
                          ? "absolute inset-0 w-full h-full object-cover object-center translate-y-8 scale-[2.1] group-hover:scale-[2.15]"
                          : zone.title === "Live Bar"
                          ? "absolute inset-0 w-full h-full object-cover object-center scale-[1.7] group-hover:scale-[1.75]"
                          : zone.title === "Fan Meetup"
                          ? "absolute inset-0 w-full h-full object-cover object-center scale-[2] group-hover:scale-[2.05]"
                          : zone.title === "Food Court"
                          ? "absolute inset-0 w-full h-full object-cover object-center scale-[1.9] group-hover:scale-[1.95]"
                          : typeof zone.img !== "string"
                          ? "absolute inset-0 w-full h-full object-cover object-center scale-150 group-hover:scale-[1.55]"
                          : "w-full h-full object-cover group-hover:scale-105"
                      }`}
                      loading="lazy"
                    />
                  </div>
                  <span className="section-label">Zone {i + 1} — {zone.title}</span>
                  <p className="text-base text-muted-foreground leading-relaxed mb-2">{zone.desc}</p>
                  <p className="text-foreground font-display font-bold text-sm leading-relaxed">{zone.details}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-6 md:py-8">
        <div className="section-container text-center">
          <div className="card-warm">
            <h2 className="section-title">Ready to <span className="text-secondary glow-text-purple">Experience</span> It?</h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Date & venue coming soon. Be there.
            </p>
          </div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
};

export default Experience;


