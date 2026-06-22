import { useState, lazy, Suspense, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';

// Lazy load the resume preview to optimize landing page bundle
const ResumeMiniPreview = lazy(() => import('./ResumeMiniPreview'));

// Import actual portfolio theme components
import DeveloperTheme from '../portfolio/themes/DeveloperTheme';
import MinimalTheme from '../portfolio/themes/MinimalTheme';
import CreativeTheme from '../portfolio/themes/CreativeTheme';
import ProfessionalTheme from '../portfolio/themes/ProfessionalTheme';

const TABS = ['Resume Templates', 'Portfolio Themes'];

// ─── SINGLE SOURCE OF TRUTH MOCK DATA ───
const MOCK_PREVIEW_DATA = {
  personal: {
    firstName: 'Alex',
    lastName: 'Rivera',
    email: 'alex.rivera@devfolio.io',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    title: 'Senior Full Stack Engineer',
    summary: 'Passionate software developer with 6+ years of experience building modern web architectures. Focused on React, Node.js, and cloud ecosystems.',
    photo: '',
    linkedin: 'linkedin.com/in/alex-rivera',
    github: 'github.com/alexrivera',
    website: 'alexrivera.dev',
    portfolio: 'alexrivera.dev',
  },
  experience: [
    {
      id: 'exp1',
      role: 'Lead Frontend Architect',
      company: 'TechSphere Systems',
      location: 'San Francisco, CA',
      startDate: '2022',
      endDate: 'Present',
      description: 'Architected and built a high-performance design system in React, improving developer velocity by 40%.'
    },
    {
      id: 'exp2',
      role: 'Software Engineer II',
      company: 'DataFlow Inc.',
      location: 'Austin, TX',
      startDate: '2020',
      endDate: '2022',
      description: 'Developed scalable real-time monitoring dashboards using Node.js and WebSockets.'
    }
  ],
  education: [
    {
      id: 'edu1',
      degree: 'B.S. in Computer Science',
      institution: 'UC Berkeley',
      startDate: '2016',
      endDate: '2020',
      gpa: '3.85'
    }
  ],
  skills: [
    'React', 'TypeScript', 'Node.js', 'Next.js', 
    'Tailwind CSS', 'GraphQL', 'AWS', 'System Design'
  ],
  projects: [
    {
      id: 'proj1',
      name: 'DevFlow Engine',
      date: '2023',
      description: 'An open-source serverless deployment tool with automated CD pipelines and real-time logs.'
    }
  ],
  certifications: [
    {
      id: 'cert1',
      name: 'AWS Solutions Architect Associate',
      issuer: 'Amazon Web Services',
      date: '2023-08'
    }
  ],
  achievements: [
    'Hackathon Winner (1st place out of 150 teams)'
  ],
  languages: [
    'English (Native)',
    'Spanish (Conversational)'
  ],
  interests: [
    'Open Source Contributing',
    'Photography'
  ]
};

const RESUME_TEMPLATES = [
  {
    id: 'sherlockholmes',
    name: 'Sherlock Holmes',
    tag: 'Classic',
    tagColor: 'bg-amber-500/15 text-amber-700',
    description: 'Two-column classic sidebar style with a structured vertical layout.',
  },
  {
    id: 'tiffany',
    name: 'Tiffany',
    tag: 'Elegant',
    tagColor: 'bg-rose-500/15 text-rose-600',
    description: 'Clean design with centered headers and high-contrast color accents.',
  },
  {
    id: 'customer',
    name: 'Customer Service',
    tag: 'Popular',
    tagColor: 'bg-brand-500/15 text-brand-500',
    description: 'Classic employment history layout focused on roles and experience.',
  },
  {
    id: 'freight',
    name: 'Freight Analyst',
    tag: 'Professional',
    tagColor: 'bg-emerald-500/15 text-emerald-600',
    description: 'Sleek professional layout with structured dividers between sections.',
  },
];

const PORTFOLIO_THEMES = [
  {
    id: 'developer',
    name: 'Developer',
    tag: 'Vercel-inspired',
    tagColor: 'bg-brand-500/15 text-brand-500',
    description: 'Sharp, monospace code-like styling with high-contrast glowing borders.',
    component: DeveloperTheme,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    tag: 'Notion-inspired',
    tagColor: 'bg-slate-500/15 text-slate-600',
    description: 'Airy, content-first layout centered around typography and clean borders.',
    component: MinimalTheme,
  },
  {
    id: 'creative',
    name: 'Creative',
    tag: 'Framer-inspired',
    tagColor: 'bg-violet-500/15 text-violet-600',
    description: 'Bold gradient split-screens, custom cards, and playful typography.',
    component: CreativeTheme,
  },
  {
    id: 'professional',
    name: 'Professional',
    tag: 'Stripe-inspired',
    tagColor: 'bg-teal-500/15 text-teal-600',
    description: 'Polished layout, sleek alignment, and dark navy corporate accents.',
    component: ProfessionalTheme,
  },
];

/* ─── Resume Card Component ─── */
const ResumeCard = memo(({ tpl, index }) => {
  const handleSelect = () => {
    window.location.href = `/resume?template=${tpl.id}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={handleSelect}
      className="group feature-card overflow-hidden cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-shadow duration-300 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500"
    >
      <div className="h-48 w-full relative overflow-hidden bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 flex items-center justify-center p-3 select-none">
        <div className="w-[78%] aspect-[210/297] bg-white shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden rounded relative">
          <Suspense fallback={
            <div className="flex items-center justify-center h-full w-full bg-white dark:bg-gray-800">
              <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            </div>
          }>
            <ResumeMiniPreview templateId={tpl.id} data={MOCK_PREVIEW_DATA} />
          </Suspense>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-brand-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-semibold text-brand-500 bg-white/90 dark:bg-black/90 px-3 py-1.5 rounded-lg shadow-md border border-brand-200 dark:border-brand-900">
            Use Template →
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading font-semibold text-sm text-gray-900 dark:text-white">
            {tpl.name}
          </h3>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${tpl.tagColor}`}>
            {tpl.tag}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {tpl.description}
        </p>
      </div>
    </motion.div>
  );
});

