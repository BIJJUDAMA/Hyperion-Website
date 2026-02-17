import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { galleryData } from '../data/gallery';
import { LineDraw } from '../components/Motion';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export default function Gallery() {
  const { sectionNumber, sectionLabel, title, items } = galleryData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [lightbox, setLightbox] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Header entrance
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      // Staggered image entrance
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('[data-gallery-item]');
        gsap.fromTo(cards,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.7, stagger: 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: gridRef.current, start: 'top 80%' },
          }
        );
      }
    }, section);

    return () => ctx.revert();
  }, []);

  // Close lightbox on Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightbox(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  return (
    <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden">
      {/* Header */}
      <div className="px-6 lg:px-8 mb-12 md:mb-16">
        <div ref={headerRef} className="max-w-[1200px] mx-auto" style={{ opacity: 0 }}>
          <TextScramble
            text={`[${sectionLabel}] / ${sectionNumber}`}
            className="font-mono text-[11px] text-brutal-accent tracking-[0.3em] uppercase block mb-4"
          />
          <h2 className="text-[clamp(40px,6vw,80px)] text-brutal-fg leading-[0.95] font-display">
            {title}
          </h2>
          <LineDraw className="brutal-line w-24 mt-6" delay={0} />
        </div>
      </div>

      {/* Dynamic Grid */}
      <div
        ref={gridRef}
        className="max-w-[1200px] mx-auto px-6 lg:px-8 grid gap-4 md:gap-5"
        style={{
          gridTemplateColumns: 'repeat(12, 1fr)',
          gridAutoRows: 'minmax(140px, auto)',
        }}
      >
        {items.map((item, index) => {
          // Smart span assignment based on orientation and position
          const isLandscape = item.orientation === 'landscape';
          let colSpan: string;
          let rowSpan: string;

          if (isLandscape) {
            // Landscape: wide, shorter
            colSpan = index === 2 ? 'span 12' : 'span 7';
            rowSpan = index === 2 ? 'span 2' : 'span 2';
          } else {
            // Portrait: narrower, taller
            colSpan = 'span 5';
            rowSpan = 'span 3';
          }

          return (
            <div
              key={index}
              data-gallery-item
              className="group relative overflow-hidden cursor-pointer"
              style={{
                gridColumn: colSpan,
                gridRow: rowSpan,
                border: '2px solid var(--brutal-border)',
                background: 'var(--brutal-surface)',
                opacity: 0,
              }}
              onClick={() => setLightbox(index)}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--brutal-accent)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--brutal-border)';
              }}
            >
              <img
                src={item.image}
                alt={item.alt}
                width={item.width}
                height={item.height}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {/* Hover overlay with caption */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <span className="font-mono text-[11px] text-white tracking-[0.15em] uppercase p-4">
                  {item.alt}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Lightbox */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ background: 'rgba(0,0,0,0.9)' }}
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-6 right-6 font-mono text-white text-2xl hover:text-brutal-accent transition-colors z-10"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <img
            src={items[lightbox].image}
            alt={items[lightbox].alt}
            loading="eager"
            decoding="async"
            className="max-w-[90vw] max-h-[85vh] object-contain"
            onClick={(e) => e.stopPropagation()}
          />
          <span className="absolute bottom-8 font-mono text-[11px] text-white/60 tracking-[0.2em] uppercase">
            {items[lightbox].alt}
          </span>
        </div>
      )}
    </section>
  );
}
