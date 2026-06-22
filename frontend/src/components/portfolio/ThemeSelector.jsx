import { memo } from 'react';
import { motion } from 'framer-motion';

const THEMES = [
  {
    id: 'developer',
    name: 'Developer',
    description: 'Vercel-inspired dark',
    preview: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 60%, #6366f1 100%)',
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Notion-inspired clean',
    preview: 'linear-gradient(135deg, #ffffff 0%, #f1f5f9 60%, #334155 100%)',
  },
  {
    id: 'creative',
    name: 'Creative',
    description: 'Framer-inspired vibrant',
    preview: 'linear-gradient(135deg, #1e0a3c 0%, #7c3aed 50%, #ec4899 100%)',
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Stripe-inspired premium',
    preview: 'linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #06b6d4 100%)',
  },
];

const ThemeSelector = memo(({ selected, onSelect }) => (
  <div className="space-y-2">
    {THEMES.map((theme) => {
      const isActive = selected === theme.id;
      return (
        <motion.button
          key={theme.id}
          onClick={() => onSelect(theme.id)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`
            w-full flex items-center gap-3 p-2.5 rounded-xl border-2 transition-all text-left
            ${isActive
              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
              : 'border-transparent hover:border-gray-200 dark:hover:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700/50'
            }
          `}
        >
          {/* Mini preview swatch */}
          <div
            className="w-9 h-9 rounded-lg flex-shrink-0 shadow-sm"
            style={{ background: theme.preview }}
          />
          <div className="min-w-0">
            <p className={`text-sm font-medium leading-tight ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-gray-800 dark:text-gray-200'}`}>
              {theme.name}
            </p>
            <p className="text-xs text-gray-400 dark:text-gray-500 truncate">{theme.description}</p>
          </div>
          {isActive && (
            <span className="ml-auto text-blue-500 flex-shrink-0 text-xs font-bold">✓</span>
          )}
        </motion.button>
      );
    })}
  </div>
));

ThemeSelector.displayName = 'ThemeSelector';
export default ThemeSelector;