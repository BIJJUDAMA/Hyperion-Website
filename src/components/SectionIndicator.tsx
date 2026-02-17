import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sections = [
    { id: 'hero', label: 'Hero' },
    { id: 'about', label: 'About' },
    { id: 'subsystems', label: 'Systems' },
    { id: 'events', label: 'Events' },
    { id: 'achievements', label: 'Awards' },
    { id: 'team', label: 'Team' },
    { id: 'contact', label: 'Contact' },
];

export default function SectionIndicator() {
    const [activeIndex, setActiveIndex] = useState(0);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const triggers: ScrollTrigger[] = [];

        sections.forEach((section, index) => {
            let triggerEl: HTMLElement | Window;
            if (section.id === 'hero') {
                triggerEl = document.querySelector('section') as HTMLElement;
            } else {
                triggerEl = document.getElementById(section.id) as HTMLElement;
            }

            if (triggerEl) {
                const st = ScrollTrigger.create({
                    trigger: triggerEl,
                    start: 'top center',
                    end: 'bottom center',
                    onToggle: (self) => {
                        if (self.isActive) {
                            setActiveIndex(index);
                        }
                    },
                });
                triggers.push(st);
            }
        });

        // Scroll progress
        const updateProgress = () => {
            if (progressRef.current) {
                const scrollY = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
                progressRef.current.style.height = `${progress}%`;
            }
        };

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();

        return () => {
            triggers.forEach((t) => t.kill());
            window.removeEventListener('scroll', updateProgress);
        };
    }, []);

    const scrollTo = (id: string) => {
        if (id === 'hero') {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        } else {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col items-center gap-3">
            {/* Progress track */}
            <div
                className="absolute left-1/2 -translate-x-1/2 w-[2px] h-full"
                style={{ background: 'var(--brutal-border)' }}
            >
                <div
                    ref={progressRef}
                    className="w-full transition-all duration-150"
                    style={{
                        background: 'linear-gradient(180deg, var(--gradient-warm), var(--gradient-gold))',
                    }}
                />
            </div>

            {/* Right Side Dots */}
            {sections.map((section, index) => (
                <button
                    key={section.id}
                    onClick={() => scrollTo(section.id)}
                    className="relative group z-10 flex items-center gap-3"
                    title={section.label}
                >
                    <div
                        className={`w-3 h-3 rounded-full border-2 transition-all duration-200
              ${activeIndex === index
                                ? 'scale-125 border-transparent'
                                : 'border-[var(--brutal-muted)] bg-transparent hover:border-[var(--brutal-accent)]'
                            }
            `}
                        style={activeIndex === index ? {
                            background: 'linear-gradient(135deg, var(--gradient-warm), var(--gradient-gold))',
                            boxShadow: '0 0 10px rgba(245, 147, 14, 0.5)',
                        } : {}}
                    />

                    {/* Tooltip */}
                    <span
                        className="absolute right-6 font-mono text-[9px] tracking-[0.2em] uppercase
                       opacity-0 group-hover:opacity-100 transition-opacity duration-150
                       whitespace-nowrap pointer-events-none px-2 py-1"
                        style={{
                            background: 'var(--brutal-surface)',
                            border: '1px solid var(--brutal-border)',
                            color: 'var(--brutal-fg)',
                        }}
                    >
                        {section.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
