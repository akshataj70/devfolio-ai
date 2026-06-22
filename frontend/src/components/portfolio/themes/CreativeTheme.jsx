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

/** ARTISTIC THEME: Split-screen, gradient blobs, rounded */
const TOKENS = {
  style: 'artistic',
  animation: 'scale-bounce',
  bg: '#fdf8f6',
  heroBg: 'linear-gradient(135deg, #fae8ff 0%, #fce7f3 50%, #fde68a 100%)',
  surface: '#ffffff',
  card: '#ffffff',
  border: '#fbcfe8',
  text: '#4c1d95',
  muted: '#7e22ce',
  accent: '#d946ef',
  accentLight: 'rgba(217,70,239,0.1)',
  accentGradient: 'linear-gradient(135deg, #8b5cf6, #ec4899)',
  displayFont: "'Inter', system-ui, sans-serif",
  cardRadius: '40px 12px 40px 12px',
  shadow: '0 20px 60px -12px rgba(217,70,239,0.15)',
  borderWidth: '2px',
};

const CreativeTheme = memo(({ data, visibleSections, animate, isExport }) => {
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

CreativeTheme.displayName = 'CreativeTheme';
export default CreativeTheme;