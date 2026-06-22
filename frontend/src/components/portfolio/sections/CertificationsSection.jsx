import { memo } from 'react';
import { motion } from 'framer-motion';
import { FiAward } from 'react-icons/fi';
import { SectionTitle } from './AboutSection';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};
const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const formatDate = (d) => {
  if (!d) return '';
  const [year, month] = d.split('-');
  if (!month) return year;
  const months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  return `${months[parseInt(month, 10) - 1]} ${year}`;
};

const CertificationsSection = memo(({ data, tokens, animate = true }) => {
  const certifications = data?.certifications;
  if (!certifications?.length) return null;

  const Container = animate ? motion.div : 'div';
  const Card      = animate ? motion.div : 'div';

  return (
    <section
      className="max-w-5xl mx-auto px-6 py-16"
      style={{ borderTop: `1px solid ${tokens.border}` }}
    >
      <SectionTitle label="Certifications" tokens={tokens} />
      <Container
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3"
        variants={animate ? containerVariants : undefined}
        initial={animate ? 'hidden' : undefined}
        whileInView={animate ? 'visible' : undefined}
        viewport={{ once: true, margin: '-30px' }}
      >
        {certifications.map((cert, i) => (
          <Card
            key={cert.id || i}
            variants={animate ? cardVariants : undefined}
            whileHover={animate ? { y: -2, transition: { duration: 0.15 } } : undefined}
            className="flex items-start gap-3 rounded-xl p-4"
            style={{ background: tokens.card, border: `1px solid ${tokens.border}` }}
          >
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
              style={{ background: tokens.accentLight }}
            >
              <FiAward size={16} style={{ color: tokens.accent }} />
            </div>
            <div>
              <h3 className="font-medium text-sm leading-tight" style={{ color: tokens.text }}>
                {cert.name}
              </h3>
              <p className="text-xs mt-1" style={{ color: tokens.muted }}>
                {cert.issuer}{cert.date ? ` · ${formatDate(cert.date)}` : ''}
              </p>
            </div>
          </Card>
        ))}
      </Container>
    </section>
  );
});

CertificationsSection.displayName = 'CertificationsSection';
export default CertificationsSection;
