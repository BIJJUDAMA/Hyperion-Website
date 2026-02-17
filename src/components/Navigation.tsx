import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import ThemeToggle from './ThemeToggle';
import { contactData } from '../data/contact';
import { Linkedin, Instagram, Globe, Mail, Code } from 'lucide-react';

const navItems = [
  { label: 'About', target: 'about' },
  { label: 'Team', target: 'team' },
  { label: 'Subsystems', target: 'subsystems' },
  { label: 'Events', target: 'events' },
  { label: 'Achievements', target: 'achievements' },
  { label: 'Contact', target: 'contact' },
];

export default function Navigation() {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileOpen(false);
  };



  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-200
          ${scrolled || isMobileOpen
            ? 'bg-brutal-bg border-b-[3px] border-brutal-border'
            : 'bg-transparent'
          }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <div className="max-w-[1400px] mx-auto px-6 h-32 flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center gap-4 cursor-pointer group relative h-10 w-32"
            onClick={() => scrollToSection('hero')}
          >
            <img
              src="/images/hyperion_dark.png"
              alt="Hyperion"
              width="128"
              height="40"
              loading="eager"
              decoding="async"
              className={`absolute top-0 left-0 h-10 w-auto object-contain transition-opacity duration-300 ${isDark ? 'opacity-0' : 'opacity-100'}`}
            />
            <img
              src="/images/hyperion_light.png"
              alt="Hyperion"
              width="128"
              height="40"
              loading="eager"
              decoding="async"
              className={`absolute top-0 left-0 h-10 w-auto object-contain transition-opacity duration-300 ${isDark ? 'opacity-100' : 'opacity-0'}`}
            />
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.target)}
                className="font-mono text-sm uppercase tracking-[0.15em] text-brutal-fg
                           hover:text-brutal-accent transition-all duration-200 relative group"
              >
                {item.label}
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[2px]
                             transition-all duration-300 ease-out group-hover:w-full"
                  style={{ background: 'linear-gradient(90deg, var(--gradient-warm), var(--gradient-gold))' }}
                />
                <span
                  className="absolute -bottom-1 left-0 w-0 h-[2px] blur-[3px]
                             transition-all duration-300 ease-out group-hover:w-full opacity-60"
                  style={{ background: 'linear-gradient(90deg, var(--gradient-warm), var(--gradient-gold))' }}
                />
              </button>
            ))}

            {/* Socials & Dev */}
            <div className="h-8 w-[1px] bg-brutal-border/30 mx-2" />

            <div className="flex items-center gap-4">
              <a href={contactData.socials[0].url} target="_blank" rel="noopener noreferrer" className="text-brutal-muted hover:text-brutal-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href={contactData.socials[1].url} target="_blank" rel="noopener noreferrer" className="text-brutal-muted hover:text-brutal-accent transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>

            {/* Developer Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 font-mono text-[10px] tracking-[0.1em] text-brutal-muted group-hover:text-brutal-accent transition-colors uppercase border border-brutal-border/50 px-3 py-1.5 hover:border-brutal-accent">
                <Code className="w-3 h-3" />
                <span>DEV</span>
              </button>

              <div className="absolute top-full right-0 mt-2 w-72 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                <div className="bg-brutal-bg border border-brutal-accent shadow-[4px_4px_0px_var(--brutal-accent)] p-5 flex flex-col gap-4">
                  <div className="text-[10px] font-mono text-brutal-muted uppercase tracking-widest border-b border-brutal-border/20 pb-3 leading-relaxed">
                    Designed & Developed by<br />
                    <span className="text-brutal-fg font-bold text-xs mt-1 block">Nitansh Shankar</span>
                  </div>

                  <div className="flex flex-col gap-3">
                    <a
                      href="https://nitansh.netlify.app/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-brutal-fg hover:text-brutal-accent transition-colors group/link"
                    >
                      <Globe className="w-4 h-4 text-brutal-muted group-hover/link:text-brutal-accent" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-brutal-muted uppercase">My Personal Site</span>
                        <span className="font-mono text-xs">nitansh.netlify.app</span>
                      </div>
                    </a>

                    <a
                      href="mailto:shankarnitansh@gmail.com"
                      className="flex items-center gap-3 text-brutal-fg hover:text-brutal-accent transition-colors group/link"
                    >
                      <Mail className="w-4 h-4 text-brutal-muted group-hover/link:text-brutal-accent" />
                      <div className="flex flex-col">
                        <span className="font-mono text-[10px] text-brutal-muted uppercase">My Email</span>
                        <span className="font-mono text-xs">shankarnitansh@gmail.com</span>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <ThemeToggle />

            <button
              onClick={() => scrollToSection('contact')}
              className="brutal-btn text-[10px] py-2 px-4"
            >
              Join Us
            </button>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="w-10 h-10 flex items-center justify-center text-brutal-fg
                         hover:text-brutal-accent transition-colors"
              style={{ border: '3px solid var(--brutal-border)' }}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                {isMobileOpen ? (
                  <path strokeLinecap="square" d="M6 6l12 12M6 18L18 6" />
                ) : (
                  <path strokeLinecap="square" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-[49] bg-brutal-bg flex flex-col items-center justify-center gap-8"
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.label}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 30 }}
                transition={{ delay: i * 0.04, duration: 0.2 }}
                onClick={() => scrollToSection(item.target)}
                className="font-display text-4xl font-bold uppercase tracking-[-0.03em] text-brutal-fg
                           hover:text-brutal-accent transition-colors"
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
