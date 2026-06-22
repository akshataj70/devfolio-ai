/**
 * ATS (Applicant Tracking System) Score Calculator
 * Evaluates how well a resume will perform with ATS
 */

export const calculateATSScore = (resumeData) => {
  let score = 0;
  const details = [];

  // 1. Check if all required fields are present
  const requiredFields = ['firstName', 'lastName', 'email', 'phone'];
  const hasRequiredFields = requiredFields.every(field => 
    resumeData.personal?.[field]?.trim()
  );
  
  if (hasRequiredFields) {
    score += 20;
    details.push({ 
      category: 'Contact Information', 
      passed: true, 
      message: 'All required fields filled' 
    });
  } else {
    score += 5;
    details.push({ 
      category: 'Contact Information', 
      passed: false, 
      message: 'Missing required fields' 
    });
  }

  // 2. Check if summary exists
  if (resumeData.personal?.summary?.length > 50) {
    score += 15;
    details.push({ 
      category: 'Professional Summary', 
      passed: true, 
      message: 'Good summary length' 
    });
  } else if (resumeData.personal?.summary?.length > 0) {
    score += 8;
    details.push({ 
      category: 'Professional Summary', 
      passed: false, 
      message: 'Summary is too short' 
    });
  } else {
    details.push({ 
      category: 'Professional Summary', 
      passed: false, 
      message: 'No summary provided' 
    });
  }

  // 3. Check skills
  if (resumeData.skills?.length >= 5) {
    score += 15;
    details.push({ 
      category: 'Skills', 
      passed: true, 
      message: `${resumeData.skills.length} skills listed` 
    });
  } else if (resumeData.skills?.length > 0) {
    score += 8;
    details.push({ 
      category: 'Skills', 
      passed: false, 
      message: 'Only 1-4 skills listed' 
    });
  } else {
    details.push({ 
      category: 'Skills', 
      passed: false, 
      message: 'No skills listed' 
    });
  }

  // 4. Check experience
  const totalExperience = resumeData.experience?.reduce((total, exp) => {
    if (!exp.startDate) return total;
    const start = new Date(exp.startDate);
    if (isNaN(start)) return total;
    const end = exp.current || exp.endDate === 'Present' ? new Date() : new Date(exp.endDate);
    if (isNaN(end)) return total;
    const years = (end - start) / (1000 * 60 * 60 * 24 * 365.25);
    return total + Math.max(0, years);
  }, 0) || 0;

  if (totalExperience >= 3) {
    score += 15;
    details.push({
      category: 'Experience',
      passed: true,
      message: `${Math.round(totalExperience)} years of experience`,
    });
  } else if (totalExperience > 0) {
    score += 8;
    details.push({
      category: 'Experience',
      passed: false,
      message: 'Less than 3 years of experience',
    });
  } else if (resumeData.experience?.length > 0) {
    score += 5;
    details.push({
      category: 'Experience',
      passed: false,
      message: 'Experience added but dates missing',
    });
  } else {
    details.push({
      category: 'Experience',
      passed: false,
      message: 'No experience listed',
    });
  }

  // 5. Check education
  if (resumeData.education?.length >= 1) {
    score += 15;
    const edCount = resumeData.education.length;
    details.push({
      category: 'Education',
      passed: true,
      message: `${edCount} education ${edCount === 1 ? 'entry' : 'entries'} listed`,
    });
  } else {
    details.push({
      category: 'Education',
      passed: false,
      message: 'No education listed',
    });
  }

  // 6. Check projects
  if (resumeData.projects?.length >= 2) {
    score += 10;
    details.push({ 
      category: 'Projects', 
      passed: true, 
      message: `${resumeData.projects.length} projects listed` 
    });
  } else if (resumeData.projects?.length > 0) {
    score += 5;
    details.push({ 
      category: 'Projects', 
      passed: false, 
      message: 'Only 1 project listed' 
    });
  } else {
    details.push({ 
      category: 'Projects', 
      passed: false, 
      message: 'No projects listed' 
    });
  }

  // 7. Check certifications
  if (resumeData.certifications?.length >= 1) {
    score += 10;
    details.push({ 
      category: 'Certifications', 
      passed: true, 
      message: `${resumeData.certifications.length} certifications` 
    });
  } else {
    details.push({ 
      category: 'Certifications', 
      passed: false, 
      message: 'No certifications listed' 
    });
  }

  return {
    score: Math.min(100, Math.round(score)),
    details,
    rating: score >= 80 ? 'Excellent' : score >= 60 ? 'Good' : score >= 40 ? 'Fair' : 'Needs Improvement',
  };
};

// Get ATS rating color
export const getATSRatingColor = (score) => {
  if (score >= 80) return 'text-emerald-600 dark:text-emerald-400';
  if (score >= 60) return 'text-blue-600 dark:text-blue-400';
  if (score >= 40) return 'text-amber-600 dark:text-amber-400';
  return 'text-red-600 dark:text-red-400';
};

// Get ATS progress color
export const getATSProgressColor = (score) => {
  if (score >= 80) return 'bg-emerald-500';
  if (score >= 60) return 'bg-blue-500';
  if (score >= 40) return 'bg-amber-500';
  return 'bg-red-500';
};