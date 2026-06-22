import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiAlertTriangle, FiTrash2, FiX } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import { api } from '../../services/api';
import { useAuthStore } from '../../stores/useAuthStore';

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const [showConfirm, setShowConfirm] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      const res = await api.delete('/auth/delete-account');
      if (res.success) {
        toast.success('Account deleted successfully');
        logout();
        navigate('/');
      } else {
        throw new Error(res.message || 'Deletion failed');
      }
    } catch (err) {
      console.error(err);
      toast.error(err.message || 'Failed to delete account');
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-red-600 dark:text-red-400">Delete Account</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">Permanently delete your account and all data</p>
      </div>

      <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
            <FiAlertTriangle size={24} className="text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h3 className="font-medium text-red-800 dark:text-red-300">Warning: This action cannot be undone</h3>
            <p className="text-sm text-red-700 dark:text-red-400 mt-1">
              Deleting your account will permanently remove all your data including:
            </p>
            <ul className="text-sm text-red-700 dark:text-red-400 mt-2 space-y-1 list-disc list-inside">
              <li>All your resumes</li>
              <li>All your portfolios</li>
              <li>Your profile information</li>
            </ul>
          </div>
        </div>

        <button
          onClick={() => setShowConfirm(true)}
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors"
        >
          <FiTrash2 size={18} />
          Delete My Account
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-800 rounded-2xl max-w-md w-full p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Confirm Deletion</h3>
              <button
                onClick={() => setShowConfirm(false)}
                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <FiX size={20} className="text-gray-500 dark:text-gray-400" />
              </button>
            </div>

            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              Type <strong className="text-red-600 dark:text-red-400">delete my account</strong> to confirm:
            </p>

            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              placeholder='Type "delete my account"'
              className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />

            <div className="flex gap-3 mt-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={confirmText.toLowerCase() !== 'delete my account' || isDeleting}
                className="flex-1 px-4 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isDeleting ? 'Deleting...' : 'Delete Account'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default DeleteAccount;