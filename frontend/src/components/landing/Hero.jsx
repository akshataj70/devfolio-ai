import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'
import { HiArrowRight, HiPlay, HiCheckCircle, HiSparkles } from 'react-icons/hi2'
import { HiChip, HiGlobeAlt, HiDocumentText } from 'react-icons/hi'
import Button from '../ui/Button'
import Badge from '../ui/Badge'

/* ─── Mini animated resume card ─── */
function ResumePreviewCard() {
  return (
    <motion.div
      animate={{ y: [0, -12, 0], rotate: [0, 1, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      className="gradient-border-card p-5 w-64 shadow-[0_20px_60px_rgba(0,0,0,0.2)]"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-full bg-linear-to-br from-brand-400 to-violet-500 flex items-center justify-center text-white font-bold text-sm shrink-0">
          AK
        </div>
        <div>
          <div className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>Akash Kumar</div>
          <div className="text-[10px]" style={{ color: 'var(--text-muted)' }}>Full Stack Developer</div>
        </div>
      </div>

      {/* Section label */}
      <div className="text-[9px] uppercase tracking-widest font-bold mb-2 text-brand-500">Experience</div>

      {/* Experience rows */}
      {[
        { role: 'Senior Engineer', co: 'Google', yr: '2023–Present' },
        { role: 'Frontend Dev',    co: 'Vercel',  yr: '2021–2023' },
      ].map((r) => (
        <div key={r.co} className="mb-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-semibold" style={{ color: 'var(--text-primary)' }}>{r.role}</span>
            <span className="text-[9px]" style={{ color: 'var(--text-muted)' }}>{r.yr}</span>
          </div>
          <span className="text-[9px] text-brand-500">{r.co}</span>
        </div>
      ))}

      {/* Skills */}
      <div className="text-[9px] uppercase tracking-widest font-bold mt-3 mb-2 text-brand-500">Skills</div>
      <div className="flex flex-wrap gap-1">
        {['React', 'Node', 'Python', 'AWS'].map((s) => (
          <span key={s} className="pill-tag text-[9px]">{s}</span>
        ))}
      </div>

      {/* ATS badge */}
      <div className="mt-3 flex items-center gap-1.5">
        <HiCheckCircle size={12} className="text-emerald-500" />
        <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">ATS Score: 98%</span>
      </div>
    </motion.div>
  )
}

/* ─── Mini portfolio preview card ─── */
function PortfolioPreviewCard() {
  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [0, -1, 0] }}
      transition={{ duration: 7, delay: 1, repeat: Infinity, ease: 'easeInOut' }}
      className="glass-card p-5 w-60 shadow-[0_20px_60px_rgba(0,0,0,0.2)] border border-[var(--glass-border)]"
    >
      {/* Browser bar */}
      <div className="flex items-center gap-1.5 mb-3">
        <div className="w-2 h-2 rounded-full bg-red-400" />
        <div className="w-2 h-2 rounded-full bg-yellow-400" />
        <div className="w-2 h-2 rounded-full bg-green-400" />
        <div className="flex-1 ml-2 h-2 rounded bg-[var(--bg-tertiary)]" />
      </div>

      {/* Portfolio header */}
      <div className="mb-3">
        <div className="text-[10px] font-bold gradient-text mb-0.5">akash.devfolio.ai</div>
        <div className="text-[9px]" style={{ color: 'var(--text-muted)' }}>Portfolio Website</div>
      </div>

      {/* Project cards */}
      {[
        { name: 'E-Commerce App', badge: 'React' },
        { name: 'AI Dashboard',   badge: 'Python' },
      ].map((p) => (
        <div key={p.name} className="mb-2 p-2 rounded-lg bg-[var(--bg-tertiary)] flex items-center justify-between">
          <span className="text-[9px] font-medium" style={{ color: 'var(--text-primary)' }}>{p.name}</span>
          <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-brand-500/15 text-brand-500 font-medium">{p.badge}</span>
        </div>
      ))}

      {/* Live indicator */}
      <div className="mt-3 flex items-center gap-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-[9px] font-medium text-emerald-600 dark:text-emerald-400">Live & Published</span>
      </div>
    </motion.div>
  )
}

