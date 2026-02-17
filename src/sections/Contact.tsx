import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Linkedin, Instagram } from 'lucide-react';
import { contactData } from '../data/contact';
import { useTheme } from '../components/ThemeProvider';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { title, description, email, socials } = contactData;
  const { isDark } = useTheme();
  const hyperionLogo = isDark ? '/images/hyperion_light.png' : '/images/hyperion_dark.png';
  const sectionRef = useRef<HTMLDivElement>(null);
  const brandingRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const socialsRef = useRef<HTMLDivElement>(null);

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  const iconMap = {
    linkedin: Linkedin,
    instagram: Instagram,
  };

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Branding block
      gsap.fromTo(brandingRef.current,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 1.2, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      // Title
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 60, clipPath: 'inset(100% 0% 0% 0%)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );

      // Description
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, delay: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 65%' },
        }
      );

      // CTA button
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
        }
      );

      // Social links stagger
      if (socialsRef.current) {
        const links = socialsRef.current.querySelectorAll('[data-social]');
        gsap.fromTo(links,
          { opacity: 0, y: 20, scale: 0.9 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.1, ease: 'back.out(1.7)',
            scrollTrigger: { trigger: socialsRef.current, start: 'top 90%' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen flex items-center justify-center py-32">
      <div className="absolute inset-0 bg-grid-pattern" />

      {/* Top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[4px] bg-brutal-accent" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-8 text-center">
        {/* Branding: Hyperion Club of Amrita */}
        <div ref={brandingRef} className="flex flex-col items-center gap-6 mb-16" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 md:gap-6 justify-center flex-nowrap">
            <img
              src={hyperionLogo}
              alt="Hyperion"
              loading="lazy"
              decoding="async"
              className="w-[clamp(120px,22vw,260px)] h-auto object-contain shrink-0"
            />
            <span
              className="font-display text-[clamp(18px,3vw,36px)] tracking-tight shrink-0"
              style={{ color: 'var(--brutal-muted)' }}
            >
              club of
            </span>
            <img
              src="/images/AmritaLogo.png"
              alt="Amrita Vishwa Vidyapeetham"
              loading="lazy"
              decoding="async"
              className="w-[clamp(140px,28vw,320px)] h-auto object-contain shrink-0"
            />
          </div>

        </div>

        <h2
          ref={titleRef}
          className="text-[clamp(40px,6vw,72px)] text-brutal-fg mb-6 leading-[0.95] font-display"
          style={{ opacity: 0 }}
        >
          {title}
        </h2>

        <p
          ref={descRef}
          className="text-brutal-muted text-[clamp(14px,1.2vw,18px)] leading-[1.8] mb-10 max-w-lg mx-auto"
          style={{ opacity: 0 }}
        >
          {description}
        </p>

        <div ref={ctaRef} style={{ opacity: 0 }}>
          <button
            onClick={handleEmailClick}
            className="brutal-btn mb-8 relative transition-all duration-300 hover:shadow-[0_0_20px_rgba(245,147,14,0.5),0_0_40px_rgba(245,147,14,0.25)]"
            style={{ animation: 'glowPulse 2.5s ease-in-out infinite' }}
          >
            <Mail className="w-4 h-4" />
            Email Us
          </button>
          <p className="font-mono text-sm text-brutal-muted mb-10">
            {email}
          </p>
        </div>

        <div ref={socialsRef} className="flex items-center justify-center gap-6">
          {socials.map((social, i) => {
            const Icon = iconMap[social.platform];
            return (
              <a
                key={i}
                data-social
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-3 text-brutal-muted hover:text-brutal-accent transition-colors"
                style={{ opacity: 0 }}
              >
                <div className="w-14 h-14 flex items-center justify-center bg-brutal-bg
                                group-hover:bg-brutal-accent group-hover:text-white transition-all duration-100"
                  style={{
                    border: '3px solid var(--brutal-border)',
                    boxShadow: '3px 3px 0px var(--brutal-fg)',
                  }}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-mono text-[10px] tracking-[0.15em] uppercase">
                  {social.label}
                </span>
              </a>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0">
        <div
          className="h-[2px]"
          style={{ background: 'linear-gradient(90deg, var(--gradient-sky), var(--gradient-warm), var(--gradient-gold))' }}
        />
        <div className="py-6 px-6 flex items-center justify-center">
          <p className="font-display text-[clamp(14px,1.5vw,18px)] tracking-[0.1em] uppercase text-center" style={{ color: 'var(--brutal-muted)' }}>
            Team Hyperion · Defying Gravity · Redefining Velocity
          </p>
        </div>
      </div>

      {/* Glow pulse keyframes */}
      <style>{`
        @keyframes glowPulse {
          0%, 100% { box-shadow: 3px 3px 0px var(--brutal-accent), 0 0 8px rgba(245,147,14,0.15); }
          50% { box-shadow: 3px 3px 0px var(--brutal-accent), 0 0 24px rgba(245,147,14,0.4), 0 0 48px rgba(245,147,14,0.15); }
        }
      `}</style>
    </section>
  );
}
