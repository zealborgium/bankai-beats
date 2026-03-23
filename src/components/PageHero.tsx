import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

interface PageHeroProps {
  title: string;
  highlight: string;
  subtitle: string;
}

const PageHero = ({ title, highlight, subtitle }: PageHeroProps) => (
  <section className="relative min-h-[30vh] flex items-end overflow-hidden">
    <div className="section-container relative z-10 pb-10 pt-24 w-full">
      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
        <Link to="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-8 font-mono uppercase tracking-wider">
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </motion.div>
      <div className="card-warm">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="section-title !text-4xl md:!text-5xl lg:!text-6xl"
        >
          {title} <span className="text-primary glow-text-red">{highlight}</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base text-muted-foreground"
        >
          {subtitle}
        </motion.p>
      </div>
    </div>
  </section>
);

export default PageHero;
