import { motion } from 'framer-motion'
import { forwardRef } from 'react'

const VARIANTS = {
  primary: [
    'bg-linear-to-r from-brand-500 to-violet-500',
    'text-white font-semibold',
    'border border-transparent',
    'hover:from-brand-600 hover:to-violet-600',
    'shadow-[0_0_15px_rgba(99,102,241,0.3)]',
    'hover:shadow-[0_0_30px_rgba(99,102,241,0.5)]',
    'btn-glow',
  ].join(' '),
  secondary: [
    'font-medium',
    'border border-[var(--border-strong)]',
    'bg-[var(--bg-card)] text-[var(--text-primary)]',
    'hover:border-brand-500/50 hover:bg-[var(--bg-card-hover)]',
  ].join(' '),
  ghost: [
    'font-medium bg-transparent',
    'text-[var(--text-primary)]',
    'border border-transparent',
    'hover:bg-[var(--bg-card)]',
  ].join(' '),
  outline: [
    'font-semibold bg-transparent',
    'text-brand-500 border border-brand-500/50',
    'hover:bg-brand-500/10 hover:border-brand-500',
  ].join(' '),
}

const SIZES = {
  sm: 'px-3 py-1.5 text-sm rounded-lg gap-1.5',
  md: 'px-4 py-2 text-sm rounded-xl gap-2',
  lg: 'px-6 py-3 text-base rounded-xl gap-2',
  xl: 'px-8 py-4 text-lg rounded-2xl gap-3',
}

const Button = forwardRef(function Button(
  {
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    isLoading = false,
    leftIcon,
    rightIcon,
    disabled,
    onClick,
    type = 'button',
    ...rest
  },
  ref
) {
  const isDisabled = disabled || isLoading

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      whileHover={isDisabled ? {} : { scale: 1.025, y: -1 }}
      whileTap={isDisabled ? {} : { scale: 0.975 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      className={[
        'inline-flex items-center justify-center whitespace-nowrap select-none',
        'transition-all duration-200 ease-out',
        'focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none',
        VARIANTS[variant] ?? VARIANTS.primary,
        SIZES[size] ?? SIZES.md,
        className,
      ].join(' ')}
      {...rest}
    >
      {isLoading ? (
        <span className="inline-flex items-center gap-2">
          <svg className="animate-spin h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
          </svg>
          Loading…
        </span>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  )
})

export default Button
