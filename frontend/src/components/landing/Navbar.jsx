import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiOutlineBars3, HiOutlineXMark } from 'react-icons/hi2'
import Button from '../ui/Button'
import ThemeToggle from '../ui/ThemeToggle'

const NAV_LINKS = [
  { label: 'Features',   href: '#features' },
  { label: 'Templates',  href: '#templates' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing',    href: '#pricing' },
  { label: 'FAQ',        href: '#faq' },
]

const drawerVariants = {
  hidden: { opacity: 0, x: '100%' },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 300, damping: 30 },
  },
  exit: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.2 },
  },
}

const linkVariants = {
  hidden:  { opacity: 0, x: 30 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, duration: 0.3, ease: 'easeOut' },
  }),
}

export default function Navbar() {
  const [isScrolled, setIsScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const location = useLocation()
  const navigate = useNavigate()

  // Detect scroll for sticky glass effect
  useEffect(() => {
    const handler = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActiveSection(`#${e.target.id}`)
        })
      },
      { rootMargin: '-30% 0px -60% 0px' }
    )
    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [location])

  const handleNavClick = (href) => {
    setMobileOpen(false)
    const el = document.querySelector(href)
    if (el) {
      setTimeout(() => el.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
    }
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className={[
          'fixed top-0 left-0 right-0 z-50',
          'transition-all duration-300',
          isScrolled ? 'navbar-blur' : 'bg-transparent border-transparent',
        ].join(' ')}
        role="banner"
      >
        <div className="section-container">
          <div className="flex items-center justify-between h-16 lg:h-18">

            {/* ── Logo ── */}
            <Link
              to="/"
              className="flex items-center gap-2.5 shrink-0"
              aria-label="Devfolio AI home"
            >
              <div className="w-8 h-8 rounded-lg bg-linear-to-br from-brand-500 to-violet-500 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.4)]">
                <span className="text-white font-heading font-bold text-sm">D</span>
              </div>
              <span className="font-heading font-bold text-xl" style={{ color: 'var(--text-primary)' }}>
                Devfolio <span className="gradient-text">AI</span>
              </span>
            </Link>

            {/* ── Desktop Nav ── */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={[
                    'px-3.5 py-2 rounded-lg text-sm font-medium',
                    'transition-all duration-200',
                    activeSection === link.href
                      ? 'text-brand-500 bg-brand-500/8'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]',
                  ].join(' ')}
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* ── Desktop CTAs ── */}
            <div className="hidden md:flex items-center gap-3">
              <ThemeToggle />
              <Button variant="ghost" size="sm" onClick={() => navigate('/login')}>
                Log in
              </Button>
              <Button
                variant="primary"
                size="sm"
                className="shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                onClick={() => navigate('/login')}
              >
                Get Started
              </Button>
            </div>

            {/* ── Mobile Controls ── */}
            <div className="flex md:hidden items-center gap-2">
              <ThemeToggle />
              <motion.button
                onClick={() => setMobileOpen(true)}
                whileTap={{ scale: 0.9 }}
                aria-label="Open menu"
                className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--border-strong)] bg-[var(--bg-card)] text-[var(--text-secondary)]"
              >
                <HiOutlineBars3 size={20} />
              </motion.button>
            </div>

          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              aria-hidden="true"
            />

            {/* Drawer Panel */}
            <motion.div
              key="drawer"
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed top-0 right-0 bottom-0 z-[70] w-80 max-w-[85vw] flex flex-col"
              style={{ background: 'var(--bg-primary)', borderLeft: '1px solid var(--border)' }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-[var(--border)]">
                <span className="font-heading font-bold text-lg" style={{ color: 'var(--text-primary)' }}>
                  Devfolio <span className="gradient-text">AI</span>
                </span>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  aria-label="Close menu"
                  className="w-9 h-9 rounded-xl flex items-center justify-center border border-[var(--border-strong)] text-[var(--text-secondary)]"
                >
                  <HiOutlineXMark size={20} />
                </motion.button>
              </div>

              {/* Nav Links */}
              <nav className="flex flex-col gap-1 px-4 pt-4 flex-1 overflow-y-auto" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.button
                    key={link.href}
                    custom={i}
                    variants={linkVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => handleNavClick(link.href)}
                    className={[
                      'w-full text-left px-4 py-3 rounded-xl text-base font-medium',
                      'transition-colors duration-150',
                      activeSection === link.href
                        ? 'text-brand-500 bg-brand-500/8'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card)]',
                    ].join(' ')}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </nav>

              {/* Drawer Footer CTAs */}
              <div className="px-4 pb-8 pt-4 flex flex-col gap-3 border-t border-[var(--border)]">
                <Button variant="secondary" size="lg" className="w-full justify-center" onClick={() => { setMobileOpen(false); navigate('/login'); }}>
                  Log in
                </Button>
                <Button variant="primary" size="lg" className="w-full justify-center" onClick={() => { setMobileOpen(false); navigate('/login'); }}>
                  Get Started Free
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
