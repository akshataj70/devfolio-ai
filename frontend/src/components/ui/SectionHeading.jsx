import { motion } from 'framer-motion'

const ALIGN = {
  left:   'text-left items-start',
  center: 'text-center items-center',
  right:  'text-right items-end',
}

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}
const item = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] } },
}

/**
 * SectionHeading
 * @param {string}  eyebrow  - small badge label above title
 * @param {ReactNode} title  - main heading (can include JSX for gradient spans)
 * @param {string}  subtitle - paragraph below title
 * @param {'left'|'center'|'right'} align
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  titleClassName = '',
  subtitleClassName = '',
  className = '',
}) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-80px' }}
      className={`flex flex-col gap-4 ${ALIGN[align] ?? ALIGN.center} ${className}`}
    >
      {eyebrow && (
        <motion.div variants={item}>
          <span className="badge-brand">{eyebrow}</span>
        </motion.div>
      )}

      {title && (
        <motion.h2
          variants={item}
          className={`font-heading font-bold text-3xl sm:text-4xl lg:text-5xl leading-tight tracking-tight text-balance ${titleClassName}`}
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </motion.h2>
      )}

      {subtitle && (
        <motion.p
          variants={item}
          className={`text-lg sm:text-xl leading-relaxed max-w-2xl ${align === 'center' ? 'mx-auto' : ''} ${subtitleClassName}`}
          style={{ color: 'var(--text-secondary)' }}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  )
}
