import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";

import postersImg from "@/assets/Merch Marketplace/POSTERS & PLUSHIES.jpg.jpeg";
import jewelleryImg from "@/assets/Merch Marketplace/JEWELLRY.jpg.jpeg";
import albumsImg from "@/assets/Merch Marketplace/ALBUMS.jpg.jpeg";
import handmadeImg from "@/assets/Merch Marketplace/HANDMADE ITEMS.jpg.jpeg";
import collectiblesImg from "@/assets/Merch Marketplace/COLLECTIBLES.jpg.jpeg";
import crystalsImg from "@/assets/Merch Marketplace/CRYSTALS AND CANDLES.jpg.jpeg";
import thriftImg from "@/assets/Merch Marketplace/THIFT STALLS.jpg.jpeg";
import moreMerchImg from "@/assets/Merch Marketplace/AND MORE STALLS.jpg.jpeg";

const makeRow = (items: string[]) => items.map(title => ({ title, desc: "", img: "" }));

const row1 = [
  { title: "Posters, Plushies & Figurines", desc: "", img: postersImg },
  { title: "Jewellery", desc: "", img: jewelleryImg },
  { title: "Albums", desc: "", img: albumsImg },
  { title: "Handmade Items", desc: "", img: handmadeImg },
];
const row2 = [
  { title: "Collectibles", desc: "", img: collectiblesImg },
  { title: "Crystals & Scented Candles", desc: "", img: crystalsImg },
  { title: "Thrift Shops", desc: "", img: thriftImg },
  { title: "& More", desc: "", img: moreMerchImg },
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

const ExpPage7 = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <PageHero title="Merch" highlight="Marketplace" subtitle="40+ vendors with exclusive anime and K-pop merchandise, collectibles and more." centered />

      <section className="py-10 md:py-14" ref={ref}>
        <div className="section-container">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} className="card-warm">
            <p className="text-xs italic text-muted-foreground text-center mb-6">Note: All images used are for representation purposes only.</p>
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              {row1.map((item, i) => <Card key={item.title} item={item} i={i} isInView={isInView} />)}
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {row2.map((item, i) => <Card key={item.title} item={item} i={i + 4} isInView={isInView} />)}
            </div>
          </motion.div>
        </div>
      </section>

      <ContactCTA />
      <Footer />
    </div>
  );
};

export default ExpPage7;
