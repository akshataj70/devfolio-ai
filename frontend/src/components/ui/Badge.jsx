const VARIANTS = {
  brand:  'bg-brand-500/10 text-brand-500 border-brand-500/20 dark:text-brand-400',
  violet: 'bg-violet-500/10 text-violet-500 border-violet-500/20 dark:text-violet-400',
  cyan:   'bg-cyan-500/10 text-cyan-500 border-cyan-500/20 dark:text-cyan-400',
  green:  'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400',
  yellow: 'bg-yellow-500/10 text-yellow-700 border-yellow-500/20 dark:text-yellow-400',
  red:    'bg-red-500/10 text-red-600 border-red-500/20 dark:text-red-400',
  gray:   'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] border-[var(--border)]',
}

export default function Badge({ children, variant = 'brand', icon, className = '' }) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border',
        VARIANTS[variant] ?? VARIANTS.brand,
        className,
      ].join(' ')}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      {children}
    </span>
  )
}
