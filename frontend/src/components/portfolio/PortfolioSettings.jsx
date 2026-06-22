import { memo } from 'react';
import { useResumeStore } from '../../stores/useResumeStore';

const SECTIONS = [
  { id: 'hero',           label: 'Hero',           icon: '🏠' },
  { id: 'about',          label: 'About',          icon: '👤' },
  { id: 'skills',         label: 'Skills',         icon: '⚡' },
  { id: 'experience',     label: 'Experience',     icon: '💼' },
  { id: 'projects',       label: 'Projects',       icon: '🚀' },
  { id: 'education',      label: 'Education',      icon: '🎓' },
  { id: 'certifications', label: 'Certifications', icon: '🏆' },
  { id: 'languages',      label: 'Languages',      icon: '🌐' },
];

const Toggle = ({ checked, onChange }) => (
  <button
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors duration-200 focus:outline-none flex-shrink-0 ${
      checked ? 'bg-blue-500' : 'bg-gray-300 dark:bg-gray-600'
    }`}
  >
    <span
      className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white shadow transition-transform duration-200 ${
        checked ? 'translate-x-4' : 'translate-x-1'
      }`}
    />
  </button>
);

const PortfolioSettings = memo(() => {
  const portfolioSettings  = useResumeStore((s) => s.portfolioSettings);
  const toggleSection      = useResumeStore((s) => s.togglePortfolioSection);
  const updatePortfolio    = useResumeStore((s) => s.updatePortfolioSettings);

  const vis = portfolioSettings?.visibleSections || {};

  return (
    <div className="space-y-1">
      {/* Section visibility */}
      {SECTIONS.map(({ id, label, icon }) => (
        <div
          key={id}
          className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
        >
          <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-base">{icon}</span>
            {label}
          </span>
          <Toggle
            checked={vis[id] !== false}
            onChange={() => toggleSection(id)}
          />
        </div>
      ))}

      {/* Divider */}
      <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3">
        <div className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
          <span className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <span className="text-base">✨</span>
            Animations
          </span>
          <Toggle
            checked={portfolioSettings?.animations !== false}
            onChange={() => updatePortfolio({ animations: !portfolioSettings?.animations })}
          />
        </div>
      </div>
    </div>
  );
});

PortfolioSettings.displayName = 'PortfolioSettings';
export default PortfolioSettings;