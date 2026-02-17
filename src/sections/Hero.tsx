import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { heroData } from '../data/hero';
import { useTheme } from '../components/ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  startAnimation?: boolean;
}

export default function Hero({ startAnimation = false }: HeroProps) {
  const { isDark } = useTheme();
  const logoSrc = isDark ? '/images/hyperion_light.png' : '/images/hyperion_dark.png';
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const taglineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || !startAnimation) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Start content animations immediately
      tl
        // Then start content animations
        .fromTo(logoRef.current, { opacity: 0, y: 60, scale: 0.9 }, { opacity: 1, y: 0, scale: 1, duration: 1 })
        .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 0.6 }, '-=0.4')
        .fromTo(subtitleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo(ctaRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, '-=0.1');

      // Start CSS breathing after entrance completes
      tl.call(() => {
        logoRef.current?.classList.add('logo-breathing');
      });
    }, section);

    return () => ctx.revert();
  }, [startAnimation]);

  return (
    <section ref={sectionRef} className="relative w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background Container - Initially Visible */}
      <div ref={bgRef} className="absolute inset-0">
        {/* Sunset gradient background */}
        <div className="absolute inset-0 bg-sunset-hero opacity-100" />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />

        {/* Bottom sunset glow */}
        <div className="absolute bottom-0 left-0 right-0 h-[200px]"
          style={{ background: 'linear-gradient(to top, rgba(255, 179, 71, 0.2), transparent)' }} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center px-6 max-w-[1000px]">
        {/* Logo */}
        <div ref={logoRef} className="relative mb-10 opacity-0" style={{ willChange: 'transform' }}>
          <img
            src={logoSrc}
            alt="Hyperion"
            width="750"
            height="234"
            loading="eager"
            decoding="async"
            fetchPriority="high"
            className="w-[clamp(300px,55vw,750px)] h-auto object-contain relative z-10 drop-shadow-lg"
          />
        </div>

        {/* Gradient divider */}
        <div
          ref={lineRef}
          className="w-[200px] h-[3px] mb-8"
          style={{
            transformOrigin: 'center',
            transform: 'scaleX(0)',
            background: 'linear-gradient(90deg, var(--gradient-warm), var(--gradient-gold))',
          }}
        />

        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="font-mono text-[clamp(11px,1.2vw,14px)] tracking-[0.4em] uppercase text-center mb-4 opacity-0 text-brutal-fg/90"
        >
          {heroData.subtitle}
        </p>

        {/* Tagline */}
        <p
          ref={taglineRef}
          className="font-display text-[clamp(14px,1.2vw,18px)] text-center max-w-xl tracking-wide opacity-0 text-brutal-fg/70"
        >
          {heroData.tagline}
        </p>

        {/* CTA */}
        <div
          ref={ctaRef}
          className="mt-16 flex flex-col items-center gap-3 cursor-pointer group opacity-0"
          onClick={() => {
            const el = document.querySelector('#about');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase group-hover:text-brutal-accent transition-colors text-brutal-fg/60">
            {heroData.cta}
          </span>
          <div className="animate-bounce">
            <ChevronDown className="w-5 h-5" style={{ color: 'var(--gradient-gold)' }} />
          </div>
        </div>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: 'linear-gradient(90deg, var(--gradient-sky), var(--gradient-warm), var(--gradient-gold))' }} />
    </section>
  );
}
