// ─── TEMPLATES ───
export const TEMPLATES = [
  { id: 'customer', name: 'Customer Service', category: 'professional' },
  { id: 'sherlockholmes', name: 'Sherlock Holmes', category: 'classic' },
  { id: 'freight', name: 'Freight Analyst', category: 'professional' },
  { id: 'tiffany', name: 'Tiffany', category: 'professional' },
];

// ─── COLORS ───
export const COLORS = [
  { id: 'blue', value: '#3b82f6', label: 'Blue' },
  { id: 'indigo', value: '#6366f1', label: 'Indigo' },
  { id: 'purple', value: '#8b5cf6', label: 'Purple' },
  { id: 'rose', value: '#f43f5e', label: 'Rose' },
  { id: 'emerald', value: '#10b981', label: 'Emerald' },
  { id: 'slate', value: '#64748b', label: 'Slate' },
  { id: 'amber', value: '#f59e0b', label: 'Amber' },
  { id: 'cyan', value: '#06b6d4', label: 'Cyan' },
];

// ─── FONTS ───
export const FONTS = [
  { id: 'inter', name: 'Inter', class: 'font-sans' },
  { id: 'poppins', name: 'Poppins', class: 'font-heading' },
  { id: 'roboto', name: 'Roboto', class: 'font-sans' },
  { id: 'merriweather', name: 'Merriweather', class: 'font-serif' },
];

// ─── SPACING ───
export const SPACING = [
  { id: 'compact', name: 'Compact', class: 'leading-tight' },
  { id: 'normal', name: 'Normal', class: 'leading-normal' },
  { id: 'relaxed', name: 'Relaxed', class: 'leading-loose' },
];

// ─── INITIAL EMPTY RESUME DATA ───
export const INITIAL_RESUME_DATA = {
  personal: {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    title: '',
    summary: '',
    photo: '',
    linkedin: '',
    github: '',
    website: '',
    twitter: '',
    portfolio: '',
  },
  experience: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  achievements: [],
  languages: [],
  interests: [],
};

// ─── INITIAL THEME SETTINGS ───
export const INITIAL_THEME_SETTINGS = {
  templateId: 'customer',
  accentColor: '#6366f1',
  fontFamily: 'inter',
  spacing: 'normal',
  showPhoto: true,
  sectionOrder: [
    'personal',
    'summary',
    'experience',
    'education',
    'skills',
    'projects',
    'certifications',
    'achievements',
    'languages',
    'interests',
  ],
  hiddenSections: [],
};