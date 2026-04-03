import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bankaiLogo from "@/assets/HORIZONTAL_White_Red Eyes.png";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Partners", href: "/partners" },
  
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
  { label: "Join The Team", href: "/join-the-team" },
];

const expDropdown = [
  { label: "Live Stage", href: "/experience/live-music" },
  { label: "Competitions", href: "/experience/cosplay-kpop-battle" },
  { label: "Entertainment Arena", href: "/experience/entertainment-arena" },
  { label: "Live Experience", href: "/experience/live-experience" },
  { label: "Food Court", href: "/experience/food-court" },
  { label: "Fan Meetup", href: "/experience/fan-meetup" },
  { label: "Merch Marketplace", href: "/experience/merch-marketplace" },
  { label: "Live Bar", href: "/experience/live-bar" },
];

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogoClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      navigate("/");
      setTimeout(() => window.scrollTo({ top: 0, behavior: "smooth" }), 50);
    }
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [expOpen, setExpOpen] = useState(false);
  const [mobileExpOpen, setMobileExpOpen] = useState(false);
  const expRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (expRef.current && !expRef.current.contains(e.target as Node)) setExpOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePartnerWithUs = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname === "/partners") {
      // Already on partners — force hash update to trigger useEffect
      window.history.replaceState(null, "", "/partners");
      setTimeout(() => navigate("/partners#contact-form"), 10);
    } else {
      navigate("/partners#contact-form");
    }
    setIsMobileOpen(false);
  };

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/";
    return location.pathname === href;
  };

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-3`}
      style={{ 
        background: isScrolled ? 'hsla(0, 0%, 100%, 0.08)' : 'hsla(0, 0%, 100%, 0.04)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: isScrolled ? '1px solid hsla(0, 0%, 100%, 0.12)' : '1px solid hsla(0, 0%, 100%, 0.06)',
      }}
    >
      <div className="section-container flex items-center justify-between">
        <a href="/" onClick={handleLogoClick} className="flex items-center gap-2 cursor-pointer">
          <img src={bankaiLogo} alt="Bankai Beats" className="h-10 w-auto" />
        </a>

        <div className="hidden md:flex items-center gap-4">
          {navItems.map((item) =>
            item.label === "Experience" ? (
              <div key="experience" className="relative" ref={expRef}>
                <button
                  onClick={() => setExpOpen(v => !v)}
                  className={`relative text-sm font-mono uppercase tracking-wider transition-colors duration-300 px-3 py-2 rounded-full flex items-center gap-1 ${
                    location.pathname.startsWith("/experience") || expOpen
                      ? "text-white"
                      : "text-white/70 hover:text-white hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.2)]"
                  }`}
                >
                  {(location.pathname.startsWith("/experience") || expOpen) && (
                    <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-[0_0_12px_hsla(0,0%,100%,0.15)]" style={{ zIndex: -1 }} />
                  )}
                  Experience
                  <svg className={`w-3 h-3 transition-transform ${expOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                <AnimatePresence>
                  {expOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-2 w-max rounded-2xl overflow-hidden z-50"
                      style={{ background: 'hsla(0,0%,10%,0.95)', backdropFilter: 'blur(16px)', border: '1px solid hsla(0,0%,100%,0.12)' }}
                    >
                      {expDropdown.map((d) => (
                        <Link
                          key={d.label}
                          to={d.href}
                          onClick={() => setExpOpen(false)}
                          className="block px-4 py-3 text-sm font-mono uppercase tracking-wider text-white/70 hover:text-primary hover:bg-white/10 transition-all whitespace-nowrap hover:[text-shadow:0_0_8px_hsl(var(--neon-red)),0_0_20px_hsl(var(--neon-red)/0.5)]"
                        >
                          {d.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link
                key={item.label}
                to={item.href}
                className={`relative text-sm font-mono uppercase tracking-wider transition-colors duration-300 px-3 py-2 rounded-full ${
                  isActive(item.href) ? "text-white" : "text-white/70 hover:text-white hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.2)]"
                }`}
              >
                {isActive(item.href) && (
                  <motion.span layoutId="nav-pill" className="absolute inset-0 rounded-full bg-white/10 border border-white/20 shadow-[0_0_12px_hsla(0,0%,100%,0.15)]" style={{ zIndex: -1 }} />
                )}
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-sm text-white/70 hover:text-white hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 font-mono uppercase tracking-wider"
              >
                {item.label}
              </a>
            )
          )}
          <a onClick={handlePartnerWithUs} className="btn-primary py-2.5 px-6 cursor-pointer">
            Partner With Us
          </a>
        </div>

        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-foreground"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden overflow-hidden"
            style={{ 
              background: 'hsla(0, 0%, 100%, 0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              borderBottom: '1px solid hsla(0, 0%, 100%, 0.1)',
            }}
          >
            <div className="flex flex-col p-6 gap-4">
              {navItems.map((item) =>
                item.label === "Experience" ? (
                  <div key="experience">
                    <button
                      onClick={() => setMobileExpOpen(v => !v)}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider flex items-center gap-1 w-full"
                    >
                      Experience
                      <svg className={`w-3 h-3 transition-transform ${mobileExpOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                    </button>
                    {mobileExpOpen && (
                      <div className="mt-2 pl-3 flex flex-col gap-1">
                        {expDropdown.map((d) => (
                          <Link
                            key={d.label}
                            to={d.href}
                            onClick={() => setIsMobileOpen(false)}
                            className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono uppercase tracking-wider py-1"
                          >
                            {d.label}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : item.href.startsWith("/") && !item.href.startsWith("/#") ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setIsMobileOpen(false)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors font-mono uppercase tracking-wider"
                  >
                    {item.label}
                  </a>
                )
              )}
              <a
                onClick={handlePartnerWithUs}
                className="btn-primary py-2.5 px-6 text-center cursor-pointer"
              >
                Partner With Us
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;



