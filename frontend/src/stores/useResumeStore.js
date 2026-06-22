import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { INITIAL_RESUME_DATA, INITIAL_THEME_SETTINGS } from '../utils/constants';

// ─── Default Portfolio Settings ───────────────────────────────────────────────
export const INITIAL_PORTFOLIO_SETTINGS = {
  theme: 'developer',
  accentColor: '#6366f1',
  animations: true,
  visibleSections: {
    hero: true,
    about: true,
    skills: true,
    experience: true,
    projects: true,
    education: true,
    certifications: true,
    languages: true,
  },
};

export const useResumeStore = create(
  persist(
    (set, get) => ({
      resumeData: INITIAL_RESUME_DATA,
      themeSettings: INITIAL_THEME_SETTINGS,
      portfolioSettings: INITIAL_PORTFOLIO_SETTINGS,
      metadata: {
        title: 'Untitled Resume',
        lastSaved: null,
        isDirty: false,
        id: null,
      },

      // ─── PERSONAL ───
      updatePersonal: (data) =>
        set((state) => ({
          resumeData: { ...state.resumeData, personal: { ...state.resumeData.personal, ...data } },
          metadata: { ...state.metadata, isDirty: true },
        })),

      // ─── SECTION ───
      updateSection: (sectionId, data) =>
        set((state) => ({
          resumeData: { ...state.resumeData, [sectionId]: data },
          metadata: { ...state.metadata, isDirty: true },
        })),

      // ─── LIST ITEMS ───
      addListItem: (sectionId, item) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            [sectionId]: [...state.resumeData[sectionId], { id: crypto.randomUUID(), ...item }],
          },
          metadata: { ...state.metadata, isDirty: true },
        })),

      updateListItem: (sectionId, id, data) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            [sectionId]: state.resumeData[sectionId].map((item) =>
              item.id === id ? { ...item, ...data } : item
            ),
          },
          metadata: { ...state.metadata, isDirty: true },
        })),

      removeListItem: (sectionId, id) =>
        set((state) => ({
          resumeData: {
            ...state.resumeData,
            [sectionId]: state.resumeData[sectionId].filter((item) => item.id !== id),
          },
          metadata: { ...state.metadata, isDirty: true },
        })),

      reorderList: (sectionId, startIndex, endIndex) =>
        set((state) => {
          const list = [...state.resumeData[sectionId]];
          const [removed] = list.splice(startIndex, 1);
          list.splice(endIndex, 0, removed);
          return {
            resumeData: { ...state.resumeData, [sectionId]: list },
            metadata: { ...state.metadata, isDirty: true },
          };
        }),

      // ─── THEME ───
      updateTheme: (settings) =>
        set((state) => ({
          themeSettings: { ...state.themeSettings, ...settings },
          metadata: { ...state.metadata, isDirty: true },
        })),

      // ─── SECTION ORDER ───
      reorderSections: (startIndex, endIndex) =>
        set((state) => {
          const sections = [...state.themeSettings.sectionOrder];
          const [removed] = sections.splice(startIndex, 1);
          sections.splice(endIndex, 0, removed);
          return {
            themeSettings: { ...state.themeSettings, sectionOrder: sections },
            metadata: { ...state.metadata, isDirty: true },
          };
        }),

      toggleSectionVisibility: (sectionId) =>
        set((state) => {
          const hidden = state.themeSettings.hiddenSections;
          const isHidden = hidden.includes(sectionId);
          return {
            themeSettings: {
              ...state.themeSettings,
              hiddenSections: isHidden
                ? hidden.filter((id) => id !== sectionId)
                : [...hidden, sectionId],
            },
            metadata: { ...state.metadata, isDirty: true },
          };
        }),

      // ─── PORTFOLIO SETTINGS ───
      updatePortfolioSettings: (settings) =>
        set((state) => ({
          portfolioSettings: { ...state.portfolioSettings, ...settings },
        })),

      togglePortfolioSection: (sectionId) =>
        set((state) => {
          const current = state.portfolioSettings.visibleSections;
          return {
            portfolioSettings: {
              ...state.portfolioSettings,
              visibleSections: {
                ...current,
                [sectionId]: !current[sectionId],
              },
            },
          };
        }),

      // ─── METADATA ───
      markSaved: () =>
        set((state) => ({
          metadata: { ...state.metadata, isDirty: false, lastSaved: new Date().toISOString() },
        })),

      setResume: (resume) =>
        set({
          resumeData: resume.resumeData || INITIAL_RESUME_DATA,
          themeSettings: resume.themeSettings || INITIAL_THEME_SETTINGS,
          metadata: {
            title: resume.title || 'Untitled Resume',
            id: resume._id,
            lastSaved: resume.updatedAt,
            isDirty: false
          }
        }),

      setPortfolio: (portfolio) =>
        set({
          resumeData: portfolio.resumeData || INITIAL_RESUME_DATA,
          portfolioSettings: portfolio.portfolioSettings || INITIAL_PORTFOLIO_SETTINGS,
          metadata: {
            title: portfolio.title || 'Untitled Portfolio',
            id: portfolio._id,
            lastSaved: portfolio.updatedAt,
            isDirty: false
          }
        }),

      updateTitle: (title) =>
        set((state) => ({
          metadata: { ...state.metadata, title, isDirty: true }
        })),

      resetResume: () =>
        set({
          resumeData: INITIAL_RESUME_DATA,
          themeSettings: INITIAL_THEME_SETTINGS,
          portfolioSettings: INITIAL_PORTFOLIO_SETTINGS,
          metadata: { title: 'Untitled Resume', lastSaved: null, isDirty: true, id: null },
        }),
    }),
    {
      name: 'devfolio-resume-storage',
    }
  )
);