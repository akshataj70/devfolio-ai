import { motion, AnimatePresence } from 'framer-motion';
import { FiX } from 'react-icons/fi';
import { COLORS, FONTS, SPACING } from '../../utils/constants';

const ThemeCustomizer = ({ settings, onUpdate, onClose }) => {
  const updateSetting = (key, value) => {
    onUpdate({ [key]: value });
  };

  return (
    <AnimatePresence>
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
        className="fixed inset-0 flex items-center justify-center z-50 p-4 pointer-events-none"
      >
        <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl p-6 pointer-events-auto">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Customize Theme
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Personalize your resume design
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <FiX size={24} className="text-gray-500 dark:text-gray-400" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Accent Color */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Accent Color
              </label>
              <div className="flex flex-wrap gap-3">
                {COLORS.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => updateSetting('accentColor', color.id)}
                    className={`w-10 h-10 rounded-full transition-all ${
                      settings.accentColor === color.id 
                        ? 'ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800 scale-110' 
                        : 'hover:scale-110'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.label}
                  >
                    <span className="sr-only">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Font Family */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Font Family
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {FONTS.map((font) => (
                  <button
                    key={font.id}
                    onClick={() => updateSetting('fontFamily', font.id)}
                    className={`px-4 py-2 rounded-lg border transition-all ${
                      settings.fontFamily === font.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-sm">{font.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spacing */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Spacing
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SPACING.map((space) => (
                  <button
                    key={space.id}
                    onClick={() => updateSetting('spacing', space.id)}
                    className={`px-4 py-2 rounded-lg border transition-all capitalize ${
                      settings.spacing === space.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 shadow-sm'
                        : 'border-gray-200 dark:border-gray-700 hover:border-blue-300'
                    }`}
                  >
                    <span className="text-sm">{space.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Photo Toggle */}
            <div className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <div>
                <h4 className="text-sm font-medium text-gray-900 dark:text-white">Show Profile Photo</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400">Include your uploaded photo in the resume</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={settings.showPhoto !== false}
                  onChange={(e) => updateSetting('showPhoto', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ThemeCustomizer;