import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const ContactCTA = () => (
  <section className="relative min-h-[30vh] flex items-end overflow-hidden">
    <div className="section-container relative z-10 pb-10 pt-24 w-full">
      <div className="card-warm">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="section-title !text-4xl md:!text-5xl lg:!text-6xl"
        >
          Contact <span className="text-primary glow-text-red">Us</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-base text-muted-foreground mb-6"
        >
          Have a question, a partnership idea, or just want to say hi? We'd love to hear from you.
        </motion.p>
        <Link to="/contact" className="btn-primary">Contact Us</Link>
      </div>
    </div>
  </section>
);

export default ContactCTA;
