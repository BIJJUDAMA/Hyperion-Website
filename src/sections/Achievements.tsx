import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy } from 'lucide-react';
import { achievementsData } from '../data/achievements';
import { LineDraw } from '../components/Motion';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export default function Achievements() {
  const { sectionNumber, sectionLabel, title, description, stats } = achievementsData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const trophyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Card enters
      gsap.fromTo(cardRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );

      // Trophy bounces in
      gsap.fromTo(trophyRef.current,
        { opacity: 0, scale: 0, rotation: -10 },
        {
          opacity: 1, scale: 1, rotation: 0, duration: 0.7, ease: 'back.out(2)',
          scrollTrigger: { trigger: section, start: 'top 65%' },
        }
      );

      // Title reveals
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 40, clipPath: 'inset(100% 0% 0% 0%)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: titleRef.current, start: 'top 85%' },
        }
      );

      // Description fades in
      gsap.fromTo(descRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: descRef.current, start: 'top 90%' },
        }
      );

      // Animated counters
      if (statsRef.current) {
        const counters = statsRef.current.querySelectorAll('[data-counter]');
        counters.forEach((counter) => {
          const target = parseInt(counter.getAttribute('data-counter') || '0', 10);
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target,
            duration: 1.5,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
            onUpdate: () => {
              counter.textContent = Math.round(obj.val).toString();
            },
          });
        });

        // Stagger stats in
        const items = statsRef.current.querySelectorAll('[data-stat-item]');
        gsap.fromTo(items,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: statsRef.current, start: 'top 85%' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full min-h-screen py-32 lg:py-40 flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-dot-pattern" />

      <div className="relative z-10 max-w-[900px] mx-auto px-6 lg:px-8 w-full">
        <div
          ref={cardRef}
          className="bg-brutal-bg p-8 md:p-14 text-center"
          style={{
            border: '4px solid var(--brutal-accent)',
            boxShadow: '8px 8px 0px var(--brutal-fg)',
            opacity: 0,
          }}
        >
          <TextScramble
            text={`[${sectionLabel}] / ${sectionNumber}`}
            className="font-mono text-[11px] text-brutal-accent tracking-[0.3em] uppercase mb-10 block"
          />

          <div ref={trophyRef} className="inline-flex items-center justify-center w-20 h-20 mb-8"
            style={{ border: '3px solid var(--brutal-accent)', opacity: 0 }}>
            <Trophy className="w-10 h-10 text-brutal-accent" />
          </div>

          <h2
            ref={titleRef}
            className="text-[clamp(32px,5vw,56px)] text-brutal-fg mb-6 leading-[0.95] font-display"
            style={{ opacity: 0 }}
          >
            {title}
          </h2>

          <LineDraw className="brutal-line w-20 mx-auto mb-8" delay={0} />

          <p
            ref={descRef}
            className="text-brutal-muted text-[clamp(14px,1.1vw,17px)] leading-[1.8] max-w-xl mx-auto mb-12"
            style={{ opacity: 0 }}
          >
            {description}
          </p>

          {/* Animated Stats Grid */}
          <div ref={statsRef} className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div
                key={index}
                data-stat-item
                className="p-4"
                style={{
                  borderTop: '3px solid var(--brutal-accent)',
                  opacity: 0,
                }}
              >
                <div className="flex items-baseline justify-center gap-0.5 mb-2">
                  <span
                    data-counter={stat.value}
                    className="text-[clamp(32px,4vw,48px)] font-bold font-display"
                    style={{
                      background: 'linear-gradient(135deg, var(--gradient-warm), var(--gradient-gold))',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    0
                  </span>
                  {stat.suffix && (
                    <span
                      className="text-[clamp(16px,2vw,24px)] font-bold font-display"
                      style={{
                        background: 'linear-gradient(135deg, var(--gradient-warm), var(--gradient-gold))',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                      }}
                    >
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <span className="font-mono text-[10px] text-brutal-muted tracking-[0.2em] uppercase">
                  {stat.label}
                </span>
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
