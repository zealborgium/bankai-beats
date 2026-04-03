import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

import ramenImg from "@/assets/Food/RAMEN.jpg.jpeg";
import dumplingsImg from "@/assets/Food/DUMPLINGS.jpg.jpeg";
import tempuraImg from "@/assets/Food/TEMPURA.jpg.jpeg";
import mochiImg from "@/assets/Food/MOCHI.jpg.jpeg";
import pancakesImg from "@/assets/Food/PANCAKES.jpg.jpeg";
import kbbqImg from "@/assets/Food/KOREAN BBQ.jpg.jpeg";
import kfcImg from "@/assets/Food/KOREAN FRIED CHIKEN.jpg.jpeg";
import corndogImg from "@/assets/Food/CORN DOGS.jpg.jpeg";
import bibimbapImg from "@/assets/Food/BIBIMBAP.jpg.jpeg";
import cottonCandyImg from "@/assets/Food/COTTON CANDY.jpg.jpeg";
import burgerImg from "@/assets/Food/PIZZA & BURGER.jpg.jpeg";
import moreFoodImg from "@/assets/Food/& MORE FOOD.jpg.jpeg";

const row1 = [
  { title: "Ramen", desc: "", img: ramenImg },
  { title: "Dumplings", desc: "", img: dumplingsImg },
  { title: "Tempura", desc: "", img: tempuraImg },
  { title: "Mochi", desc: "", img: mochiImg },
];
const row2 = [
  { title: "Pancakes", desc: "", img: pancakesImg },
  { title: "Korean BBQ", desc: "", img: kbbqImg },
  { title: "Korean Fried Chicken", desc: "", img: kfcImg },
  { title: "Corn Dog", desc: "", img: corndogImg },
];
const row3 = [
  { title: "Bibimbap", desc: "", img: bibimbapImg },
  { title: "Cotton Candy & Sweets", desc: "", img: cottonCandyImg },
  { title: "Burgers & Pizza", desc: "", img: burgerImg },
  { title: "& More", desc: "", img: moreFoodImg },
];
const Card = ({ item, i, isInView }: { item: { title: string; desc: string; img: string }; i: number; isInView: boolean }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={isInView ? { opacity: 1, y: 0 } : {}}
    transition={{ delay: 0.1 + i * 0.05 }}
    className="card-inner overflow-hidden group text-center w-full sm:w-[calc(50%-8px)] lg:w-[calc(25%-12px)]"
  >
    <div className="w-full h-36 overflow-hidden mb-4 -mt-1 rounded-xl">
      <img src={item.img} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" />
    </div>
    <h3 className="font-display font-bold text-lg mb-2">{item.title}</h3>
    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
  </motion.div>
);

const ExpPage5 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <PageHero title="Food" highlight="Court" subtitle="25+ curated stalls with authentic Japanese and Korean cuisine." centered />

      <section className="py-6 md:py-8" ref={ref}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="card-warm">
            <p className="text-xs italic text-muted-foreground text-center mb-6">Note: All images used are for representation purposes only.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {row1.map((item, i) => <Card key={item.title} item={item} i={i} isInView={isInView} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {row2.map((item, i) => <Card key={item.title} item={item} i={i + 4} isInView={isInView} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {row3.map((item, i) => <Card key={item.title} item={item} i={i + 8} isInView={isInView} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
};

export default ExpPage5;



