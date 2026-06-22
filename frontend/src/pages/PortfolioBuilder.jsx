import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiArrowLeft,
  FiDownload,
  FiShare2,
  FiGlobe,
  FiEye,
  FiEyeOff,
  FiSettings,
  FiGrid,
  FiMenu,
  FiX,
  FiZap,
  FiStar,
  FiBriefcase,
  FiBook,
  FiLogOut,
  FiSave,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import PortfolioPreview  from '../components/portfolio/PortfolioPreview';
import ThemeSelector     from '../components/portfolio/ThemeSelector';
import PortfolioSettings from '../components/portfolio/PortfolioSettings';
import ThemeToggle       from '../components/ui/ThemeToggle';
import { usePortfolio }  from '../hooks/usePortfolio.jsx';
import { useResumeStore } from '../stores/useResumeStore';
import { useAuthStore }   from '../stores/useAuthStore';
import { api } from '../services/api';

// ─── Sidebar tabs ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'theme',    label: 'Theme',    icon: <FiGrid size={16} /> },
  { id: 'sections', label: 'Sections', icon: <FiSettings size={16} /> },
];

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ icon, label, value, color }) => (
  <div className="flex items-center gap-3 p-3 rounded-xl bg-gray-50 dark:bg-gray-700/50">
    <div
      className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
      style={{ background: `${color}20`, color }}
    >
      {icon}
    </div>
    <div>
      <p className="text-xs text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-lg font-bold text-gray-900 dark:text-white leading-tight">{value}</p>
    </div>
  </div>
);

// ─── Completeness bar ─────────────────────────────────────────────────────────
const CompletenessBar = ({ value }) => (
  <div className="px-1">
    <div className="flex items-center justify-between mb-1.5">
      <span className="text-xs text-gray-500 dark:text-gray-400">Profile completeness</span>
      <span className="text-xs font-semibold" style={{ color: value >= 80 ? '#10b981' : value >= 50 ? '#f59e0b' : '#ef4444' }}>
        {value}%
      </span>
    </div>
    <div className="h-1.5 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="h-full rounded-full"
        style={{ background: value >= 80 ? '#10b981' : value >= 50 ? '#f59e0b' : '#ef4444' }}
      />
    </div>
  </div>
);

