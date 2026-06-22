import { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import DeveloperTheme    from './themes/DeveloperTheme';
import MinimalTheme      from './themes/MinimalTheme';
import CreativeTheme     from './themes/CreativeTheme';
import ProfessionalTheme from './themes/ProfessionalTheme';

const THEMES = {
  developer:    DeveloperTheme,
  minimal:      MinimalTheme,
  creative:     CreativeTheme,
  professional: ProfessionalTheme,
};

/**
 * PortfolioPreview
 * Thin dispatcher — picks the correct theme component and crossfades on switch.
 * All rendering logic lives in the theme → section components.
 */
const PortfolioPreview = memo(({ data, portfolioSettings }) => {
  const theme          = portfolioSettings?.theme || 'developer';
  const visibleSections = portfolioSettings?.visibleSections ?? {
    hero: true, about: true, skills: true, experience: true,
    projects: true, education: true, certifications: true, languages: true,
  };
  const animate =false;

  const ThemeComponent = THEMES[theme] || THEMES.developer;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={theme}
        id="portfolio-root-preview"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.35, ease: 'easeInOut' }}
        className="min-h-full"
        style={{ opacity: 1 }} 
      >
        <ThemeComponent
          data={data}
          visibleSections={visibleSections}
          animate={animate}
        />
      </motion.div>
    </AnimatePresence>
  );
});

PortfolioPreview.displayName = 'PortfolioPreview';
export default PortfolioPreview;