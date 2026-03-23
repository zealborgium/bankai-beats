import { motion } from "framer-motion";
import bankaiLogo from "@/assets/bb-white-text.png";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden scanlines px-4">
      
      {/* Ambient glow */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-neon-red/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-neon-purple/5 blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10 flex flex-col items-center justify-center flex-1 py-20 md:py-0 mt-8 md:mt-16">
        {/* Logo above heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex justify-center mb-4 md:mb-8">
          
          <img src={bankaiLogo} alt="Bankai Beats" className="h-16 sm:h-20 md:h-32 object-contain" />
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
          className="text-center text-xl sm:text-2xl md:text-4xl lg:text-5xl font-display font-bold tracking-tight leading-[1.1] mx-auto">
          <span className="text-foreground">India's First </span>
          <span className="text-neon-red glow-text-red">Anime</span>
          <span className="text-foreground"> & </span>
          <span className="text-neon-purple glow-text-purple">K-Pop</span>
          <br className="hidden md:block" />
          <span className="block md:hidden" />
          <span className="text-foreground"> Music Festival</span>
        </motion.h1>

        {/* Coming Soon Banner */}
        <div className="relative mt-6 md:mt-8">
          {/* White radial glow behind banner */}
          <div className="absolute inset-0 -inset-x-16 -inset-y-10 rounded-full pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, hsla(0, 0%, 100%, 0.25) 0%, hsla(0, 0%, 100%, 0.1) 40%, transparent 70%)' }} />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="relative px-6 h-30 flex items-center justify-center rounded-full backdrop-blur-sm text-black border-solid border-white border-2 bg-primary"
            style={{ boxShadow: '0 0 15px hsla(0, 0%, 100%, 0.5), 0 0 30px hsla(0, 0%, 100%, 0.3), 0 0 60px hsla(0, 0%, 100%, 0.2), 0 0 100px hsla(0, 0%, 100%, 0.1), inset 0 0 20px hsla(0, 0%, 100%, 0.1)', background: 'hsla(0, 0%, 100%, 0.08)' }}>

          <span className="text-sm sm:text-base tracking-widest uppercase font-bold md:text-2xl font-sans text-white"
            style={{ textShadow: 'none' }}>COMING SOON!

          </span>
          </motion.div>
        </div>

      </div>

      {/* Sponsor marquee */}
      <div className="w-full overflow-hidden py-4 mt-auto" style={{ borderTop: '1px solid hsla(0, 0%, 100%, 0.1)', borderBottom: '1px solid hsla(0, 0%, 100%, 0.1)', background: 'hsla(0, 0%, 100%, 0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
        <div className="marquee-track">
          {Array(4).fill("Anime 🎌 K-pop 💜 Live Concert 🎸 Cosplay 🎭 Gaming 🎮 Community 😍 Experiences ✨ Food & Merch Stalls 🍜").map((text, i) =>
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