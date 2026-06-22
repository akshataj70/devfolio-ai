import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiSun, FiMoon } from 'react-icons/fi';
import { useTheme } from '../../context/ThemeContext';

const ThemeSettings = () => {
  const { isDark, toggleTheme } = useTheme();
  const [accentColor, setAccentColor] = useState('blue');
  const [fontSize, setFontSize] = useState('medium');
  const [saved, setSaved] = useState(false);

  const accentColors = [
    { id: 'blue', color: '#3b82f6' },
    { id: 'purple', color: '#8b5cf6' },
    { id: 'emerald', color: '#10b981' },
    { id: 'red', color: '#ef4444' },
    { id: 'orange', color: '#f59e0b' },
  ];

  const fontSizes = [
    { id: 'small', label: 'Small' },
    { id: 'medium', label: 'Medium' },
    { id: 'large', label: 'Large' },
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Theme Settings</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Customize your app appearance</p>
      </div>

      <div className="space-y-6">
        {/* Dark Mode */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Theme Mode
          </label>
          <button
            onClick={toggleTheme}
            className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors w-full"
          >
            {isDark ? <FiMoon size={20} /> : <FiSun size={20} />}
            <span className="font-medium text-gray-900 dark:text-white">
              {isDark ? 'Dark Mode' : 'Light Mode'}
            </span>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              Click to switch
            </span>
          </button>
        </div>

        {/* Accent Color */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Accent Color
          </label>
          <div className="flex gap-3">
            {accentColors.map((color) => (
              <button
                key={color.id}
                onClick={() => setAccentColor(color.id)}
                className={`w-10 h-10 rounded-full transition-all ${
                  accentColor === color.id 
                    ? 'ring-4 ring-blue-500 ring-offset-2 dark:ring-offset-gray-800' 
                    : ''
                }`}
                style={{ backgroundColor: color.color }}
              >
                <span className="sr-only">{color.id}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Font Size
          </label>
          <div className="flex gap-2">
            {fontSizes.map((size) => (
              <button
                key={size.id}
                onClick={() => setFontSize(size.id)}
                className={`px-4 py-2 rounded-lg border transition-all ${
                  fontSize === size.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                }`}
              >
                {size.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-3 pt-4">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-all hover:scale-105"
          >
            <FiSave size={18} />
            Save Theme
          </button>
          {saved && (
            <span className="text-sm text-emerald-600 dark:text-emerald-400 font-medium">
              ✅ Theme saved!
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ThemeSettings;