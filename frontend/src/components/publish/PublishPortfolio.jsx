import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiGlobe, 
  FiCopy, 
  FiCheck, 
  FiRefreshCw,
  FiExternalLink,
} from 'react-icons/fi';

const PublishPortfolio = ({ isOpen, onClose, portfolioName }) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [url, setUrl] = useState('');
  const [copied, setCopied] = useState(false);

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setIsPublished(true);
      setUrl(`${portfolioName || 'username'}.devfolio.ai`);
    }, 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full shadow-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                    Publish Portfolio
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Make your portfolio live on the web
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              {!isPublished ? (
                <div className="space-y-4">
                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      Your portfolio will be published at:
                    </p>
                    <p className="text-sm font-mono text-blue-600 dark:text-blue-400 mt-1">
                      {portfolioName || 'username'}.devfolio.ai
                    </p>
                  </div>

                  <button
                    onClick={handlePublish}
                    disabled={isPublishing}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                  >
                    {isPublishing ? (
                      <>
                        <FiRefreshCw size={18} className="inline animate-spin mr-2" />
                        Publishing...
                      </>
                    ) : (
                      <>
                        <FiGlobe size={18} className="inline mr-2" />
                        Publish Now
                      </>
                    )}
                  </button>
                </div>
              ) : (
                <div className="space-y-4 text-center">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg">
                    <FiCheck size={40} className="mx-auto text-emerald-600 dark:text-emerald-400" />
                    <p className="text-lg font-semibold text-emerald-600 dark:text-emerald-400 mt-2">
                      Published Successfully!
                    </p>
                  </div>

                  <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                    <p className="text-sm text-gray-500 dark:text-gray-400">Your portfolio is live at:</p>
                    <div className="flex items-center justify-center gap-2 mt-1">
                      <code className="text-sm font-mono text-blue-600 dark:text-blue-400">{url}</code>
                      <button
                        onClick={handleCopy}
                        className="p-1.5 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                      >
                        {copied ? <FiCheck size={16} className="text-emerald-500" /> : <FiCopy size={16} className="text-gray-500" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <a
                      href={`https://${url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 py-2.5 text-center rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      <FiExternalLink size={16} className="inline mr-2" />
                      Visit Site
                    </a>
                    <button
                      onClick={onClose}
                      className="flex-1 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all"
                    >
                      Done
                    </button>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PublishPortfolio;