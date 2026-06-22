import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'

const TABS = ['Resume Templates', 'Portfolio Themes']

const RESUME_TEMPLATES = [
  {
    name: 'Modern',
    tag: 'Popular',
    tagColor: 'bg-brand-500/15 text-brand-500',
    description: 'Clean and professional. Perfect for tech and business roles.',
    accent: 'from-brand-500 to-violet-500',
    preview: {
      header: { name: 'Akash Kumar', title: 'Senior Software Engineer' },
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      color: '#6366f1',
    },
  },
  {
    name: 'Minimal',
    tag: 'ATS Best',
    tagColor: 'bg-emerald-500/15 text-emerald-600',
    description: 'Ultra-clean design optimized for applicant tracking systems.',
    accent: 'from-slate-500 to-slate-700',
    preview: {
      header: { name: 'Sara Chen', title: 'Product Designer' },
      skills: ['Figma', 'Design Systems', 'UX Research', 'Prototyping'],
      color: '#64748b',
    },
  },
  {
    name: 'Developer',
    tag: 'Dev Favorite',
    tagColor: 'bg-cyan-500/15 text-cyan-600',
    description: 'Code-inspired layout that highlights technical skills and GitHub projects.',
    accent: 'from-cyan-500 to-teal-500',
    preview: {
      header: { name: 'James Dev', title: 'Full Stack Developer' },
      skills: ['Python', 'Django', 'PostgreSQL', 'Docker'],
      color: '#06b6d4',
    },
  },
  {
    name: 'Corporate',
    tag: 'Finance/Law',
    tagColor: 'bg-amber-500/15 text-amber-700',
    description: 'Formal and structured layout ideal for corporate, finance, and legal roles.',
    accent: 'from-amber-600 to-orange-600',
    preview: {
      header: { name: 'Emily Brooks', title: 'Investment Analyst' },
      skills: ['Financial Modeling', 'Excel', 'Bloomberg', 'Valuation'],
      color: '#d97706',
    },
  },
  {
    name: 'Creative',
    tag: 'Design/Media',
    tagColor: 'bg-rose-500/15 text-rose-600',
    description: 'Bold and expressive. Perfect for designers, artists, and creatives.',
    accent: 'from-rose-500 to-pink-500',
    preview: {
      header: { name: 'Mia Rossi', title: 'Brand Designer' },
      skills: ['Illustrator', 'Branding', 'Motion', 'Typography'],
      color: '#f43f5e',
    },
  },
]

const PORTFOLIO_THEMES = [
  {
    name: 'Developer',
    tag: 'Vercel-inspired',
    tagColor: 'bg-brand-500/15 text-brand-500',
    description: 'Dark, minimal, terminal-aesthetic. Built for engineers.',
    accent: 'from-gray-900 to-brand-900',
    preview: { bg: '#080811', accent: '#6366f1', text: 'dark' },
  },
  {
    name: 'Minimal',
    tag: 'Notion-inspired',
    tagColor: 'bg-slate-500/15 text-slate-600',
    description: 'Clean, content-first layout that lets your work speak.',
    accent: 'from-white to-gray-100',
    preview: { bg: '#f8fafc', accent: '#334155', text: 'light' },
  },
  {
    name: 'Creative',
    tag: 'Framer-inspired',
    tagColor: 'bg-violet-500/15 text-violet-600',
    description: 'Bold gradients and smooth animations. For creatives who want to wow.',
    accent: 'from-violet-600 to-fuchsia-600',
    preview: { bg: '#1e0a3c', accent: '#a78bfa', text: 'dark' },
  },
  {
    name: 'Professional',
    tag: 'Stripe-inspired',
    tagColor: 'bg-teal-500/15 text-teal-600',
    description: 'Premium, polished layout with crisp typography. Trusted executive vibe.',
    accent: 'from-teal-600 to-cyan-600',
    preview: { bg: '#0a2540', accent: '#06b6d4', text: 'dark' },
  },
]

