import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Mail } from "lucide-react";
import dellusionLogo from "@/assets/dellusion-full-logo.png";

const navLinks = [
  { label: "About", href: "/about" },
  { label: "Experience", href: "/experience" },
  { label: "Partners", href: "/partners" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

const Footer = () => (
  <footer className="py-10" style={{ borderTop: '1px solid hsla(0, 0%, 100%, 0.1)', background: 'hsla(0, 0%, 100%, 0.04)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}>
    <div className="section-container">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div className="flex flex-col items-center gap-3">
          <p className="text-sm font-mono uppercase tracking-wider text-neon-purple glow-text-purple mb-1">Connect</p>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"><Instagram size={20} /></span>
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"><Facebook size={20} /></span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"><Twitter size={20} /></span>
            <span className="text-muted-foreground hover:text-primary transition-colors cursor-pointer"><Mail size={20} /></span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-base text-muted-foreground font-bold">Curated by</p>
          <img src={dellusionLogo} alt="Dellusion Entertainment" className="h-16 w-auto" />
        </div>
        <div className="flex flex-col items-end gap-2">
          <p className="text-sm font-mono uppercase tracking-wider text-neon-purple glow-text-purple mb-1">Navigation</p>
          {navLinks.map((item) => (
            <Link key={item.label} to={item.href} className="text-sm text-muted-foreground hover:text-primary transition-colors font-mono uppercase tracking-wider">
              {item.label}
            </Link>
          ))}
        </div>
      </div>

      <p className="text-center text-xs text-muted-foreground mt-8 font-mono">
        ©2026 Dellusion Entertainment. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
