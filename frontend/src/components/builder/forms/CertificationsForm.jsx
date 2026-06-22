import { motion } from 'framer-motion';
import { useResumeStore } from '../../../stores/useResumeStore';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const CertificationsForm = () => {
  const { resumeData, addListItem, updateListItem, removeListItem } = useResumeStore();
  const data = resumeData.certifications;

  const handleAdd = () => {
    addListItem('certifications', {
      name: '',
      issuer: '',
      date: '',
      credentialId: '',
      url: '',
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
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Certifications</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Add your professional certifications</p>
        </div>
        <button
          onClick={handleAdd}
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <FiPlus size={16} />
          Add Certification
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <p>No certifications added yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {data.map((cert) => (
            <motion.div
              key={cert.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50 space-y-3 relative group"
            >
              <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => removeListItem('certifications', cert.id)}
                  className="text-red-500 hover:text-red-600 p-1 bg-red-50 dark:bg-red-900/20 rounded"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-3 pr-10">
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Certification Name</label>
                  <input
                    type="text"
                    value={cert.name}
                    onChange={(e) => updateListItem('certifications', cert.id, { name: e.target.value })}
                    placeholder="e.g., AWS Certified Solutions Architect"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Issuing Organization</label>
                  <input
                    type="text"
                    value={cert.issuer}
                    onChange={(e) => updateListItem('certifications', cert.id, { issuer: e.target.value })}
                    placeholder="e.g., Amazon Web Services"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Issue Date</label>
                  <input
                    type="text"
                    value={cert.date}
                    onChange={(e) => updateListItem('certifications', cert.id, { date: e.target.value })}
                    placeholder="e.g., Jan 2023"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Credential ID (Optional)</label>
                  <input
                    type="text"
                    value={cert.credentialId}
                    onChange={(e) => updateListItem('certifications', cert.id, { credentialId: e.target.value })}
                    placeholder="e.g., ABC-12345"
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-medium text-gray-500 dark:text-gray-400 mb-1">Credential URL (Optional)</label>
                  <input
                    type="text"
                    value={cert.url}
                    onChange={(e) => updateListItem('certifications', cert.id, { url: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
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

export default CertificationsForm;
