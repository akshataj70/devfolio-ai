import { motion } from 'framer-motion'
import {
  HiOutlineSquares2X2,
  HiOutlinePencilSquare,
  HiOutlinePaintBrush,
  HiOutlineRocketLaunch,
} from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'

const STEPS = [
  {
    number: '01',
    icon: HiOutlineSquares2X2,
    color: 'from-brand-500 to-brand-600',
    glow: 'rgba(99,102,241,0.3)',
    title: 'Choose a Template',
    description:
      'Browse 50+ beautiful resume and portfolio templates. Pick the one that matches your style and target industry.',
  },
  {
    number: '02',
    icon: HiOutlinePencilSquare,
    color: 'from-violet-500 to-violet-600',
    glow: 'rgba(139,92,246,0.3)',
    title: 'Fill Your Information',
    description:
      'Add your experience, skills, projects, and education. Or upload an existing PDF and let AI extract everything automatically.',
  },
  {
    number: '03',
    icon: HiOutlinePaintBrush,
    color: 'from-cyan-500 to-cyan-600',
    glow: 'rgba(6,182,212,0.3)',
    title: 'Customize Your Design',
    description:
      'Adjust colors, fonts, layouts, and spacing. Preview changes in real time. Make it uniquely yours in seconds.',
  },
  {
    number: '04',
    icon: HiOutlineRocketLaunch,
    color: 'from-emerald-500 to-teal-500',
    glow: 'rgba(16,185,129,0.3)',
    title: 'Download & Publish',
    description:
      'Export your ATS-optimized resume as PDF. Publish your portfolio to a live URL — devfolio.ai/yourname — with one click.',
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 lg:py-32 relative overflow-hidden" style={{ background: 'var(--bg-secondary)' }}>
      {/* Section dividers */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-500/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-500/20 to-transparent" />

      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-20 left-1/4 w-96 h-96 bg-brand-500/6 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-500/6 rounded-full blur-3xl" />
      </div>

      <div className="section-container relative z-10">
        <SectionHeading
          eyebrow="How It Works"
          title={
            <>
              From Zero to{' '}
              <span className="gradient-text">Published</span>{' '}
              in 4 Steps
            </>
          }
          subtitle="No design skills required. Devfolio AI guides you step by step to create a resume and portfolio that gets results."
          align="center"
          className="mb-16 lg:mb-20"
        />

        {/* Steps — desktop: horizontal row, mobile: vertical stack */}
        <div className="relative">

          {/* Connector line — desktop only */}
          <div className="hidden lg:block absolute top-12 left-[calc(12.5%+2rem)] right-[calc(12.5%+2rem)] h-px bg-linear-to-r from-brand-500/30 via-violet-500/30 to-emerald-500/30" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {STEPS.map((step, i) => {
              const Icon = step.icon
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] }}
                  className="flex flex-col items-center text-center gap-4"
                >
                  {/* Step circle */}
                  <div className="relative">
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className={`w-16 h-16 rounded-2xl bg-linear-to-br ${step.color} flex items-center justify-center`}
                      style={{ boxShadow: `0 12px 30px ${step.glow}` }}
                    >
                      <Icon size={28} className="text-white" />
                    </motion.div>

                    {/* Step number badge */}
                    <div
                      className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold text-white shadow-lg"
                      style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}
                    >
                      {i + 1}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-col gap-2">
                    <h3
                      className="font-heading font-semibold text-lg"
                      style={{ color: 'var(--text-primary)' }}
                    >
                      {step.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed max-w-[200px] mx-auto"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
            Join 10,000+ professionals already using Devfolio AI
          </p>
          <motion.a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })
            }}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl font-semibold text-white text-base
                       bg-linear-to-r from-brand-500 to-violet-500
                       hover:from-brand-600 hover:to-violet-600
                       shadow-[0_0_30px_rgba(99,102,241,0.35)]
                       transition-all duration-200"
          >
            Get Started Free →
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}