// ─── Main component ───────────────────────────────────────────────────────────
const PortfolioBuilder = () => {
  const navigate = useNavigate();
  const {
    resumeData,
    portfolioSettings,
    stats,
    completeness,
    updatePortfolio,
    handleDownload,
    handleShare,
    handlePublish,
  } = usePortfolio();

  const { logout } = useAuthStore();
  const { metadata, setPortfolio, updateTitle } = useResumeStore();

  const [isLoading, setIsLoading] = useState(true);
  const [isDbSaving, setIsDbSaving] = useState(false);
  const [showPreview,      setShowPreview]      = useState(true);
  const [activeTab,        setActiveTab]        = useState('theme');
  const [showMobileSidebar, setShowMobileSidebar] = useState(false);

  // Load portfolio by ID on mount if present, else initialize new
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    async function loadPortfolio() {
      if (id) {
        try {
          setIsLoading(true);
          const data = await api.get(`/portfolios/${id}`);
          if (data.success && data.portfolio) {
            setPortfolio(data.portfolio);
          } else {
            toast.error('Portfolio not found');
            navigate('/dashboard', { replace: true });
          }
        } catch (err) {
          console.error(err);
          toast.error('Failed to load portfolio');
          navigate('/dashboard', { replace: true });
        } finally {
          setIsLoading(false);
        }
      } else {
        // Initialize as a new portfolio, inheriting active resumeData
        setPortfolio({
          title: 'Untitled Portfolio',
          portfolioSettings: portfolioSettings || { theme: 'developer' },
          resumeData: resumeData
        });
        setIsLoading(false);
      }
    }

    loadPortfolio();
  }, [setPortfolio, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSave = async () => {
    try {
      setIsDbSaving(true);
      const isUpdate = !!metadata.id;
      
      const payload = {
        title: metadata.title || 'Untitled Portfolio',
        resumeData,
        portfolioSettings
      };

      if (isUpdate) {
        const res = await api.put(`/portfolios/${metadata.id}`, payload);
        if (res.success) {
          toast.success('Portfolio updated successfully!');
        }
      } else {
        const res = await api.post('/portfolios', payload);
        if (res.success && res.portfolio) {
          setPortfolio(res.portfolio);
          navigate(`/portfolio-builder?id=${res.portfolio._id}`, { replace: true });
          toast.success('Portfolio saved to your account!');
        }
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to save to database');
    } finally {
      setIsDbSaving(false);
    }
  };

  const handleThemeSelect = useCallback(
    (id) => updatePortfolio({ theme: id }),
    [updatePortfolio]
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading portfolio builder...</span>
        </div>
      </div>
    );
  }

  // ─── Sidebar content ─────────────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-5 pb-4 border-b border-gray-200 dark:border-gray-700">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors animate-none"
        >
          <FiArrowLeft size={18} className="text-gray-600 dark:text-gray-300" />
        </button>
        <div className="min-w-0 flex-1">
          <input
            type="text"
            value={metadata.title}
            onChange={(e) => updateTitle(e.target.value)}
            className="font-semibold text-sm text-gray-900 dark:text-white bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-purple-500 focus:outline-none truncate w-full py-0.5"
            placeholder="Untitled Portfolio"
            title="Click to rename"
          />
          <p className="text-xs text-gray-400 dark:text-gray-500">Live preview</p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-2 mb-4">
        <StatCard icon={<FiZap size={14}/>}      label="Skills"     value={stats.skills}     color="#6366f1" />
        <StatCard icon={<FiStar size={14}/>}      label="Projects"   value={stats.projects}   color="#f59e0b" />
        <StatCard icon={<FiBriefcase size={14}/>} label="Experience" value={stats.experience} color="#10b981" />
        <StatCard icon={<FiBook size={14}/>}      label="Education"  value={stats.education}  color="#06b6d4" />
      </div>

      {/* Completeness */}
      <div className="mb-5">
        <CompletenessBar value={completeness} />
      </div>

      {/* Tab bar */}
      <div className="flex rounded-xl bg-gray-100 dark:bg-gray-700 p-1 mb-4 flex-shrink-0">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-white shadow-sm'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto min-h-0 pr-0.5">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -8 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === 'theme' && (
              <ThemeSelector
                selected={portfolioSettings?.theme || 'developer'}
                onSelect={handleThemeSelect}
              />
            )}
            {activeTab === 'sections' && <PortfolioSettings />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Action buttons */}
      <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700 space-y-2 flex-shrink-0">
        <button
          onClick={handleDownload}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200 hover:scale-[1.02]"
        >
          <FiDownload size={16} /> Download HTML
        </button>
        <button
          onClick={handleShare}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
        >
          <FiShare2 size={16} /> Copy Share Link
        </button>
        <button
          onClick={handlePublish}
          className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-pointer transition-colors hover:bg-gray-200 dark:hover:bg-gray-600"
        >
          <FiGlobe size={16} /> Publish
          <span className="ml-auto text-xs px-1.5 py-0.5 rounded-full bg-gray-200 dark:bg-gray-600">Soon</span>
        </button>
      </div>
    </div>
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">

      {/* ── Desktop Sidebar ─────────────────────────────────────────────── */}
      <div className="hidden lg:flex flex-col w-72 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4 flex-shrink-0">
        <SidebarContent />
      </div>

      {/* ── Mobile Sidebar Drawer ────────────────────────────────────────── */}
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
              className="fixed top-0 left-0 bottom-0 w-80 bg-white dark:bg-gray-800 z-50 flex flex-col p-4 shadow-2xl lg:hidden"
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

      {/* ── Main Content ─────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-4 py-3 flex items-center justify-between flex-shrink-0 gap-2">
          <div className="flex items-center gap-2 min-w-0 flex-1">
            <button
              onClick={() => setShowMobileSidebar(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiMenu size={20} className="text-gray-600 dark:text-gray-300" />
            </button>
            <div className="min-w-0 max-w-xs sm:max-w-sm flex-1">
              <input
                type="text"
                value={metadata.title}
                onChange={(e) => updateTitle(e.target.value)}
                className="font-semibold text-sm text-gray-900 dark:text-white bg-transparent border-b border-transparent hover:border-gray-300 dark:hover:border-gray-600 focus:border-purple-500 focus:outline-none truncate w-full py-0.5"
                placeholder="Untitled Portfolio"
                title="Click to rename"
              />
            </div>
            <span className="hidden sm:inline text-xs text-gray-400 dark:text-gray-500 capitalize flex-shrink-0">
              · {portfolioSettings?.theme || 'developer'} theme
            </span>
          </div>

          <div className="flex items-center gap-1.5 flex-shrink-0">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              {showPreview ? <FiEyeOff size={15} /> : <FiEye size={15} />}
              <span className="hidden sm:inline">{showPreview ? 'Hide' : 'Preview'}</span>
            </button>
            <button
              onClick={handleSave}
              disabled={isDbSaving}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
            >
              <FiSave size={15} className={isDbSaving ? "animate-pulse" : ""} />
              <span className="hidden sm:inline">{isDbSaving ? 'Saving...' : 'Save'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-md transition-all hover:scale-105"
            >
              <FiDownload size={15} />
              <span className="hidden sm:inline">Download</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiShare2 size={15} />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={() => navigate('/resume-builder')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <FiArrowLeft size={15} />
              <span className="hidden sm:inline">Resume Builder</span>
            </button>
            <ThemeToggle />
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-2.5 py-1.5 text-sm font-medium rounded-lg border border-gray-200 dark:border-gray-600 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-300 dark:hover:border-red-700 transition-colors"
            >
              <FiLogOut size={15} />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Preview panel */}
        {showPreview ? (
          <div className="flex-1 overflow-y-auto bg-gray-100 dark:bg-gray-950">
            {/* Browser chrome mockup */}
            <div className="max-w-5xl mx-auto my-6 px-4">
              <div className="rounded-t-xl bg-gray-200 dark:bg-gray-800 px-4 py-2.5 flex items-center gap-2 border border-gray-300 dark:border-gray-700">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <div className="w-3 h-3 rounded-full bg-yellow-400" />
                  <div className="w-3 h-3 rounded-full bg-green-400" />
                </div>
                <div className="flex-1 mx-3 bg-white dark:bg-gray-700 rounded-md px-3 py-1 text-xs text-gray-400 dark:text-gray-500 font-mono">
                  {resumeData?.personal?.firstName
                    ? `${resumeData.personal.firstName.toLowerCase()}.devfolio.ai`
                    : 'yourname.devfolio.ai'}
                </div>
              </div>

              <div
                className="rounded-b-xl overflow-hidden shadow-2xl border border-t-0 border-gray-300 dark:border-gray-700"
                style={{ minHeight: '70vh' }}
              >
                <PortfolioPreview
                  data={resumeData}
                  portfolioSettings={portfolioSettings}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="text-center">
              <div className="text-5xl mb-4">👁️</div>
              <p className="text-gray-500 dark:text-gray-400 text-sm">Preview is hidden</p>
              <button
                onClick={() => setShowPreview(true)}
                className="mt-3 px-4 py-2 text-sm font-medium rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg transition-all"
              >
                Show Preview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioBuilder;