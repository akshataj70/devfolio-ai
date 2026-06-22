import { memo } from 'react';
import { motion } from 'framer-motion';
import { SectionTitle } from './AboutSection';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};
const itemVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.35 } },
};

const LanguagesSection = memo(({ data, tokens, animate = true }) => {
  const languages = data?.languages;
  if (!languages?.length) return null;

  const Container = animate ? motion.div : 'div';
  const Item      = animate ? motion.div : 'div';

  return (
    <section
      className="max-w-5xl mx-auto px-6 py-16"
      style={{ borderTop: `1px solid ${tokens.border}` }}
    >
      <SectionTitle label="Languages" tokens={tokens} />
      <Container
        className="flex flex-wrap gap-3"
        variants={animate ? containerVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-30px' }}
      >
        {languages.map((lang, i) => {
          const name = typeof lang === 'string' ? lang : (lang.language || '');
          const proficiency = typeof lang === 'string' ? '' : (lang.proficiency || '');
          return (
            <Item
              key={i}
              variants={animate ? itemVariants : undefined}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{ background: tokens.card, border: `1px solid ${tokens.border}` }}
            >
              <span className="font-medium text-sm" style={{ color: tokens.text }}>{name}</span>
              {proficiency && (
                <span
                  className="text-xs px-2 py-0.5 rounded-full"
                  style={{ background: tokens.accentLight, color: tokens.accent }}
                >
                  {proficiency}
                </span>
              )}
            </Item>
          );
        })}
      </Container>
    </section>
  );
});

LanguagesSection.displayName = 'LanguagesSection';
export default LanguagesSection;
