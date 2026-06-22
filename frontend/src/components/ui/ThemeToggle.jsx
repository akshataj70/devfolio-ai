import { motion } from 'framer-motion'
import { HiSun, HiMoon } from 'react-icons/hi2'
import { useTheme } from '../../context/ThemeContext'

/**
 * ThemeToggle — animated sun/moon toggle button for the navbar
 */
export default function ThemeToggle({ className = '' }) {
  const { isDark, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className={[
        'relative w-9 h-9 rounded-xl',
        'flex items-center justify-center',
        'border border-[var(--border-strong)]',
        'bg-[var(--bg-card)]',
        'text-[var(--text-secondary)]',
        'hover:text-brand-500 hover:border-brand-500/50',
        'transition-all duration-200',
        className,
      ].join(' ')}
    >
      <motion.span
        key={isDark ? 'moon' : 'sun'}
        initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
        transition={{ duration: 0.25, ease: 'easeOut' }}
        className="absolute"
      >
        {isDark ? <HiSun size={18} /> : <HiMoon size={18} />}
      </motion.span>
    </motion.button>
  )
}
