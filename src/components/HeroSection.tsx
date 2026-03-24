import { motion } from "framer-motion";
import { useState } from "react";
import bankaiLogo from "@/assets/bb-white-text.png";
import PreRegistrationForm from "@/components/PreRegistrationForm";

const HeroSection = () => {
  const [preRegOpen, setPreRegOpen] = useState(false);
  return (
    <section
      id="hero"
      className="relative flex flex-col overflow-hidden scanlines px-4">
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      {/* Main content — exactly one viewport tall */}
      <div className="min-h-[100svh] flex flex-col items-center justify-center">
        <div className="section-container flex flex-col items-center justify-center w-full">
        {/* Logo above heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mb-3 md:mb-5 mt-20 md:mt-28">
          
          <img src={bankaiLogo} alt="Bankai Beats" className="h-24 sm:h-32 md:h-48 object-contain" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight leading-[1.1] mx-auto">
          <span className="text-foreground">India's First </span>
          <span className="text-neon-red glow-text-red">Anime</span>
          <span className="text-foreground"> & </span>
          <span className="text-neon-purple glow-text-purple">K-Pop</span>
          <br className="hidden md:block" />
          <span className="block md:hidden" />
          <span className="text-foreground"> Music Festival</span>
        </motion.h1>

        {/* Coming Soon Banner */}
        <div className="relative mt-4 md:mt-6">
          <div className="absolute inset-0 -inset-x-16 -inset-y-10 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, hsla(0, 0%, 100%, 0.25) 0%, hsla(0, 0%, 100%, 0.1) 40%, transparent 70%)' }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative px-6 py-4 flex items-center justify-center rounded-full backdrop-blur-sm text-black border-solid border-white border-2 bg-primary"
            style={{ boxShadow: '0 0 15px hsla(0, 0%, 100%, 0.5), 0 0 30px hsla(0, 0%, 100%, 0.3), 0 0 60px hsla(0, 0%, 100%, 0.2), 0 0 100px hsla(0, 0%, 100%, 0.1), inset 0 0 20px hsla(0, 0%, 100%, 0.1)', background: 'hsla(0, 0%, 100%, 0.08)' }}>
          <span className="text-3xl sm:text-4xl tracking-widest uppercase font-bold md:text-6xl font-sans text-white"
            style={{ textShadow: 'none' }}>COMING SOON!
          </span>
          </motion.div>
        </div>

        {/* Pre-Registration Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.5 }}
          className="mt-6 md:mt-8 mb-2 md:mb-4">
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); setPreRegOpen(true); }}
            className="inline-flex items-center justify-center px-8 py-4 font-bold transition-all duration-300 text-base sm:text-lg md:text-xl tracking-wide uppercase rounded-full text-white"
            style={{
              background: 'hsl(142 70% 40%)',
              boxShadow: '0 4px 16px hsl(142 70% 40% / 0.4)',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 6px 24px hsl(142 70% 40% / 0.6)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLAnchorElement).style.boxShadow = '0 4px 16px hsl(142 70% 40% / 0.4)';
              (e.currentTarget as HTMLAnchorElement).style.transform = 'translateY(0)';
            }}
          >
            Pre-Registration Open
          </a>
        </motion.div>
        </div>
      </div>

      <PreRegistrationForm open={preRegOpen} onClose={() => setPreRegOpen(false)} />

      {/* Sponsor marquee — below the viewport fold */}
      <div className="w-full overflow-hidden py-4" style={{ borderTop: '1px solid hsla(0, 0%, 100%, 0.1)', borderBottom: '1px solid hsla(0, 0%, 100%, 0.1)', background: 'hsla(0, 0%, 100%, 0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="marquee-track">
          {Array(4).fill("Anime ⚔️ K-pop 💜 Live Concert 🎸 Cosplay 🎭 Dance Battle 💃 Community 😍 Experiences ✨ Food & Merch Stalls 🍜").map((text, i) =>
          <span
            key={i}
            className="text-sm tracking-widest uppercase text-muted-foreground font-mono whitespace-nowrap px-12">
              {text}
            </span>
          )}
        </div>
      </div>
    </section>);

};

export default HeroSection;