/* ─── Trust Stats ─── */
const STATS = [
  { value: '10K+', label: 'Users' },
  { value: '98%',  label: 'ATS Score' },
  { value: '50+',  label: 'Templates' },
]

/* ─── Main Hero ─── */
export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center pt-16 overflow-hidden mesh-bg"
    >
      {/* Dot grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-50 pointer-events-none" />

      {/* Top glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 py-20 lg:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* ── Left: Copy ── */}
          <div className="flex flex-col gap-6 text-center lg:text-left items-center lg:items-start">

            {/* Eyebrow badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Badge
                variant="brand"
                icon={<HiSparkles size={12} />}
              >
                AI-Powered Resume & Portfolio Builder
              </Badge>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className="font-heading font-bold text-4xl sm:text-5xl lg:text-6xl xl:text-7xl leading-[1.1] tracking-tight text-balance"
              style={{ color: 'var(--text-primary)' }}
            >
              Build Your{' '}
              <span className="gradient-text">Resume & Portfolio</span>{' '}
              in Minutes
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="text-lg sm:text-xl leading-relaxed max-w-xl"
              style={{ color: 'var(--text-secondary)' }}
            >
              Create ATS-friendly resumes and beautiful portfolio websites from one platform.
              Edit once — both update automatically.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <Button
                variant="primary"
                size="xl"
                rightIcon={<HiArrowRight size={20} />}
                className="shadow-[0_0_30px_rgba(99,102,241,0.35)]"
                onClick={() => navigate('/login')}
              >
                Start Building Free
              </Button>
              <Button
                variant="secondary"
                size="xl"
                leftIcon={<HiPlay size={18} />}
                onClick={() => document.querySelector('#templates')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Explore Templates
              </Button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-6 flex-wrap justify-center lg:justify-start"
            >
              {STATS.map((s) => (
                <div key={s.label} className="text-center lg:text-left">
                  <div className="font-heading font-bold text-2xl gradient-text">{s.value}</div>
                  <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{s.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Feature pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
              className="flex flex-wrap gap-2 justify-center lg:justify-start"
            >
              {[
                { icon: <HiCheckCircle size={14} />, text: 'ATS Optimized' },
                { icon: <HiDocumentText size={14} />, text: 'PDF Download' },
                { icon: <HiGlobeAlt size={14} />, text: 'Live Portfolio URL' },
                { icon: <HiChip size={14} />, text: 'AI Powered' },
              ].map((p) => (
                <span
                  key={p.text}
                  className="flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg"
                  style={{
                    background: 'var(--bg-card)',
                    color: 'var(--text-secondary)',
                    border: '1px solid var(--border)',
                  }}
                >
                  <span className="text-brand-500">{p.icon}</span>
                  {p.text}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── Right: Animated Preview Cards ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="relative flex items-center justify-center h-80 lg:h-[520px]"
          >
            {/* Glow behind cards */}
            <div className="absolute inset-0 bg-linear-to-br from-brand-500/10 via-transparent to-violet-500/10 rounded-3xl" />

            {/* Resume card — left, offset up */}
            <div className="absolute left-0 top-8 lg:top-12 lg:-left-4 z-10">
              <ResumePreviewCard />
            </div>

            {/* Portfolio card — right, offset down */}
            <div className="absolute right-0 bottom-4 lg:bottom-8 lg:-right-4 z-20">
              <PortfolioPreviewCard />
            </div>

            {/* Sync indicator between cards */}
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30
                         w-12 h-12 rounded-2xl bg-linear-to-br from-brand-500 to-violet-500
                         flex items-center justify-center shadow-[0_0_30px_rgba(99,102,241,0.5)]"
            >
              <HiChip size={22} className="text-white" />
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom scroll cue */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
      >
        <div className="w-px h-8 bg-linear-to-b from-transparent to-brand-500" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-500" />
      </motion.div>
    </section>
  )
}