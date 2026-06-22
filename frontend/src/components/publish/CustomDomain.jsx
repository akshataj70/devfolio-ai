import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiX, 
  FiCheck, 
  FiRefreshCw,
  FiGlobe,
  FiAlertCircle,
} from 'react-icons/fi';

const CustomDomain = ({ isOpen, onClose }) => {
  const [domain, setDomain] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState('');

  const handleVerify = () => {
    if (!domain) {
      setError('Please enter a domain');
      return;
    }

    setIsVerifying(true);
    setError('');
    
    setTimeout(() => {
      setIsVerifying(false);
      // Simulate verification
      if (domain.includes('.')) {
        setIsVerified(true);
      } else {
        setError('Invalid domain format. Please enter a valid domain.');
      }
    }, 1500);
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
                    Custom Domain
                  </h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect your own domain
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                >
                  <FiX size={20} className="text-gray-500 dark:text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Domain Name
                  </label>
                  <input
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    placeholder="example.com"
                    className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    Enter your domain without http:// or www
                  </p>
                </div>

                {error && (
                  <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-2">
                    <FiAlertCircle className="text-red-600 dark:text-red-400 flex-shrink-0" />
                    <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                  </div>
                )}

                {isVerified ? (
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 rounded-lg text-center">
                    <FiCheck size={32} className="mx-auto text-emerald-600 dark:text-emerald-400" />
                    <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400 mt-1">
                      Domain verified successfully!
                    </p>
                    <p className="text-xs text-emerald-600 dark:text-emerald-400">
                      Your portfolio is now available at {domain}
                    </p>
                  </div>
                ) : (
                  <button
                    onClick={handleVerify}
                    disabled={isVerifying}
                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105 disabled:opacity-50"
                  >
                    {isVerifying ? (
                      <>
                        <FiRefreshCw size={18} className="inline animate-spin mr-2" />
                        Verifying...
                      </>
                    ) : (
                      <>
                        <FiGlobe size={18} className="inline mr-2" />
                        Verify Domain
                      </>
                    )}
                  </button>
                )}

                {/* DNS Instructions */}
                <div className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg text-xs">
                  <p className="font-medium text-gray-700 dark:text-gray-300 mb-2">DNS Configuration:</p>
                  <div className="space-y-1 text-gray-600 dark:text-gray-400">
                    <p>Type: <span className="font-mono">CNAME</span></p>
                    <p>Name: <span className="font-mono">www</span></p>
                    <p>Value: <span className="font-mono">devfolio.ai</span></p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CustomDomain;