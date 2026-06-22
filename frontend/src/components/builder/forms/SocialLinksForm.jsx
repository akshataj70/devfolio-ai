import { motion } from 'framer-motion';
import { useResumeStore } from '../../../stores/useResumeStore';
import { FiGithub, FiLinkedin, FiTwitter, FiGlobe } from 'react-icons/fi';

const SocialLinksForm = () => {
  const { resumeData, updatePersonal } = useResumeStore();
  const data = resumeData.personal;

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonal({ [name]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Social Links</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Add links to your professional profiles</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
            <FiLinkedin className="text-[#0077b5]" /> LinkedIn
          </label>
          <input
            type="url"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
            <FiGithub className="text-gray-900 dark:text-white" /> GitHub
          </label>
          <input
            type="url"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            placeholder="https://github.com/username"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
            <FiGlobe className="text-gray-500" /> Portfolio Website
          </label>
          <input
            type="url"
            name="website"
            value={data.website || ''}
            onChange={handleChange}
            placeholder="https://yourwebsite.com"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 flex items-center gap-2">
            <FiTwitter className="text-[#1DA1F2]" /> Twitter / X
          </label>
          <input
            type="url"
            name="twitter"
            value={data.twitter || ''}
            onChange={handleChange}
            placeholder="https://twitter.com/username"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default SocialLinksForm;
