import { motion } from 'framer-motion'

/**
 * AnimatedCard — scroll-triggered entrance + hover lift
 * Uses feature-card CSS class for theming
 */
export default function AnimatedCard({
  children,
  delay = 0,
  className = '',
  glowOnHover = false,
  noPadding = false,
  onClick,
  style,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2, ease: 'easeOut' } }}
      onClick={onClick}
      style={style}
      className={[
        'feature-card',
        noPadding ? '' : 'p-6',
        glowOnHover ? 'hover:shadow-[0_0_30px_rgba(99,102,241,0.25)]' : '',
        onClick ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
    >
      {children}
    </motion.div>
  )
}
