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

/** TECH THEME: Sharp, code-like, glowing purple/orb */
const TOKENS = {
  style: 'tech',
  animation: 'fade-rotate',
  bg: '#f4f4f9',
  heroBg: 'linear-gradient(135deg, #e0e7ff 0%, #ede9fe 100%)',
  surface: '#ffffff',
  card: '#ffffff',
  border: '#c4b5fd',
  text: '#1e1b4b',
  muted: '#4c1d95',
  accent: '#7c3aed',
  accentLight: 'rgba(124,58,237,0.1)',
  accentGradient: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
  displayFont: "'Inter', system-ui, sans-serif",
  cardRadius: '4px',
  shadow: 'none',
  borderWidth: '2px',
};

const DeveloperTheme = memo(({ data, visibleSections, animate, isExport }) => {
  // Force all sections to show if visibleSections is undefined or empty
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

DeveloperTheme.displayName = 'DeveloperTheme';
export default DeveloperTheme;