/* ─── Resume Template Card ─── */
function ResumeCard({ tpl, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className="group feature-card overflow-hidden"
    >
      {/* Mini resume preview */}
      <div
        className="h-40 flex flex-col gap-3 p-4 relative overflow-hidden"
        style={{ background: 'var(--bg-secondary)' }}
      >
        {/* Top accent bar */}
        <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${tpl.accent}`} />

        {/* Header block */}
        <div className="flex items-center gap-2.5 mt-2">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-[10px] font-bold shrink-0"
            style={{ background: tpl.preview.color }}
          >
            {tpl.preview.header.name.split(' ').map(n => n[0]).join('')}
          </div>
          <div>
            <div className="text-[11px] font-semibold" style={{ color: 'var(--text-primary)' }}>
              {tpl.preview.header.name}
            </div>
            <div className="text-[9px]" style={{ color: 'var(--text-muted)' }}>
              {tpl.preview.header.title}
            </div>
          </div>
        </div>

        {/* Skills row */}
        <div className="flex flex-wrap gap-1">
          {tpl.preview.skills.map((s) => (
            <span
              key={s}
              className="text-[8px] px-1.5 py-0.5 rounded font-medium"
              style={{ background: `${tpl.preview.color}18`, color: tpl.preview.color }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Lines placeholder */}
        <div className="flex flex-col gap-1.5">
          {[80, 60, 90].map((w, k) => (
            <div
              key={k}
              className="h-1 rounded-full"
              style={{ width: `${w}%`, background: 'var(--border-strong)' }}
            />
          ))}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-semibold text-brand-500 bg-white/90 dark:bg-black/80 px-3 py-1.5 rounded-lg shadow">
            Use Template →
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {tpl.name}
          </h3>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tpl.tagColor}`}>
            {tpl.tag}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {tpl.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Portfolio Theme Card ─── */
function PortfolioCard({ theme, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.09, ease: [0.4, 0, 0.2, 1] }}
      className="group feature-card overflow-hidden"
    >
      {/* Portfolio preview */}
      <div
        className="h-40 flex flex-col p-4 relative overflow-hidden"
        style={{ background: theme.preview.bg }}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="w-2 h-2 rounded-full bg-red-400 opacity-70" />
          <div className="w-2 h-2 rounded-full bg-yellow-400 opacity-70" />
          <div className="w-2 h-2 rounded-full bg-green-400 opacity-70" />
          <div className="flex-1 ml-2 h-2 rounded" style={{ background: 'rgba(255,255,255,0.1)' }} />
        </div>

        {/* Content lines */}
        <div className="flex flex-col gap-2 mt-1">
          <div className="h-3 rounded w-2/3" style={{ background: theme.preview.accent, opacity: 0.9 }} />
          <div className="h-1.5 rounded w-1/2" style={{ background: 'rgba(255,255,255,0.25)' }} />
          <div className="flex gap-1.5 mt-1">
            {['React', 'Node', 'AWS'].map((t) => (
              <span
                key={t}
                className="text-[8px] px-1.5 py-0.5 rounded font-medium"
                style={{ background: `${theme.preview.accent}30`, color: theme.preview.accent }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Gradient bg accent */}
        <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full bg-linear-to-br ${theme.accent} opacity-20 blur-xl`} />

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-semibold text-white bg-black/60 backdrop-blur px-3 py-1.5 rounded-lg">
            Preview Theme →
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading font-semibold text-sm" style={{ color: 'var(--text-primary)' }}>
            {theme.name}
          </h3>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.tagColor}`}>
            {theme.tag}
          </span>
        </div>
        <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          {theme.description}
        </p>
      </div>
    </motion.div>
  )
}

/* ─── Main Component ─── */
export default function TemplateShowcase() {
  const [activeTab, setActiveTab] = useState(0)

  return (
    <section id="templates" className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <SectionHeading
          eyebrow="Templates & Themes"
          title={
            <>
              Designs That Make You{' '}
              <span className="gradient-text">Unforgettable</span>
            </>
          }
          subtitle="Professionally designed templates for every role and industry. Fully customizable in seconds."
          align="center"
          className="mb-10"
        />

        {/* Tab switcher */}
        <div className="flex items-center justify-center mb-10">
          <div
            className="flex p-1 rounded-xl gap-1"
            style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border)' }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={[
                  'relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200',
                  activeTab === i
                    ? 'text-white'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                ].join(' ')}
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-lg bg-linear-to-r from-brand-500 to-violet-500"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Template grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            {activeTab === 0
              ? RESUME_TEMPLATES.map((t, i) => <ResumeCard key={t.name} tpl={t} index={i} />)
              : PORTFOLIO_THEMES.map((t, i) => <PortfolioCard key={t.name} theme={t} index={i} />)}
          </motion.div>
        </AnimatePresence>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            All templates are fully customizable · New templates added weekly
          </p>
        </motion.div>
      </div>
    </section>
  )
}
