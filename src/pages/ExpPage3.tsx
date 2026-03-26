import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

const row1 = [
  { title: "Activity 1", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Activity 2", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Activity 3", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Activity 4", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
];

const row2 = [
  { title: "Activity 5", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Activity 6", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Activity 7", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
];

const row3 = [
  { title: "Activity 8", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Activity 9", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Activity 10", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
  { title: "Activity 11", desc: "Coming soon.", img: "https://images.unsplash.com/photo-1511882150382-421056c89033?w=600&h=450&fit=crop" },
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
      <PageHero title="Entertainment" highlight="Arena" subtitle="Gaming, karaoke, mechanical bull, bouncy castle and more — fun in every corner." />

      <section className="py-10 md:py-14" ref={ref}>
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="card-warm"
          >
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
