import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const followerRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        const cursor = cursorRef.current;
        const follower = followerRef.current;

        // Hide default cursor
        document.body.style.cursor = 'none';

        // Move cursor
        const onMouseMove = (e: MouseEvent) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0,
                ease: 'none'
            });
            gsap.to(follower, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.15,
                ease: 'power2.out'
            });
        };

        // Hover detection
        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (
                target.tagName.toLowerCase() === 'a' ||
                target.tagName.toLowerCase() === 'button' ||
                target.closest('a') ||
                target.closest('button') ||
                target.closest('[data-hover]')
            ) {
                setIsHovering(true);
            } else {
                setIsHovering(false);
            }
        };

        const onMouseDown = () => {
            gsap.to(follower, { scale: 0.8, duration: 0.1 });
        };

        const onMouseUp = () => {
            gsap.to(follower, { scale: isHovering ? 1.5 : 1, duration: 0.1 });
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseover', onMouseOver);
        window.addEventListener('mousedown', onMouseDown);
        window.addEventListener('mouseup', onMouseUp);

        return () => {
            document.body.style.cursor = 'auto';
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseover', onMouseOver);
            window.removeEventListener('mousedown', onMouseDown);
            window.removeEventListener('mouseup', onMouseUp);
        };
    }, [isHovering]);

    useEffect(() => {
        const follower = followerRef.current;
        if (isHovering) {
            gsap.to(follower, {
                scale: 1.5,
                backgroundColor: 'rgba(255, 107, 0, 0.2)',
                borderColor: 'transparent',
                borderWidth: 0,
                mixBlendMode: 'difference',
                duration: 0.2
            });
        } else {
            gsap.to(follower, {
                scale: 1,
                backgroundColor: 'transparent',
                borderColor: '#F59E0B',
                borderWidth: 2,
                mixBlendMode: 'normal',
                duration: 0.2
            });
        }
    }, [isHovering]);

    return (
        <>
            <div
                ref={cursorRef}
                className="fixed top-0 left-0 w-2 h-2 bg-brutal-accent rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
            />
            <div
                ref={followerRef}
                className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-75"
                style={{
                    border: '2px solid var(--brutal-accent)',
                }}
            />
        </>
    );
}
