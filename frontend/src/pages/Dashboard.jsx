import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  FiFileText, 
  FiGlobe, 
  FiPlus, 
  FiSearch, 
  FiTrash2, 
  FiExternalLink,
  FiLoader
} from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import Sidebar from '../components/dashboard/Sidebar';
import { api } from '../services/api';
import { useAuthStore } from '../stores/useAuthStore';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuthStore();
  const [resumes, setResumes] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  // Fetch resumes and portfolios on mount
  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [resumesData, portfoliosData] = await Promise.all([
          api.get('/resumes'),
          api.get('/portfolios')
        ]);
        
        if (resumesData.success) {
          setResumes(resumesData.resumes);
        }
        if (portfoliosData.success) {
          setPortfolios(portfoliosData.portfolios);
        }
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
        toast.error('Failed to load your documents');
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, []);

  const handleDeleteResume = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title || 'this resume'}"?`)) return;
    try {
      const res = await api.delete(`/resumes/${id}`);
      if (res.success) {
        setResumes(resumes.filter(r => r._id !== id));
        toast.success('Resume deleted successfully');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete resume');
    }
  };

  const handleDeletePortfolio = async (id, title) => {
    if (!window.confirm(`Are you sure you want to delete "${title || 'this portfolio'}"?`)) return;
    try {
      const res = await api.delete(`/portfolios/${id}`);
      if (res.success) {
        setPortfolios(portfolios.filter(p => p._id !== id));
        toast.success('Portfolio deleted successfully');
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete portfolio');
    }
  };

  // Filter lists based on search query
  const filteredResumes = resumes.filter(r => 
    (r.title || 'Untitled Resume').toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPortfolios = portfolios.filter(p => 
    (p.title || 'Untitled Portfolio').toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-4 flex-1">
            <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
              Dashboard
            </h1>
            <div className="relative flex-1 max-w-md">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-gray-500" size={20} />
              <input
                type="text"
                placeholder="Search resumes or portfolios..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {user?.email}
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'U'}
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Welcome Message */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Welcome back!
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Manage your professional documents and layouts in one place.
            </p>
          </div>

          {/* Quick Actions */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-3">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div 
                whileHover={{ y: -2 }}
                className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                    <FiFileText size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Create Resume</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Build an ATS-optimized professional resume</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/resume-builder')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  <FiPlus size={16} /> Create
                </button>
              </motion.div>

              <motion.div 
                whileHover={{ y: -2 }}
                className="p-5 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
                    <FiGlobe size={24} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">Create Portfolio</h4>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Convert your resume details into a live webpage</p>
                  </div>
                </div>
                <button
                  onClick={() => navigate('/portfolio-builder')}
                  className="flex items-center gap-1.5 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors text-sm"
                >
                  <FiPlus size={16} /> Create
                </button>
              </motion.div>
            </div>
          </div>

          {loading ? (
            <div className="h-64 flex items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <FiLoader className="w-8 h-8 text-blue-500 animate-spin" />
                <span className="text-sm text-gray-500">Loading your workspace...</span>
              </div>
            </div>
          ) : (
            <>
              {/* My Recent Resumes */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FiFileText className="text-blue-500" /> My Recent Resumes
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                    {filteredResumes.length} saved
                  </span>
                </div>

                {filteredResumes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredResumes.map((resume) => {
                      const templateName = resume.themeSettings?.templateId || resume.themeSettings?.template || 'Sherlock Holmes';
                      return (
                        <motion.div
                          key={resume._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col justify-between h-40"
                        >
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white truncate pr-6 text-sm" title={resume.title}>
                                {resume.title || 'Untitled Resume'}
                              </h4>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                              <div>Template: <span className="font-medium text-gray-700 dark:text-gray-300">{templateName}</span></div>
                              <div>Edited: <span className="font-medium">{new Date(resume.updatedAt).toLocaleDateString()}</span></div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <button
                              onClick={() => navigate(`/resume-builder?id=${resume._id}`)}
                              className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:hover:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg text-xs font-semibold transition-colors"
                            >
                              <FiExternalLink size={14} /> Open
                            </button>
                            <button
                              onClick={() => handleDeleteResume(resume._id, resume.title)}
                              className="px-2 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold transition-colors"
                              aria-label="Delete resume"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    {searchQuery ? 'No resumes match your search' : 'No resumes saved yet. Click "Create" to start building.'}
                  </div>
                )}
              </div>

              {/* My Recent Portfolios */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white flex items-center gap-2">
                    <FiGlobe className="text-purple-500" /> My Recent Portfolios
                  </h3>
                  <span className="text-xs font-semibold px-2 py-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                    {filteredPortfolios.length} saved
                  </span>
                </div>

                {filteredPortfolios.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {filteredPortfolios.map((portfolio) => {
                      const themeName = portfolio.portfolioSettings?.theme || portfolio.portfolioSettings?.themeId || 'Glow';
                      return (
                        <motion.div
                          key={portfolio._id}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4 shadow-sm hover:shadow-md transition-shadow relative group flex flex-col justify-between h-40"
                        >
                          <div>
                            <div className="flex justify-between items-start mb-2">
                              <h4 className="font-semibold text-gray-900 dark:text-white truncate pr-6 text-sm" title={portfolio.title}>
                                {portfolio.title || 'Untitled Portfolio'}
                              </h4>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
                              <div>Theme: <span className="font-medium text-gray-700 dark:text-gray-300">{themeName}</span></div>
                              <div>Edited: <span className="font-medium">{new Date(portfolio.updatedAt).toLocaleDateString()}</span></div>
                            </div>
                          </div>

                          <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100 dark:border-gray-700">
                            <button
                              onClick={() => navigate(`/portfolio-builder?id=${portfolio._id}`)}
                              className="flex-1 flex items-center justify-center gap-1 py-1.5 bg-purple-50 hover:bg-purple-100 dark:bg-purple-900/20 dark:hover:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg text-xs font-semibold transition-colors"
                            >
                              <FiExternalLink size={14} /> Open
                            </button>
                            <button
                              onClick={() => handleDeletePortfolio(portfolio._id, portfolio.title)}
                              className="px-2 py-1.5 bg-red-50 hover:bg-red-100 dark:bg-red-900/20 dark:hover:bg-red-900/30 text-red-600 dark:text-red-400 rounded-lg text-xs font-semibold transition-colors"
                              aria-label="Delete portfolio"
                            >
                              <FiTrash2 size={14} />
                            </button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="bg-white dark:bg-gray-800/50 border border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-8 text-center text-gray-500 dark:text-gray-400 text-sm">
                    {searchQuery ? 'No portfolios match your search' : 'No portfolios saved yet. Click "Create" to start building.'}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}