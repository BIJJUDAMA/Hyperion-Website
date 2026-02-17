import { useEffect, useRef, type ReactNode, type HTMLAttributes } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useScrollReveal(options?: {
    y?: number;
    x?: number;
    opacity?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
}) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const from: gsap.TweenVars = {
            opacity: options?.opacity ?? 0,
            y: options?.y ?? 40,
            x: options?.x ?? 0,
        };

        const to: gsap.TweenVars = {
            opacity: 1,
            y: 0,
            x: 0,
            duration: options?.duration ?? 0.8,
            delay: options?.delay ?? 0,
            ease: options?.ease ?? 'power3.out',
            scrollTrigger: {
                trigger: el,
                start: options?.start ?? 'top 85%',
                toggleActions: 'play none none none',
            },
        };

        gsap.fromTo(el, from, to);

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, []);

    return ref;
}

/* FadeIn component using GSAP */
interface FadeInProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right' | 'none';
    duration?: number;
}

const directionOffset = {
    up: { y: 50, x: 0 },
    down: { y: -50, x: 0 },
    left: { x: 50, y: 0 },
    right: { x: -50, y: 0 },
    none: { x: 0, y: 0 },
};

export function FadeIn({
    children,
    delay = 0,
    direction = 'up',
    duration = 0.8,
    ...props
}: FadeInProps) {
    const ref = useScrollReveal({
        y: directionOffset[direction].y,
        x: directionOffset[direction].x,
        delay,
        duration,
    });

    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    );
}

/* StaggerContainer + StaggerItem using GSAP */
interface StaggerProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
}

export function StaggerContainer({ children, ...props }: StaggerProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const items = el.querySelectorAll('[data-stagger-item]');
        if (items.length === 0) return;

        gsap.fromTo(
            items,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, []);

    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    );
}

export function StaggerItem({ children, ...props }: StaggerProps) {
    return (
        <div data-stagger-item {...props}>
            {children}
        </div>
    );
}

/* ScaleIn using GSAP */
interface ScaleInProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    delay?: number;
}

export function ScaleIn({ children, delay = 0, ...props }: ScaleInProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { opacity: 0, scale: 0.8 },
            {
                opacity: 1,
                scale: 1,
                duration: 0.7,
                delay,
                ease: 'back.out(1.7)',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, []);

    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    );
}

/* LineDraw using GSAP */
interface LineDrawProps {
    className?: string;
    delay?: number;
}

export function LineDraw({ className = '', delay = 0 }: LineDrawProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.fromTo(
            el,
            { scaleX: 0 },
            {
                scaleX: 1,
                duration: 0.8,
                delay,
                ease: 'power3.inOut',
                transformOrigin: 'left',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, []);

    return <div ref={ref} className={className} style={{ transformOrigin: 'left' }} />;
}

/* Parallax using GSAP */
interface ParallaxProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    speed?: number; // -1 to 1, negative = slower, positive = faster
}

export function Parallax({ children, speed = 0.3, ...props }: ParallaxProps) {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        gsap.to(el, {
            y: () => speed * 100,
            ease: 'none',
            scrollTrigger: {
                trigger: el,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, [speed]);

    return (
        <div ref={ref} {...props}>
            {children}
        </div>
    );
}

/* TextReveal using GSAP */
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export function TextReveal({ text, className = '', delay = 0 }: TextRevealProps) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const words = el.querySelectorAll('[data-word]');

        gsap.fromTo(
            words,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.4,
                stagger: 0.05,
                delay,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                },
            }
        );

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === el) t.kill();
            });
        };
    }, [delay]);

    const words = text.split(' ');

    return (
        <span ref={ref} className={className} style={{ display: 'inline' }}>
            {words.map((word, i) => (
                <span
                    key={i}
                    data-word
                    style={{ display: 'inline-block', marginRight: '0.3em' }}
                >
                    {word}
                </span>
            ))}
        </span>
    );
}

/* Horizontal Scroll Section */
interface HorizontalScrollProps {
    children: ReactNode;
    className?: string;
}

export function HorizontalScroll({ children, className = '' }: HorizontalScrollProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        if (!container || !track) return;

        const totalWidth = track.scrollWidth - container.offsetWidth;

        gsap.to(track, {
            x: -totalWidth,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                pin: true,
                scrub: 1,
                end: () => `+=${totalWidth}`,
            },
        });

        return () => {
            ScrollTrigger.getAll().forEach(t => {
                if (t.trigger === container) t.kill();
            });
        };
    }, []);

    return (
        <div ref={containerRef} className={`overflow-hidden ${className}`}>
            <div ref={trackRef} className="flex">
                {children}
            </div>
        </div>
    );
}
