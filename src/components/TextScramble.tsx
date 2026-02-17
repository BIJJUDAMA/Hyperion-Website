import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*[]{}/<>';

interface TextScrambleProps {
    text: string;
    className?: string;
    style?: React.CSSProperties;
    speed?: number;
}

export default function TextScramble({ text, className = '', style, speed = 30 }: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const ref = useRef<HTMLSpanElement>(null);
    const hasPlayed = useRef(false);

    useEffect(() => {
        if (!ref.current) return;

        const st = ScrollTrigger.create({
            trigger: ref.current,
            start: 'top 85%',
            onEnter: () => {
                if (hasPlayed.current) return;
                hasPlayed.current = true;
                scramble();
            },
        });

        return () => st.kill();
    }, [text]);

    const scramble = () => {
        let iteration = 0;
        const totalLength = text.length;
        const interval = setInterval(() => {
            const resolved = text.slice(0, iteration);
            const scrambled = Array.from({ length: totalLength - iteration }, () =>
                CHARS[Math.floor(Math.random() * CHARS.length)]
            ).join('');

            setDisplayText(resolved + scrambled);
            iteration += 1;

            if (iteration > totalLength) {
                clearInterval(interval);
                setDisplayText(text);
            }
        }, speed);
    };

    return (
        <span ref={ref} className={className} style={style}>
            {displayText}
        </span>
    );
}
