import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { whatIsHyperloopData } from '../data/whatIsHyperloop';
import { LineDraw } from '../components/Motion';
import TextScramble from '../components/TextScramble';

gsap.registerPlugin(ScrollTrigger);

export default function WhatIsHyperloop() {
  const { sectionLabel, sectionNumber, title, paragraphs } = whatIsHyperloopData;
  const sectionRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const parasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      // Label slides in
      gsap.fromTo(labelRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1, x: 0, duration: 0.6, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 75%' },
        }
      );

      // Title reveals with clip-path
      gsap.fromTo(titleRef.current,
        { opacity: 0, y: 50, clipPath: 'inset(100% 0% 0% 0%)' },
        {
          opacity: 1, y: 0, clipPath: 'inset(0% 0% 0% 0%)', duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: section, start: 'top 70%' },
        }
      );

      // Paragraphs stagger in
      if (parasRef.current) {
        const paras = parasRef.current.querySelectorAll('[data-para]');
        gsap.fromTo(paras,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out',
            scrollTrigger: { trigger: parasRef.current, start: 'top 80%' },
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
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-start min-h-[60vh]">
          {/* Left: Text — wider */}
          <div className="lg:col-span-12">
            <span ref={labelRef} style={{ opacity: 0 }}>
              <TextScramble
                text={`[${sectionLabel}] / ${sectionNumber}`}
                className="font-mono text-[11px] text-brutal-accent tracking-[0.3em] uppercase block mb-6"
              />
            </span>

            <h2
              ref={titleRef}
              className="text-[clamp(40px,6vw,80px)] text-brutal-fg mb-8 leading-[0.95] font-display"
              style={{ opacity: 0 }}
            >
              {title}
            </h2>

            <LineDraw className="brutal-line w-24 mb-10" delay={0} />

            <div ref={parasRef} className="max-w-3xl">
              {paragraphs.map((p, i) => (
                <p
                  key={i}
                  data-para
                  className="text-brutal-muted text-[clamp(15px,1.2vw,18px)] leading-[1.9] mb-6 font-sans"
                  style={{ opacity: 0 }}
                >
                  {p}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0">
        <div className="brutal-line-thin" />
      </div>
    </section>
  );
}
