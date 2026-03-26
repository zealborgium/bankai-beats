import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const img = "https://images.unsplash.com/photo-1528164344705-47542687000d?w=600&h=450&fit=crop";

const row1 = [
  { title: "Karaoke Rooms", desc: "", img },
  { title: "Kimono & Yukata Trial", desc: "", img },
  { title: "Hanbok Trial", desc: "", img },
];
const row2 = [
  { title: "Sumo Costume Trial", desc: "", img },
  { title: "Face Painting", desc: "", img },
];
const row3 = [
  { title: "Temporary & Permanent Tattoos", desc: "", img },
  { title: "Piercings & Color Dreadlocks", desc: "", img },
  { title: "& More", desc: "", img },
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
