import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, CheckCircle } from 'lucide-react';
import { eventsData } from '../data/events';
import { LineDraw } from '../components/Motion';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export default function Events() {
  const { sectionNumber, sectionLabel, title, events } = eventsData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

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
      if (cardsRef.current) {
        const cards = cardsRef.current.querySelectorAll('[data-event-card]');
        cards.forEach((card, i) => {
          gsap.fromTo(card,
            { opacity: 0, y: 60, boxShadow: '0px 0px 0px var(--brutal-fg)' },
            {
              opacity: 1, y: 0, boxShadow: '6px 6px 0px var(--brutal-fg)',
              duration: 0.8, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 80%' },
              delay: i * 0.15,
            }
          );

          // List items stagger within each card
          const items = card.querySelectorAll('li');
          gsap.fromTo(items,
            { opacity: 0, x: -15 },
            {
              opacity: 1, x: 0, duration: 0.4, stagger: 0.08, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 75%' },
              delay: i * 0.15 + 0.3,
            }
          );
        });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-32 lg:py-40 overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 lg:px-8 w-full">
        {/* Section Header */}
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

        {/* Event Cards */}
        <div ref={cardsRef} className={`grid gap-6 ${events.length === 1 ? 'grid-cols-1 max-w-2xl mx-auto' :
          events.length === 2 ? 'grid-cols-1 lg:grid-cols-2' :
            'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
          }`}>
          {events.map((event, index) => (
            <div
              key={index}
              data-event-card
              className="bg-brutal-bg p-8 md:p-10"
              style={{
                border: '3px solid var(--brutal-border)',
                borderTop: '6px solid var(--brutal-accent)',
                opacity: 0,
              }}
            >
              {/* Card Header */}
              <div className="flex items-center gap-2 text-brutal-muted mb-4">
                <Calendar className="w-4 h-4 text-brutal-accent" />
                <span className="font-mono text-sm">{event.date}</span>
              </div>

              <h3 className="text-[clamp(20px,2.5vw,28px)] text-brutal-fg mb-4 leading-[1] font-display">
                {event.title}
              </h3>

              <div className="w-12 h-[3px] bg-brutal-accent mb-6" />

              <ul className="space-y-4">
                {event.highlights.map((point, i) => (
                  <li key={i} className="flex items-start gap-3" style={{ opacity: 0 }}>
                    <div className="mt-1 w-4 h-4 flex-shrink-0 flex items-center justify-center"
                      style={{ border: '2px solid var(--brutal-accent)' }}>
                      <CheckCircle className="w-2.5 h-2.5 text-brutal-accent" />
                    </div>
                    <span className="text-brutal-muted text-sm leading-[1.7]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="brutal-line-thin" />
      </div>
    </section>
  );
}
