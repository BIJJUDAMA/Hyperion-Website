import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            setVisible(window.scrollY > window.innerHeight);
        };
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 z-50 w-12 h-12 flex items-center justify-center
                  transition-all duration-300 cursor-pointer group
                  ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}
            style={{
                background: 'linear-gradient(135deg, var(--gradient-warm), var(--gradient-gold))',
                border: '2px solid var(--gradient-gold)',
                boxShadow: '3px 3px 0px var(--brutal-fg)',
            }}
            aria-label="Back to top"
        >
            <ArrowUp className="w-5 h-5 text-white group-hover:-translate-y-0.5 transition-transform duration-150" />
        </button>
    );
}
