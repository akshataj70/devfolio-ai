import React, { useMemo, useCallback } from 'react';
import { useResumeStore } from '../stores/useResumeStore';
import toast from 'react-hot-toast';
import ReactDOMServer from 'react-dom/server';
import DeveloperTheme from '../components/portfolio/themes/DeveloperTheme';
import MinimalTheme from '../components/portfolio/themes/MinimalTheme';
import CreativeTheme from '../components/portfolio/themes/CreativeTheme';
import ProfessionalTheme from '../components/portfolio/themes/ProfessionalTheme';
import exportStyles from '../components/portfolio/portfolioExportStyles.css?raw';

/**
 * usePortfolio
 * Provides all portfolio-builder state, stats, and actions.
 * All data comes from Zustand — no local state duplication.
 */
export const usePortfolio = () => {
  const resumeData         = useResumeStore((s) => s.resumeData);
  const portfolioSettings  = useResumeStore((s) => s.portfolioSettings);
  const updatePortfolio    = useResumeStore((s) => s.updatePortfolioSettings);
  const toggleSection      = useResumeStore((s) => s.togglePortfolioSection);

  // ─── Derived stats ─────────────────────────────────────────────────────────
  const stats = useMemo(() => ({
    skills:      resumeData.skills?.length ?? 0,
    projects:    resumeData.projects?.length ?? 0,
    experience:  resumeData.experience?.length ?? 0,
    education:   resumeData.education?.length ?? 0,
    certifications: resumeData.certifications?.length ?? 0,
    languages:   resumeData.languages?.length ?? 0,
  }), [resumeData]);

  // ─── Completeness score ────────────────────────────────────────────────────
  const completeness = useMemo(() => {
    const p = resumeData.personal;
    const checks = [
      !!p?.firstName,
      !!p?.lastName,
      !!p?.title,
      !!p?.email,
      !!p?.summary,
      stats.skills > 0,
      stats.experience > 0,
      stats.projects > 0,
      stats.education > 0,
      stats.certifications > 0,
    ];
    return Math.round((checks.filter(Boolean).length / checks.length) * 100);
  }, [resumeData, stats]);

  // ─── handleDownload – matches the selected theme ────────────────────────
  const handleDownload = useCallback(() => {
    const data = resumeData;
    const settings = portfolioSettings;
    const theme = settings?.theme || 'developer';
    const firstName = data?.personal?.firstName || 'Your Name';

    const ThemeComponent = {
      developer: DeveloperTheme,
      minimal: MinimalTheme,
      creative: CreativeTheme,
      professional: ProfessionalTheme,
    }[theme] || DeveloperTheme;

    const visibleSections = settings?.visibleSections ?? {
      hero: true, about: true, skills: true, experience: true,
      projects: true, education: true, certifications: true, languages: true,
    };

    let renderedMarkup = '';
    try {
      renderedMarkup = ReactDOMServer.renderToStaticMarkup(
        <ThemeComponent
          data={data}
          visibleSections={visibleSections}
          animate={true}
          isExport={true}
        />
      );
    } catch (err) {
      console.error('Error rendering theme for static HTML export:', err);
      toast.error('Failed to generate HTML layout.');
      return;
    }

    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${firstName} - Portfolio</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <style>
    ${exportStyles}
  </style>
</head>
<body style="background: ${theme === 'developer' ? '#f4f4f9' : theme === 'minimal' ? '#ffffff' : theme === 'creative' ? '#fdf8f6' : '#f0f9ff'}">
  <div id="portfolio-root">
    ${renderedMarkup}
  </div>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, { threshold: 0.1 });
      document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    });
  </script>
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${firstName}-portfolio.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success(`${theme} portfolio downloaded! 🎨`);
  }, [resumeData, portfolioSettings]);

  // ─── Other actions ──────────────────────────────────────────────────────────
  const handleShare = useCallback(() => {
    const text = window.location.href;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        toast.success('Portfolio link copied to clipboard!');
      });
    } else {
      toast.success('Share: ' + text);
    }
  }, []);

  const handlePublish = useCallback(() => {
    toast('🚀 Publishing coming soon!', {
      icon: '⏳',
      style: { background: '#1e1b4b', color: '#c4b5fd' },
    });
  }, []);

  return {
    resumeData,
    portfolioSettings,
    stats,
    completeness,
    updatePortfolio,
    toggleSection,
    handleDownload,
    handleShare,
    handlePublish,
  };
};
