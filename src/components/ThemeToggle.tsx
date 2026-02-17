import { Sun, Moon } from 'lucide-react';
import { useTheme } from './ThemeProvider';
import { motion, AnimatePresence } from 'framer-motion';

export default function ThemeToggle() {
    const { isDark, toggleTheme } = useTheme();

    return (
        <motion.button
            onClick={toggleTheme}
            className="w-10 h-10 bg-brutal-bg flex items-center justify-center
                 hover:bg-brutal-accent hover:text-white transition-colors duration-150 group relative overflow-hidden"
            style={{ border: '3px solid var(--brutal-border)' }}
            whileTap={{ scale: 0.85, rotate: -10 }}
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 500, damping: 20 }}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                    <motion.div
                        key="sun"
                        initial={{ y: 14, opacity: 0, rotate: -90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -14, opacity: 0, rotate: 90 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <Sun className="w-4 h-4 text-brutal-fg group-hover:text-white" />
                    </motion.div>
                ) : (
                    <motion.div
                        key="moon"
                        initial={{ y: 14, opacity: 0, rotate: 90 }}
                        animate={{ y: 0, opacity: 1, rotate: 0 }}
                        exit={{ y: -14, opacity: 0, rotate: -90 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                    >
                        <Moon className="w-4 h-4 text-brutal-fg group-hover:text-white" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.button>
    );
}
