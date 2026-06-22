import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResumeStore } from '../../../stores/useResumeStore';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const LanguagesForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResumeStore();
  const data = resumeData.languages;

  const handleAdd = () => {
    addListItem('languages', {
      name: '',
      proficiency: '',
    });
  };

  const proficiencyLevels = [
    'Native',
    'Fluent',
    'Advanced',
    'Intermediate',
    'Basic'
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Languages</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add languages you speak and your proficiency</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={16} />
          Add Language
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No languages added yet.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {data.map((lang) => (
            <motion.div
              key={lang.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-3 p-3 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50"
            >
              <div className="flex-1">
                <input
                  type="text"
                  value={lang.name}
                  onChange={(e) => updateListItem('languages', lang.id, { name: e.target.value })}
                  placeholder="e.g., English, Spanish"
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
              <div className="flex-1">
                <select
                  value={lang.proficiency}
                  onChange={(e) => updateListItem('languages', lang.id, { proficiency: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm appearance-none"
                >
                  <option value="" disabled>Select proficiency</option>
                  {proficiencyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
              <button
                onClick={() => removeListItem('languages', lang.id)}
                className="text-red-500 hover:text-red-600 p-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg"
              >
                <FiTrash2 size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default LanguagesForm;
