import { motion } from 'framer-motion'
import {
  HiOutlineDocumentText,
  HiOutlineGlobeAlt,
  HiOutlineArrowPathRoundedSquare,
  HiOutlineEye,
  HiOutlinePaintBrush,
  HiOutlineShare,
} from 'react-icons/hi2'
import SectionHeading from '../ui/SectionHeading'
import AnimatedCard from '../ui/AnimatedCard'

const FEATURES = [
  {
    icon: HiOutlineDocumentText,
    color: 'from-brand-500 to-brand-600',
    glow: 'rgba(99,102,241,0.3)',
    title: 'ATS-Friendly Resumes',
    description:
      'Generate resumes that pass Applicant Tracking Systems. Our AI ensures every keyword and format is optimized for maximum recruiter visibility.',
  },
  {
    icon: HiOutlineGlobeAlt,
    color: 'from-violet-500 to-violet-600',
    glow: 'rgba(139,92,246,0.3)',
    title: 'Portfolio Website Generator',
    description:
      'Transform your resume data into a stunning portfolio website instantly. Multiple themes inspired by Vercel, Framer, and Notion.',
  },
  {
    icon: HiOutlineArrowPathRoundedSquare,
    color: 'from-cyan-500 to-cyan-600',
    glow: 'rgba(6,182,212,0.3)',
    title: 'One-Click Sync',
    description:
      'Edit your skills, projects, or experience once — your resume and portfolio update automatically. Zero duplication.',
  },
  {
    icon: HiOutlineEye,
    color: 'from-emerald-500 to-emerald-600',
    glow: 'rgba(16,185,129,0.3)',
    title: 'Real-Time Live Preview',
    description:
      'See every change reflected instantly in your resume and portfolio preview. What you see is exactly what gets exported.',
  },
  {
    icon: HiOutlinePaintBrush,
    color: 'from-rose-500 to-rose-600',
    glow: 'rgba(244,63,94,0.3)',
    title: '50+ Premium Templates',
    description:
      'Choose from a curated library of resume and portfolio templates. Customize colors, fonts, spacing, and layouts to match your brand.',
  },
  {
    icon: HiOutlineShare,
    color: 'from-amber-500 to-orange-500',
    glow: 'rgba(245,158,11,0.3)',
    title: 'Download & Share URLs',
    description:
      'Export your resume as PDF or your portfolio as HTML/ZIP. Share a live URL like devfolio.ai/yourname with one click.',
  },
]

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 relative overflow-hidden">
      {/* BG decoration */}
      <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-brand-500/30 to-transparent" />
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container">
        <SectionHeading
          eyebrow="Platform Features"
          title={
            <>
              Everything You Need to{' '}
              <span className="gradient-text">Stand Out</span>
            </>
          }
          subtitle="Devfolio AI combines the best resume builder and portfolio website generator in one seamless platform."
          align="center"
          className="mb-16"
        />

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon
            return (
              <AnimatedCard
                key={feature.title}
                delay={i * 0.08}
                glowOnHover
                className="flex flex-col gap-4 group"
              >
                {/* Icon */}
                <div
                  className={`w-12 h-12 rounded-2xl bg-linear-to-br ${feature.color} flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110`}
                  style={{ boxShadow: `0 8px 20px ${feature.glow}` }}
                >
                  <Icon size={22} className="text-white" />
                </div>

                {/* Content */}
                <div className="flex flex-col gap-2">
                  <h3
                    className="font-heading font-semibold text-lg leading-snug"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {feature.title}
                  </h3>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Bottom accent line */}
                <div
                  className={`mt-auto h-0.5 w-0 group-hover:w-full bg-linear-to-r ${feature.color} rounded-full transition-all duration-500`}
                />
              </AnimatedCard>
            )
          })}
        </div>
      </div>
    </section>
  )
}
