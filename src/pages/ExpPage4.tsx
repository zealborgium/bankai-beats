import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

import karaokeImg from "@/assets/Experience Arena/KARAOKE ROOM.jpg.jpeg";
import kimonoImg from "@/assets/Experience Arena/kIMONO TRIAL.jpg.jpeg";
import hanbokImg from "@/assets/Experience Arena/HANBOK TRIAL.jpg.jpeg";
import sumoImg from "@/assets/Experience Arena/SUMO COSTUME TRIAL.jpg.jpeg";
import facePaintImg from "@/assets/Experience Arena/FACE PAINTING.jpg.jpeg";
import tattooImg from "@/assets/Experience Arena/PERMANENT TATTOS.webp";
import dreadlocksImg from "@/assets/Experience Arena/COLOURFUL  DREADLOCKS.jpg.jpeg";
import moreExpImg from "@/assets/Experience Arena/AND MORE EXPERIENCES.jpg.jpeg";

const row1 = [
  { title: "Karaoke Rooms", desc: "", img: karaokeImg },
  { title: "Kimono & Yukata Trial", desc: "", img: kimonoImg },
  { title: "Hanbok Trial", desc: "", img: hanbokImg },
];
const row2 = [
  { title: "Sumo Costume Trial", desc: "", img: sumoImg },
  { title: "Face Painting", desc: "", img: facePaintImg },
];
const row3 = [
  { title: "Temporary & Permanent Tattoos", desc: "", img: tattooImg },
  { title: "Piercings & Color Dreadlocks", desc: "", img: dreadlocksImg },
  { title: "& More", desc: "", img: moreExpImg },
];

const Card = ({ item, i, isInView }: { item: { title: string; desc: string; img: string }; i: number; isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.1 + i * 0.06 }}
    className="card-inner overflow-hidden group text-center w-full sm:w-[calc(50%-8px)] lg:w-[calc(33.333%-11px)]"
  >
    <div className="w-full h-36 overflow-hidden mb-4 -mt-1 rounded-xl">
      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
    </div>
    <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
  </motion.div>
);

const ExpPage4 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <PageHero title="Live" highlight="Experience" subtitle="Kimono, yukata, hanbok trials, face painting, tattoos and flow artists." centered />

      <section className="py-10 md:py-14" ref={ref}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="card-warm">
            <p className="text-xs italic text-muted-foreground text-center mb-6">Note: All images used are for representation purposes only.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {row1.map((item, i) => <Card key={item.title} item={item} i={i} isInView={isInView} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {row2.map((item, i) => <Card key={item.title} item={item} i={i + 3} isInView={isInView} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {row3.map((item, i) => <Card key={item.title} item={item} i={i + 5} isInView={isInView} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
};

export default ExpPage4;
