import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FiEdit, 
  FiCopy, 
  FiTrash2, 
  FiDownload,
  FiMoreVertical,
} from 'react-icons/fi';

const ResumeCard = ({ resume, delay = 0 }) => {
  const [showMenu, setShowMenu] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
      case 'draft':
        return 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
      default:
        return 'bg-gray-500/10 text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="group bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
    >
      {/* Preview */}
      <div className="relative h-40 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 rounded-t-xl overflow-hidden">
        <div className="p-4">
          <div className="h-3 w-2/3 bg-gray-300 dark:bg-gray-600 rounded mb-2" />
          <div className="h-2 w-1/2 bg-gray-300 dark:bg-gray-600 rounded mb-3" />
          <div className="space-y-1.5">
            {[80, 60, 70].map((width, i) => (
              <div
                key={i}
                className="h-1.5 bg-gray-300 dark:bg-gray-600 rounded"
                style={{ width: `${width}%` }}
              />
            ))}
          </div>
        </div>
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${getStatusColor(resume.status)}`}>
            {resume.status.charAt(0).toUpperCase() + resume.status.slice(1)}
          </span>
        </div>
        {/* Template Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-300 backdrop-blur-sm">
            {resume.template}
          </span>
        </div>
      </div>

      {/* Card Footer */}
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-medium text-gray-900 dark:text-white text-sm truncate">
              {resume.title}
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
              Updated {new Date(resume.updatedAt).toLocaleDateString()}
            </p>
          </div>
          {/* Menu Button */}
          <button
            onClick={() => setShowMenu(!showMenu)}
            className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <FiMoreVertical size={18} className="text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
          <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors">
            <FiEdit size={14} />
            Edit
          </button>
          <button className="flex-1 flex items-center justify-center gap-1.5 px-2 py-1.5 text-xs font-medium rounded-lg bg-gray-50 dark:bg-gray-700/50 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
            <FiDownload size={14} />
            Download
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeCard;