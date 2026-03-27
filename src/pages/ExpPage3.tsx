import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

import photoboothImg from "@/assets/Entertainment Area/PHOTOBOOTH.jpg.jpeg";
import bouncyImg from "@/assets/Entertainment Area/BOUNCY CASTLE.jpg.jpeg";
import bullImg from "@/assets/Entertainment Area/MECHANICAL BULL.jpg.jpeg";
import gatchaImg from "@/assets/Entertainment Area/GATCHA MACHINE.jpg.jpeg";
import beybladeImg from "@/assets/Entertainment Area/BEYBLADE BATTLE.jpg.jpeg";
import ddakjiImg from "@/assets/Entertainment Area/DDAKJI BATTLE.jpg.jpeg";
import flowImg from "@/assets/Entertainment Area/FLOW ARTIST.jpg.jpeg";
import animeQuizImg from "@/assets/Entertainment Area/ANIME QUIZ.jpg.jpeg";
import kpopQuizImg from "@/assets/Entertainment Area/KPOP QUIZ.jpg.jpeg";
import rpdImg from "@/assets/Entertainment Area/RANDOM PLAY DANCE.jpg.jpeg";
import moreImg from "@/assets/Entertainment Area/& MORE ENTERTAINMENT.jpg.jpeg";

const row1 = [
  { title: "Photobooth", desc: "", img: photoboothImg },
  { title: "Bouncy Castle", desc: "", img: bouncyImg },
  { title: "Mechanical Bull", desc: "", img: bullImg },
  { title: "Gatcha Machines", desc: "", img: gatchaImg },
];

const row2 = [
  { title: "Beyblade Battles", desc: "", img: beybladeImg },
  { title: "Ddakji Battles", desc: "", img: ddakjiImg },
  { title: "Flow Artists", desc: "", img: flowImg },
];

const row3 = [
  { title: "Anime Quiz", desc: "", img: animeQuizImg },
  { title: "K-Pop Quiz", desc: "", img: kpopQuizImg },
  { title: "Random Play Dance", desc: "", img: rpdImg },
  { title: "& More", desc: "", img: moreImg },
];

const Card = ({ item, i, isInView }: { item: { title: string; desc: string; img: string }; i: number; isInView: boolean }) => (
  <motion.div
    key={item.title}
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.1 + i * 0.06 }}
    className="card-inner overflow-hidden group text-center w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
  >
    <div className="w-full h-36 overflow-hidden mb-4 -mt-1 rounded-xl">
      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
    </div>
    <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
  </motion.div>
);

const ExpPage3 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <PageHero title="Entertainment" highlight="Arena" subtitle="Gaming, karaoke, mechanical bull, bouncy castle and more — fun in every corner." centered />

      <section className="py-10 md:py-14" ref={ref}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="card-warm"
          >
            <p className="text-xs italic text-muted-foreground text-center mb-6">Note: All images used are for representation purposes only.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {row1.map((item, i) => <Card key={item.title} item={item} i={i} isInView={isInView} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {row2.map((item, i) => <Card key={item.title} item={item} i={i + 4} isInView={isInView} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {row3.map((item, i) => <Card key={item.title} item={item} i={i + 7} isInView={isInView} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
};

export default ExpPage3;
