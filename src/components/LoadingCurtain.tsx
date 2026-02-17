import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

interface LoadingCurtainProps {
    onComplete?: () => void;
}

export default function LoadingCurtain({ onComplete }: LoadingCurtainProps) {
    const [isActive, setIsActive] = useState(true);
    const containerRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);
    const gridRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                onComplete: () => {
                    setIsActive(false);
                    if (onComplete) onComplete();
                },
            });

            // Initial setup
            gsap.set(contentRef.current, { y: 0, opacity: 0 });
            gsap.set(textRef.current, { opacity: 0, y: 10 });
            gsap.set(gridRef.current, { opacity: 0 });

            tl
                // 1. Fade In
                .to(contentRef.current, {
                    opacity: 1,
                    duration: 1.0,
                    ease: 'power3.out',
                })
                // 2. Charge Up
                .to(barRef.current, {
                    scaleX: 1,
                    duration: 0.7,
                    ease: 'power3.inOut',
                }, '-=0.5')

                // 3. Activation
                .to(gridRef.current, {
                    opacity: 0.15,
                    duration: 0.8,
                })
                .to(textRef.current, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5,
                }, '<0.2')

                .to({}, { duration: 0.3 })

                // 4. Reveal (Slide Up)
                .to(containerRef.current, {
                    yPercent: -100,
                    duration: 1.0,
                    ease: 'power3.inOut',
                    delay: 0.1,
                });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    if (!isActive) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center overflow-hidden text-white"
        >
            {/*Grid Background */}
            <div
                ref={gridRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
                    backgroundSize: '40px 40px',
                    maskImage: 'radial-gradient(circle at center, black 0%, transparent 80%)'
                }}
            />

            {/* Levitation Content */}
            <div
                ref={contentRef}
                className="relative z-10 flex flex-col items-center gap-6"
            >
                {/* Logo/Text */}
                <div className="flex flex-col items-center gap-4">
                    <img
                        ref={logoRef}
                        src="/images/hyperion_light.png"
                        alt="Hyperion"
                        width="205"
                        height="64"
                        loading="eager"
                        decoding="async"
                        fetchPriority="high"
                        className="h-16 w-auto object-contain drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]"
                    />
                    <span
                        ref={textRef}
                        className="font-mono text-[10px] tracking-[0.4em] text-neutral-400 uppercase"
                    >
                        System Online
                    </span>
                </div>

                {/* Loading Bar */}
                <div className="w-48 h-[2px] bg-neutral-800 rounded-full overflow-hidden">
                    <div
                        ref={barRef}
                        className="w-full h-full origin-left transform scale-x-0"
                        style={{ background: 'linear-gradient(90deg, var(--gradient-warm), var(--gradient-gold))' }}
                    />
                </div>
            </div>
        </div>
    );
}
