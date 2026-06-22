/**
 * Canonical resume data helpers and normalizers.
 * All templates and PDF import paths should use these accessors.
 */

const newId = () => crypto.randomUUID();

// ─── Field accessors ─────────────────────────────────────────

export function getFullName(data) {
  const p = data?.personal || {};
  return `${p.firstName || ''} ${p.lastName || ''}`.trim();
}

export function getSummary(data) {
  return data?.personal?.summary || '';
}

export function getSkillName(skill) {
  if (!skill) return '';
  if (typeof skill === 'string') return skill;
  return skill.name || '';
}

export function getLanguageLabel(lang) {
  if (!lang) return '';
  if (typeof lang === 'string') return lang;
  const name = lang.name || '';
  const proficiency = lang.proficiency;
  return proficiency ? `${name} (${proficiency})` : name;
}

export function getProjectName(project) {
  if (!project) return '';
  if (typeof project === 'string') return project;
  return project.name || '';
}

export function getCertificationLabel(cert) {
  if (!cert) return '';
  if (typeof cert === 'string') return cert;
  return cert.name || '';
}

// ─── List item normalizers ───────────────────────────────────

const normalizeSkill = (skill) => {
  if (typeof skill === 'string') {
    return { id: newId(), name: skill, level: '' };
  }
  return {
    id: skill?.id || newId(),
    name: skill?.name || '',
    level: skill?.level || '',
  };
};

const normalizeLanguage = (lang) => {
  if (typeof lang === 'string') {
    return { id: newId(), name: lang, proficiency: '' };
  }
  return {
    id: lang?.id || newId(),
    name: lang?.name || '',
    proficiency: lang?.proficiency || '',
  };
};

const normalizeProject = (project) => {
  if (typeof project === 'string') {
    return { id: newId(), name: project, description: '' };
  }
  return {
    id: project?.id || newId(),
    name: project?.name || '',
    description: project?.description || '',
    ...(project?.date != null && { date: project.date }),
    ...(project?.techStack != null && { techStack: project.techStack }),
    ...(project?.github != null && { github: project.github }),
    ...(project?.liveDemo != null && { liveDemo: project.liveDemo }),
  };
};

const normalizeCertification = (cert) => {
  if (typeof cert === 'string') {
    return { id: newId(), name: cert, issuer: '', date: '' };
  }
  return {
    id: cert?.id || newId(),
    name: cert?.name || '',
    issuer: cert?.issuer || '',
    date: cert?.date || '',
    ...(cert?.credentialId != null && { credentialId: cert.credentialId }),
    ...(cert?.url != null && { url: cert.url }),
  };
};

const normalizeExperience = (exp) => {
  if (typeof exp === 'string') {
    return {
      id: newId(),
      role: exp,
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
    };
  }
  return {
    id: exp?.id || newId(),
    role: exp?.role || '',
    company: exp?.company || '',
    location: exp?.location || '',
    startDate: exp?.startDate || '',
    endDate: exp?.endDate || '',
    current: Boolean(exp?.current),
    description: exp?.description || '',
  };
};

const normalizeEducation = (edu) => {
  if (typeof edu === 'string') {
    return {
      id: newId(),
      degree: edu,
      institution: '',
      startDate: '',
      endDate: '',
      gpa: '',
    };
  }
  return {
    id: edu?.id || newId(),
    degree: edu?.degree || '',
    institution: edu?.institution || '',
    startDate: edu?.startDate || '',
    endDate: edu?.endDate || '',
    gpa: edu?.gpa || '',
  };
};

const normalizePersonal = (personal = {}) => ({
  firstName: personal.firstName || '',
  lastName: personal.lastName || '',
  email: personal.email || '',
  phone: personal.phone || '',
  location: personal.location || '',
  title: personal.title || '',
  summary: personal.summary || '',
  photo: personal.photo || '',
  linkedin: personal.linkedin || '',
  github: personal.github || '',
  website: personal.website || '',
});

// ─── Public normalizers ──────────────────────────────────────

/**
 * Normalize flat PDF parser output into Zustand-compatible resume sections.
 */
export function normalizeExtractedPdfData(extracted = {}) {
  return {
    personal: normalizePersonal({
      firstName: extracted.firstName,
      lastName: extracted.lastName,
      email: extracted.email,
      phone: extracted.phone,
      location: extracted.location,
      title: extracted.title,
      summary: extracted.summary,
      linkedin: extracted.linkedin,
      github: extracted.github,
      website: extracted.website,
    }),
    skills: (extracted.skills || []).map(normalizeSkill),
    experience: (extracted.experience || []).map(normalizeExperience),
    education: (extracted.education || []).map(normalizeEducation),
    projects: (extracted.projects || []).map(normalizeProject),
    certifications: (extracted.certifications || []).map(normalizeCertification),
    languages: (extracted.languages || []).map(normalizeLanguage),
  };
}

/**
 * Normalize full or partial resume data into the canonical store shape.
 * Detects flat parser output (top-level firstName) vs nested store data.
 */
export function normalizeResumeData(data = {}) {
  if (data.firstName != null && data.personal == null) {
    return normalizeExtractedPdfData(data);
  }

  return {
    personal: normalizePersonal(data.personal),
    experience: (data.experience || []).map(normalizeExperience),
    education: (data.education || []).map(normalizeEducation),
    skills: (data.skills || []).map(normalizeSkill),
    projects: (data.projects || []).map(normalizeProject),
    certifications: (data.certifications || []).map(normalizeCertification),
    languages: (data.languages || []).map(normalizeLanguage),
    achievements: data.achievements || [],
    interests: data.interests || [],
    social: data.social || { linkedin: '', github: '', twitter: '', website: '' },
  };
}
