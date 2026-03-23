import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import bankaiLogo from "@/assets/bb-white-text.png";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Partners", href: "/partners" },
  
  { label: "FAQ", href: "/faq" },
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

  const isActive = (href: string) => {
    if (href.startsWith("/#")) return location.pathname === "/";
    return location.pathname === href;
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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

        <div className="hidden md:flex items-center gap-9">
          {navItems.map((item) =>
            item.href.startsWith("/") && !item.href.startsWith("/#") ? (
              <Link
                key={item.label}
                to={item.href}
                className={`text-sm font-mono uppercase tracking-wider transition-all duration-300 px-5 py-2 rounded-full ${
                  isActive(item.href)
                    ? "bg-white/10 text-white border border-white/20 shadow-[0_0_12px_hsla(0,0%,100%,0.15)]"
                    : "text-white/70 hover:text-white hover:[text-shadow:0_0_8px_rgba(255,255,255,0.5),0_0_20px_rgba(255,255,255,0.2)]"
                }`}
              >
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
          <Link to="/#interest-form" className="btn-primary py-2.5 px-6">
            Partner With Us
          </Link>
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
                item.href.startsWith("/") && !item.href.startsWith("/#") ? (
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
              <Link
                to="/#interest-form"
                onClick={() => setIsMobileOpen(false)}
                className="btn-primary py-2.5 px-6 text-center"
              >
                Partner With Us
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
