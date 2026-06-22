import { useState, useEffect, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FiSave,
  FiShare2,
  FiArrowLeft,
  FiArrowRight,
  FiSettings,
  FiEye,
  FiEyeOff,
  FiList,
  FiMenu,
  FiX,
  FiGlobe,
  FiLogOut,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import ResumeForm from '../components/builder/ResumeForm';
import TemplateSelector from '../components/builder/TemplateSelector';
import ThemeCustomizer from '../components/builder/ThemeCustomizer';
import SectionReorder from '../components/builder/SectionReorder';
import AtsScorePanel from '../components/builder/AtsScorePanel';
import ThemeToggle from '../components/ui/ThemeToggle';
import { useResumeStore } from '../stores/useResumeStore';
import { useAuthStore } from '../stores/useAuthStore';
import { useAutoSave } from '../hooks/useAutoSave';
import { api } from '../services/api';

const A4Page = lazy(() => import('../components/builder/A4Page'));

const STEPS = [
  { id: 'personal', label: 'Personal Info' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'languages', label: 'Languages' },
  { id: 'interests', label: 'Interests' },
];

const ResumeBuilder = () => {
  const navigate = useNavigate();
  const { isSaving } = useAutoSave();
  const { 
    resumeData, 
    themeSettings, 
    metadata, 
    updateTheme, 
    markSaved, 
    setResume, 
    updateTitle, 
    resetResume 
  } = useResumeStore();
  const { logout } = useAuthStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isDbSaving, setIsDbSaving] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(true);
  const [showThemeCustomizer, setShowThemeCustomizer] = useState(false);
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [showSectionReorder, setShowSectionReorder] = useState(false);
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Load resume by ID on mount if present, else reset
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    async function loadResume() {
      if (id) {
        try {
          setIsLoading(true);
          const data = await api.get(`/resumes/${id}`);
          if (data.success && data.resume) {
            setResume(data.resume);
          } else {
            toast.error('Resume not found');
            navigate('/dashboard', { replace: true });
          }
        } catch (err) {
          console.error(err);
          toast.error('Failed to load resume');
          navigate('/dashboard', { replace: true });
        } finally {
          setIsLoading(false);
        }
      } else {
        resetResume();
        setIsLoading(false);
      }
    }

    loadResume();
  }, [setResume, resetResume, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep((prev) => prev + 1);
  };
  const handlePrevious = () => {
    if (currentStep > 0) setCurrentStep((prev) => prev - 1);
  };

  const handleSave = async () => {
    try {
      setIsDbSaving(true);
      const isUpdate = !!metadata.id;
      
      const payload = {
        title: metadata.title || 'Untitled Resume',
        resumeData,
        themeSettings
      };

      if (isUpdate) {
        const res = await api.put(`/resumes/${metadata.id}`, payload);
        if (res.success) {
          markSaved();
          toast.success('Resume updated successfully!');
        }
      } else {
        const res = await api.post('/resumes', payload);
        if (res.success && res.resume) {
          setResume(res.resume);
          navigate(`/resume-builder?id=${res.resume._id}`, { replace: true });
          toast.success('Resume saved to your account!');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save to database');
    } finally {
      setIsDbSaving(false);
    }
  };

  const handleShare = () => {
    toast.success('Share link functionality coming soon!');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading resume builder...</span>
        </div>
      </div>
    );
  }

  const SidebarContent = () => (
    <>
      <div className="flex items-center gap-2 mb-6 pb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiArrowLeft size={20} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={metadata.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="font-semibold text-sm text-gray-900 dark:text-white bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-blue-500 focus:outline-none truncate w-full py-0.5"
            placeholder="Untitled Resume"
            title="Click to rename"
          />
          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
            {isSaving ? 'Saving draft…' : metadata.lastSaved ? `Saved draft ${new Date(metadata.lastSaved).toLocaleTimeString()}` : 'Unsaved draft'}
          </p>
        </div>
      </div>

      <div className="space-y-1 overflow-y-auto flex-1 pr-1 pb-2">
        {STEPS.map((step, index) => (
          <button
            key={step.id}
            onClick={() => {
              setCurrentStep(index);
              setShowMobileSidebar(false);
            }}
            className={`
              w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 text-left
              ${currentStep === index
                ? 'bg-gradient-to-r from-blue-600/10 to-purple-600/10 text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
              }
              ${index < currentStep ? 'text-emerald-500' : ''}
            `}
          >
            <span
              className={`
                w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0
                ${currentStep === index
                  ? 'bg-blue-600 text-white'
                  : index < currentStep
                  ? 'bg-emerald-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                }
              `}
            >
              {index < currentStep ? '✓' : index + 1}
            </span>
            <span className="text-sm font-medium truncate">{step.label}</span>
          </button>
        ))}
        <AtsScorePanel />

        {/* ─── PORTFOLIO BUTTON (below ATS Score) ─── */}
        <button
          onClick={() => navigate('/portfolio-builder')}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mt-2"
        >
          <FiGlobe size={20} className="w-6 shrink-0" />
          <span className="text-sm font-medium">Portfolio</span>
        </button>
      </div>

      <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-1 mt-auto">
        <button
          onClick={() => {
            setShowTemplateSelector(true);
            setShowMobileSidebar(false);
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <span className="w-6 h-6 flex items-center justify-center text-base">📄</span>
          <span className="text-sm font-medium">Change Template</span>
        </button>
        <button
          onClick={() => {
            setShowSectionReorder(true);
            setShowMobileSidebar(false);
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiList size={20} className="w-6 shrink-0" />
          <span className="text-sm font-medium">Reorder Sections</span>
        </button>
        <button
          onClick={() => {
            setShowThemeCustomizer(true);
            setShowMobileSidebar(false);
          }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        >
          <FiSettings size={20} className="w-6 shrink-0" />
          <span className="text-sm font-medium">Customize Theme</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <div className="hidden lg:flex flex-col w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <SidebarContent />
      </div>

      <AnimatePresence>
        {showMobileSidebar && (
          <>
            <motion.div
              key="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileSidebar(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.div
              key="mob-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-0 left-0 bottom-0 w-72 bg-white dark:bg-gray-800 z-50 flex flex-col p-4 shadow-2xl lg:hidden"
            >
              <button
                onClick={() => setShowMobileSidebar(false)}
                className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <FiX size={20} className="text-gray-600 dark:text-gray-300" />
              </button>
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between flex-shrink-0 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiMenu size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <span className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {STEPS[currentStep].label}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 hidden sm:inline">
              Step {currentStep + 1} of {STEPS.length}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {showPreview ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              <span className="hidden sm:inline">{showPreview ? 'Hide' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isDbSaving}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FiSave size={16} className={isDbSaving ? "animate-pulse" : ""} />
              <span className="hidden sm:inline">{isDbSaving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            >
              <FiShare2 size={16} />
              <span className="hidden sm:inline">Share</span>
            </button>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 transition-colors"
            >
              <FiLogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden flex min-h-0">
          <div
            className={`${showPreview ? 'w-full lg:w-1/2' : 'w-full'} overflow-y-auto p-4 sm:p-6 flex flex-col`}
          >
            <div className="flex-1">
              <ResumeForm step={STEPS[currentStep].id} />
            </div>

            <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 shrink-0">
              <button
                onClick={handlePrevious}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <FiArrowLeft size={16} /> Previous
              </button>
              <button
                onClick={handleNext}
                disabled={currentStep === STEPS.length - 1}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next <FiArrowRight size={16} />
              </button>
            </div>
          </div>

          {showPreview && (
            <div className="hidden lg:block w-1/2 overflow-hidden border-l border-gray-200 dark:border-gray-700">
              <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Loading preview...</div>}>
                <A4Page key={themeSettings.templateId} data={resumeData} template={themeSettings.templateId} theme={themeSettings} />
              </Suspense>
            </div>
          )}
        </div>

        {showPreview && (
          <div className="lg:hidden">
            <div className="border-t border-gray-200 dark:border-gray-700 h-64 overflow-hidden">
              <Suspense fallback={<div className="flex items-center justify-center h-full text-gray-500 dark:text-gray-400">Loading preview...</div>}>
                <A4Page key={themeSettings.templateId} data={resumeData} template={themeSettings.templateId} theme={themeSettings} />
              </Suspense>
            </div>
          </div>
        )}
      </div>

      <TemplateSelector
        selected={themeSettings.templateId}
        onSelect={(id) => updateTheme({ templateId: id })}
        isOpen={showTemplateSelector}
        onClose={() => setShowTemplateSelector(false)}
      />

      {showThemeCustomizer && (
        <ThemeCustomizer settings={themeSettings} onUpdate={updateTheme} onClose={() => setShowThemeCustomizer(false)} />
      )}

      <SectionReorder isOpen={showSectionReorder} onClose={() => setShowSectionReorder(false)} />
    </div>
  );
};

export default ResumeBuilder;