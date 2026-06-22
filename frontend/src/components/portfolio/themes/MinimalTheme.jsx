import { memo } from 'react';
import HeroSection from '../sections/HeroSection';
import AboutSection from '../sections/AboutSection';
import SkillsSection from '../sections/SkillsSection';
import ExperienceSection from '../sections/ExperienceSection';
import ProjectsSection from '../sections/ProjectsSection';
import EducationSection from '../sections/EducationSection';
import CertificationsSection from '../sections/CertificationsSection';
import LanguagesSection from '../sections/LanguagesSection';
import FooterSection from '../sections/FooterSection';

/** EDITORIAL THEME: Centered, large typography, airy */
const TOKENS = {
  style: 'editorial',
  animation: 'slide-left',
  bg: '#ffffff',
  heroBg: '#fafafa',
  surface: '#ffffff',
  card: '#ffffff',
  border: '#e5e7eb',
  text: '#111827',
  muted: '#6b7280',
  accent: '#3b82f6',
  accentLight: 'rgba(59,130,246,0.05)',
  accentGradient: 'linear-gradient(135deg, #2563eb, #3b82f6)',
  displayFont: "'Inter', system-ui, sans-serif",
  cardRadius: '0px',
  shadow: '0 1px 2px rgba(0,0,0,0.02)',
  borderWidth: '1px',
};

const MinimalTheme = memo(({ data, visibleSections, animate, isExport }) => {
  const show = {
    hero: visibleSections?.hero !== false,
    about: visibleSections?.about !== false,
    skills: visibleSections?.skills !== false,
    experience: visibleSections?.experience !== false,
    projects: visibleSections?.projects !== false,
    education: visibleSections?.education !== false,
    certifications: visibleSections?.certifications !== false,
    languages: visibleSections?.languages !== false,
  };

  const wrapAnimate = (element, key) => {
    if (!animate) return element;
    return (
      <div key={key} className="animate-on-scroll">
        {element}
      </div>
    );
  };

  const sectionAnimate = isExport ? false : animate;

  return (
    <div style={{ background: TOKENS.bg, minHeight: '100%', fontFamily: TOKENS.displayFont, color: TOKENS.text }}>
      {show.hero && wrapAnimate(<HeroSection data={data} tokens={TOKENS} animate={sectionAnimate} />, 'hero')}
      {show.about && wrapAnimate(<AboutSection data={data} tokens={TOKENS} animate={sectionAnimate} />, 'about')}
      {show.skills && wrapAnimate(<SkillsSection data={data} tokens={TOKENS} animate={sectionAnimate} />, 'skills')}
      {show.experience && wrapAnimate(<ExperienceSection data={data} tokens={TOKENS} animate={sectionAnimate} />, 'experience')}
      {show.projects && wrapAnimate(<ProjectsSection data={data} tokens={TOKENS} animate={sectionAnimate} />, 'projects')}
      {show.education && wrapAnimate(<EducationSection data={data} tokens={TOKENS} animate={sectionAnimate} />, 'education')}
      {show.certifications && wrapAnimate(<CertificationsSection data={data} tokens={TOKENS} animate={sectionAnimate} />, 'certifications')}
      {show.languages && wrapAnimate(<LanguagesSection data={data} tokens={TOKENS} animate={sectionAnimate} />, 'languages')}
      <FooterSection data={data} tokens={TOKENS} />
    </div>
  );
});

MinimalTheme.displayName = 'MinimalTheme';
export default MinimalTheme;