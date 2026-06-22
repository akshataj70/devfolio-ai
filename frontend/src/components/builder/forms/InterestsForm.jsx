import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResumeStore } from '../../../stores/useResumeStore';
import { FiPlus, FiX } from 'react-icons/fi';

const InterestsForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const data = resumeData.interests;
  const [newInterest, setNewInterest] = useState('');

  const addInterest = () => {
    if (newInterest.trim()) {
      updateSection('interests', [...data, newInterest.trim()]);
      setNewInterest('');
    }
  };

  const removeInterest = (index) => {
    updateSection('interests', data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addInterest();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Hobbies & Interests</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Add activities you enjoy outside of work</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newInterest}
          onChange={(e) => setNewInterest(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="e.g., Photography, Hiking, Open Source"
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addInterest}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((interest, index) => (
          <span
            key={index}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-sm border border-gray-200 dark:border-gray-700"
          >
            {interest}
            <button
              onClick={() => removeInterest(index)}
              className="hover:text-red-500 transition-colors ml-1"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
        {data.length === 0 && (
          <span className="text-sm text-gray-400 dark:text-gray-500">No interests added yet</span>
        )}
      </div>
    </motion.div>
  );
};

export default InterestsForm;
