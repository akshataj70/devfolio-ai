import { useEffect, useRef, useState } from 'react';
import { useResumeStore } from '../stores/useResumeStore';

const LEGACY_STORAGE_KEY = 'devfolio_resume_draft';
const SAVED_INDICATOR_MS = 800;

/**
 * Lightweight save-status hook.
 * Persistence is handled solely by Zustand persist (devfolio-resume-storage).
 */
export const useAutoSave = () => {
  const [isSaving, setIsSaving] = useState(false);
  const timeoutRef = useRef(null);

  const isDirty = useResumeStore((state) => state.metadata.isDirty);
  const markSaved = useResumeStore((state) => state.markSaved);
  const resumeData = useResumeStore((state) => state.resumeData);
  const themeSettings = useResumeStore((state) => state.themeSettings);

  // Remove legacy duplicate storage key (one-time cleanup)
  useEffect(() => {
    localStorage.removeItem(LEGACY_STORAGE_KEY);
  }, []);

  useEffect(() => {
    if (!isDirty) {
      setIsSaving(false);
      return;
    }

    setIsSaving(true);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(() => {
      markSaved();
      setIsSaving(false);
    }, SAVED_INDICATOR_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [resumeData, themeSettings, isDirty, markSaved]);

  return { isSaving };
};
