import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { subsystemsData } from '../data/subsystems';
import { LineDraw } from '../components/Motion';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

function TiltCard({ children, className, style, ...props }: React.HTMLAttributes<HTMLDivElement> & { style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 8;
    el.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (el) {
      el.style.transform = 'perspective(600px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    }
    if (props.onMouseLeave) {
      props.onMouseLeave(e);
    }
  };

  return (
    <div ref={ref} className={className} style={{ ...style, transition: 'transform 0.15s ease-out' }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} {...props}>
      {children}
    </div>
  );
}

export default function Subsystems() {
  const { sectionNumber, sectionLabel, title, description, items } = subsystemsData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      // Cards stagger in
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('[data-subsystem-card]');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8">
        {/* Header */}
        <div ref={headerRef} className="mb-16" style={{ opacity: 0 }}>
          <TextScramble
            text={`[${sectionLabel}] / ${sectionNumber}`}
            className="font-mono text-[11px] text-brutal-accent tracking-[0.3em] uppercase block mb-4"
          />
          <h2 className="text-[clamp(40px,6vw,80px)] text-brutal-fg leading-[0.95] font-display">
            {title}
          </h2>
          <LineDraw className="brutal-line w-24 mt-6" delay={0} />
          <p className="text-brutal-muted text-base leading-[1.8] mt-6 max-w-2xl">
            {description}
          </p>
        </div>

        {/* Cards Grid */}
        <div ref={gridRef} className="flex flex-wrap justify-center gap-5">
          {items.map((subsystem) => {
            const Icon = subsystem.icon;
            return (
              <TiltCard
                key={subsystem.id}
                data-subsystem-card
                className="group bg-brutal-bg p-8 flex flex-col
                           w-full sm:w-[calc(50%-10px)] lg:w-[calc(33.333%-14px)]"
                style={{
                  border: '3px solid var(--brutal-border)',
                  boxShadow: '4px 4px 0px var(--brutal-fg)',
                  opacity: 0,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '6px 6px 0px var(--brutal-accent)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.boxShadow = '4px 4px 0px var(--brutal-fg)';
                }}
              >
                {/* Icon */}
                <div
                  className="w-12 h-12 flex items-center justify-center mb-6
                             group-hover:bg-brutal-accent group-hover:text-white transition-colors duration-150"
                  style={{ border: '2px solid var(--brutal-accent)' }}
                >
                  <Icon className="w-6 h-6 text-brutal-accent group-hover:text-white" />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-brutal-fg uppercase mb-3 tracking-[-0.01em] font-display
                               group-hover:text-brutal-accent transition-colors duration-150">
                  {subsystem.title}
                </h3>

                {/* Accent bar */}
                <div className="w-10 h-[3px] bg-brutal-accent mb-4" />

                {/* Description */}
                <p className="text-brutal-muted text-sm leading-[1.7] flex-1">
                  {subsystem.description}
                </p>
              </TiltCard>
            );
          })}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="brutal-line-thin" />
      </div>
    </section>
  );
}
