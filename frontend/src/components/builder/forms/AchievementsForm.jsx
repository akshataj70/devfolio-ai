import { motion } from 'framer-motion';
import { useResumeStore } from '../../../stores/useResumeStore';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const AchievementsForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResumeStore();
  const data = resumeData.achievements;

  const handleAdd = () => {
    addListItem('achievements', {
      title: '',
      description: '',
      date: '',
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Achievements & Awards</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Highlight your notable accomplishments</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={16} />
          Add Achievement
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No achievements added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((ach) => (
            <motion.div
              key={ach.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 space-y-3 relative group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeListItem('achievements', ach.id)}
                  className="text-red-500 hover:text-red-600 p-1 bg-red-50 dark:bg-red-900/20 rounded"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="space-y-3 pr-10">
                <div className="grid grid-cols-3 gap-3">
                  <div className="col-span-2">
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={ach.title}
                      onChange={(e) => updateListItem('achievements', ach.id, { title: e.target.value })}
                      placeholder="e.g., Employee of the Year"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Date</label>
                    <input
                      type="text"
                      value={ach.date}
                      onChange={(e) => updateListItem('achievements', ach.id, { date: e.target.value })}
                      placeholder="e.g., 2023"
                      className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Description</label>
                  <textarea
                    value={ach.description}
                    onChange={(e) => updateListItem('achievements', ach.id, { description: e.target.value })}
                    rows={2}
                    placeholder="Brief description of the achievement..."
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y text-sm font-mono"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default AchievementsForm;
