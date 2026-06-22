import { useState } from 'react';
import { motion } from 'framer-motion';
import { useResumeStore } from '../../../stores/useResumeStore';
import { FiPlus, FiX } from 'react-icons/fi';

const SkillsForm = () => {
  const { resumeData, updateSection } = useResumeStore();
  const data = resumeData.skills;
  const [newSkill, setNewSkill] = useState('');

  const addSkill = () => {
    if (newSkill.trim()) {
      updateSection('skills', [...data, { name: newSkill.trim(), level: '' }]);
      setNewSkill('');
    }
  };

  const removeSkill = (index) => {
    updateSection('skills', data.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
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
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Skills</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Add your technical and professional skills</p>
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="Type a skill and press Enter (e.g., React, Python)"
          className="flex-1 px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addSkill}
          className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={20} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        {data.map((skill, index) => (
          <span
            key={index}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm border border-blue-200 dark:border-blue-800"
          >
            {/* The previous implementation just used a string. We'll handle both string and object formats gracefully during the transition */}
            {typeof skill === 'string' ? skill : skill.name}
            <button
              onClick={() => removeSkill(index)}
              className="hover:text-red-500 transition-colors ml-1"
            >
              <FiX size={14} />
            </button>
          </span>
        ))}
        {data.length === 0 && (
          <span className="text-sm text-gray-400 dark:text-gray-500">No skills added yet</span>
        )}
      </div>
    </motion.div>
  );
};

export default SkillsForm;
