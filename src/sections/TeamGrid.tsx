import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { teamData } from '../data/team';
import { LineDraw } from '../components/Motion';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export default function TeamGrid() {
  const { sectionNumber, sectionLabel, title, members, facultyCoordinators } = teamData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const facultyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      // Grid cards stagger
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('[data-team-card]');
        gsap.fromTo(cards,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.5, stagger: 0.06, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        );
      }

      // Faculty section
      if (facultyRef.current) {
        gsap.fromTo(facultyRef.current,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: facultyRef.current, start: 'top 85%' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern" />

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
        </div>

        {/* Grid */}
        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {members.map((member, i) => (
            <div
              key={i}
              data-team-card
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
              style={{
                border: '2px solid var(--brutal-border)',
                background: 'var(--brutal-surface)',
                opacity: 0,
              }}
            >
              {/* Default state */}
              <div className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 group-hover:opacity-0">
                {/* Large initial */}
                <div className="absolute top-4 right-4 text-[80px] font-bold leading-none text-brutal-fg opacity-[0.06] select-none pointer-events-none font-display">
                  {member.name.charAt(0)}
                </div>

                <div className="relative z-10">
                  <div className="w-8 h-[3px] bg-brutal-accent mb-3" />
                  <h3 className="text-base font-bold text-brutal-fg mb-1 font-display uppercase">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[10px] text-brutal-muted tracking-[0.2em] uppercase">
                    {member.role}
                  </p>
                </div>
              </div>

              {/* Hover overlay — expanded card */}
              <div
                className="absolute inset-0 flex flex-col items-center justify-center text-center p-5
                           opacity-0 group-hover:opacity-100 transition-all duration-300
                           scale-95 group-hover:scale-100"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-sky), var(--gradient-mid))',
                }}
              >
                {/* Avatar circle */}
                <div
                  className="w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold font-display"
                  style={{
                    border: '2px solid var(--gradient-gold)',
                    color: 'var(--gradient-gold)',
                  }}
                >
                  {member.name.charAt(0)}
                </div>

                <h3 className="text-sm font-bold text-white mb-1 font-display uppercase">
                  {member.name}
                </h3>
                <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-3"
                  style={{ color: 'var(--gradient-gold)' }}>
                  {member.role}
                </p>

                <div className="w-10 h-[2px] mb-3"
                  style={{ background: 'linear-gradient(90deg, var(--gradient-warm), var(--gradient-gold))' }} />

                <p className="text-[11px] leading-[1.6] text-white/75 font-mono">
                  Team Hyperion
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Faculty */}
        <div ref={facultyRef} className="mt-16 pt-8" style={{ borderTop: '3px solid var(--brutal-border)', opacity: 0 }}>
          <h3 className="text-2xl font-bold text-brutal-fg uppercase mb-8 text-center font-display">
            Faculty Coordinators
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
            {facultyCoordinators.map((member, i) => (
              <div
                key={i}
                className="group relative aspect-[3/4] overflow-hidden cursor-pointer"
                style={{
                  border: '2px solid var(--brutal-border)',
                  background: 'var(--brutal-surface)',
                }}
              >
                {/* Default */}
                <div className="absolute inset-0 flex flex-col justify-end p-5 transition-opacity duration-300 group-hover:opacity-0">
                  <div className="absolute top-4 right-4 text-[80px] font-bold leading-none text-brutal-accent opacity-[0.08] select-none pointer-events-none font-display">
                    {member.name.charAt(0)}
                  </div>
                  <div className="relative z-10">
                    <div className="w-8 h-[3px] bg-brutal-accent mb-3" />
                    <h3 className="text-base font-bold text-brutal-fg mb-1 font-display uppercase">
                      {member.name}
                    </h3>
                    <p className="font-mono text-[10px] text-brutal-muted tracking-[0.2em] uppercase">
                      {member.role}
                    </p>
                  </div>
                </div>

                {/* Hover */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center text-center p-5
                             opacity-0 group-hover:opacity-100 transition-all duration-300
                             scale-95 group-hover:scale-100"
                  style={{
                    background: 'linear-gradient(135deg, var(--gradient-sky), var(--gradient-mid))',
                  }}
                >
                  <div
                    className="w-16 h-16 flex items-center justify-center mb-4 text-2xl font-bold font-display"
                    style={{
                      border: '2px solid var(--gradient-gold)',
                      color: 'var(--gradient-gold)',
                    }}
                  >
                    {member.name.charAt(0)}
                  </div>
                  <h3 className="text-sm font-bold text-white mb-1 font-display uppercase">
                    {member.name}
                  </h3>
                  <p className="font-mono text-[9px] tracking-[0.2em] uppercase mb-3"
                    style={{ color: 'var(--gradient-gold)' }}>
                    {member.role}
                  </p>
                  <div className="w-10 h-[2px] mb-3"
                    style={{ background: 'linear-gradient(90deg, var(--gradient-warm), var(--gradient-gold))' }} />
                  <p className="text-[11px] leading-[1.6] text-white/75 font-mono">
                    Faculty Advisor
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="brutal-line-thin" />
      </div>
    </section>
  );
}
