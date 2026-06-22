import { memo } from 'react';
import { FiGithub, FiLinkedin, FiGlobe } from 'react-icons/fi';

const FooterSection = memo(({ data, tokens }) => {
  const p = data?.personal || {};
  const year = new Date().getFullYear();
  const fullName = [p.firstName, p.lastName].filter(Boolean).join(' ') || 'Portfolio';

  return (
    <footer
      className="max-w-5xl mx-auto px-6 py-12 text-center"
      style={{ borderTop: `1px solid ${tokens.border}` }}
    >
      <div className="flex justify-center gap-6 mb-5">
        {p.github && (
          <a
            href={p.github.startsWith('http') ? p.github : `https://${p.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: tokens.accent }}
          >
            <FiGithub size={16} /> GitHub
          </a>
        )}
        {p.linkedin && (
          <a
            href={p.linkedin.startsWith('http') ? p.linkedin : `https://${p.linkedin}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: tokens.accent }}
          >
            <FiLinkedin size={16} /> LinkedIn
          </a>
        )}
        {p.website && (
          <a
            href={p.website.startsWith('http') ? p.website : `https://${p.website}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-medium hover:opacity-75 transition-opacity"
            style={{ color: tokens.accent }}
          >
            <FiGlobe size={16} /> Website
          </a>
        )}
      </div>
      <p className="text-xs" style={{ color: tokens.muted }}>
        © {year} {fullName} · Built with Devfolio AI
      </p>
    </footer>
  );
});

FooterSection.displayName = 'FooterSection';
export default FooterSection;
