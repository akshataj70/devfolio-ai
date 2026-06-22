import { motion } from 'framer-motion';
import { useResumeStore } from '../../../stores/useResumeStore';
import { FiUpload, FiX } from 'react-icons/fi';
import { useRef } from 'react';

const PersonalInfoForm = () => {
  const { resumeData, updatePersonal } = useResumeStore();
  const data = resumeData.personal;
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonal({ [name]: value });
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updatePersonal({ photo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => {
    updatePersonal({ photo: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Tell us about yourself</p>
        </div>

        {/* Photo Upload */}
        <div className="flex flex-col items-center">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handlePhotoUpload}
          />
          <div
            className="relative w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-blue-500 transition-colors"
            onClick={() => !data.photo && fileInputRef.current?.click()}
          >
            {data.photo ? (
              <>
                <img src={data.photo} alt="Profile" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <button onClick={removePhoto} className="text-white hover:text-red-400">
                    <FiX size={20} />
                  </button>
                </div>
              </>
            ) : (
              <>
                <FiUpload className="text-gray-400 group-hover:text-blue-500 mb-1" />
                <span className="text-[10px] text-gray-500 group-hover:text-blue-500">Photo</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* ─── FORM FIELDS ─── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
          <input
            type="text"
            name="firstName"
            value={data.firstName || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
          <input
            type="text"
            name="lastName"
            value={data.lastName || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Professional Title</label>
        <input
          type="text"
          name="title"
          value={data.title || ''}
          onChange={handleChange}
          placeholder="e.g., Senior Full Stack Developer"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Professional Summary</label>
        <textarea
          name="summary"
          value={data.summary || ''}
          onChange={handleChange}
          rows={4}
          placeholder="Write a brief summary of your professional background..."
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={data.email || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Phone</label>
          <input
            type="tel"
            name="phone"
            value={data.phone || ''}
            onChange={handleChange}
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
        <input
          type="text"
          name="location"
          value={data.location || ''}
          onChange={handleChange}
          placeholder="e.g., San Francisco, CA"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* ─── SOCIAL LINKS ─── */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">LinkedIn URL</label>
          <input
            type="text"
            name="linkedin"
            value={data.linkedin || ''}
            onChange={handleChange}
            placeholder="linkedin.com/in/username"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">GitHub URL</label>
          <input
            type="text"
            name="github"
            value={data.github || ''}
            onChange={handleChange}
            placeholder="github.com/username"
            className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Portfolio / Website</label>
        <input
          type="text"
          name="website"
          value={data.website || ''}
          onChange={handleChange}
          placeholder="yourportfolio.com"
          className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </motion.div>
  );
};

export default PersonalInfoForm;