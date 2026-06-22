import { motion, AnimatePresence } from 'framer-motion';

import PersonalInfoForm from './forms/PersonalInfoForm';
// SocialLinksForm is no longer imported
import ExperienceForm from './forms/ExperienceForm';
import EducationForm from './forms/EducationForm';
import SkillsForm from './forms/SkillsForm';
import ProjectsForm from './forms/ProjectsForm';
import CertificationsForm from './forms/CertificationsForm';
import AchievementsForm from './forms/AchievementsForm';
import LanguagesForm from './forms/LanguagesForm';
import InterestsForm from './forms/InterestsForm';

const ResumeForm = ({ step }) => {
  const renderStep = () => {
    switch (step) {
      case 'personal':
        return <PersonalInfoForm />;
      // case 'social' removed entirely
      case 'experience':
        return <ExperienceForm />;
      case 'education':
        return <EducationForm />;
      case 'skills':
        return <SkillsForm />;
      case 'projects':
        return <ProjectsForm />;
      case 'certifications':
        return <CertificationsForm />;
      case 'achievements':
        return <AchievementsForm />;
      case 'languages':
        return <LanguagesForm />;
      case 'interests':
        return <InterestsForm />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default ResumeForm;