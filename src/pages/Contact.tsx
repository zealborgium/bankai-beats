import { motion } from "framer-motion";
import { Instagram, Mail } from "lucide-react";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageHero from "@/components/PageHero";
import ContactForm from "@/components/ContactForm";

const Contact = () => {
  const copyEmail = () => {
    navigator.clipboard.writeText("contact@dellusion.in");
    toast.success("Email copied to clipboard!");
  };

  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Navbar />
      <PageHero
        title="Contact"
        highlight="Us"
        subtitle="Have a question, a partnership idea, or just want to say hi? We'd love to hear from you."
      />
      <ContactForm page="Contact" />

      {/* Direct connect section */}
      <section className="py-6 md:py-8">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="card-warm text-center flex flex-col items-center"
          >
            <h2 className="section-title mb-14">
              Or <span className="text-primary glow-text-red">Connect</span> With Us{" "}
              <span className="text-neon-purple glow-text-purple">Directly</span>
            </h2>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <a
                href="https://www.instagram.com/bankaibeatsfest/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 font-bold text-sm tracking-wide uppercase rounded-full text-white transition-all duration-300"
                style={{ background: 'hsl(var(--primary))', boxShadow: '0 4px 16px hsl(var(--neon-red) / 0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 24px hsl(var(--neon-red) / 0.5)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px hsl(var(--neon-red) / 0.3)'; (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)'; }}
              >
                <Instagram size={18} />
                @bankaibeatsfest
              </a>
              <button
                onClick={copyEmail}
                className="inline-flex items-center gap-3 px-8 py-4 font-bold text-sm tracking-wide uppercase rounded-full text-white transition-all duration-300"
                style={{ background: 'hsl(var(--secondary))', boxShadow: '0 4px 16px hsl(var(--neon-purple) / 0.3)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 6px 24px hsl(var(--neon-purple) / 0.5)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.boxShadow = '0 4px 16px hsl(var(--neon-purple) / 0.3)'; (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)'; }}
              >
                <Mail size={18} />
                contact@dellusion.in
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;