ResumeCard.displayName = 'ResumeCard';

/* ─── Portfolio Card Component ─── */
const PortfolioCard = memo(({ theme, index }) => {
  const handleSelect = () => {
    window.location.href = `/portfolio?theme=${theme.id}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      onClick={handleSelect}
      className="group feature-card overflow-hidden cursor-pointer bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl transition-shadow duration-300 hover:shadow-xl hover:border-blue-400 dark:hover:border-blue-500"
    >
      <div className="h-48 w-full relative overflow-hidden bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
        {/* Browser header */}
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 select-none">
          <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
          <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
          <div className="flex-1 ml-3 h-3 rounded bg-gray-200/50 dark:bg-gray-700/50 text-[7px] flex items-center px-2 text-gray-400 font-sans truncate">
            devfolio.ai/{theme.id}/alex-rivera
          </div>
        </div>

        {/* Scaled portfolio preview */}
        <div
          className="absolute left-0 right-0 overflow-hidden"
          style={{
            top: '25px',
            bottom: 0,
            width: '400%',
            height: '400%',
            transform: 'scale(0.25)',
            transformOrigin: 'top left',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <theme.component
            data={MOCK_PREVIEW_DATA}
            visibleSections={{
              hero: true,
              about: true,
              skills: true,
              experience: true,
              projects: true,
              education: false,
              certifications: false,
              languages: false,
            }}
            animate={false}
          />
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 dark:bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="text-xs font-semibold text-white bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg shadow-md border border-white/10">
            Use Theme →
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4 bg-white dark:bg-gray-800">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading font-semibold text-sm text-gray-900 dark:text-white">
            {theme.name}
          </h3>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${theme.tagColor}`}>
            {theme.tag}
          </span>
        </div>
        <p className="text-xs leading-relaxed text-gray-500 dark:text-gray-400">
          {theme.description}
        </p>
      </div>
    </motion.div>
  );
});

PortfolioCard.displayName = 'PortfolioCard';

/* ─── Main Component ─── */
export default function Templates() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section id="templates" className="py-24 lg:py-32 relative overflow-hidden bg-white dark:bg-gray-950 transition-colors duration-300">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-500/5 rounded-full blur-3xl" />
      </div>

      <div className="section-container max-w-7xl mx-auto px-4">
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
            className="flex p-1 rounded-xl gap-1 bg-gray-100 dark:bg-gray-900"
            style={{ border: '1px solid var(--border)' }}
          >
            {TABS.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={[
                  'relative px-5 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer',
                  activeTab === i
                    ? 'text-white'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white',
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
        <div className="min-h-[480px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {activeTab === 0
                ? RESUME_TEMPLATES.map((t, i) => <ResumeCard key={t.id} tpl={t} index={i} />)
                : PORTFOLIO_THEMES.map((t, i) => <PortfolioCard key={t.id} theme={t} index={i} />)}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 text-center"
        >
          <p className="text-sm text-gray-400 dark:text-gray-500">
            All templates are fully customizable · New templates added weekly
          </p>
        </motion.div>
      </div>
    </section>
  );
}