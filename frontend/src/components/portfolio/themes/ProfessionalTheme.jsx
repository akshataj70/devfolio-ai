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

/** CORPORATE THEME: Timelines, segmented cards, navy */
const TOKENS = {
  style: 'corporate',
  animation: 'fade-glow', 
  bg: '#f0f9ff',
  heroBg: 'linear-gradient(135deg, #e0f2fe 0%, #dbeafe 100%)',
  surface: '#ffffff',
  card: '#ffffff',
  border: '#bfdbfe',
  text: '#1e3a8a',
  muted: '#1e40af',
  accent: '#2563eb',
  accentLight: 'rgba(37,99,235,0.06)',
  accentGradient: 'linear-gradient(135deg, #1e3a8a, #4f46e5)',
  displayFont: "'Inter', system-ui, sans-serif",
  cardRadius: '12px',
  shadow: '0 4px 6px -1px rgba(0,0,0,0.04)',
  borderWidth: '1px',
};

const ProfessionalTheme = memo(({ data, visibleSections, animate, isExport }) => {
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

ProfessionalTheme.displayName = 'ProfessionalTheme';
export default ProfessionalTheme;