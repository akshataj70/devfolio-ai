import { useState } from 'react';
import { 
  FiUser, 
  FiTrash2, 
  FiLock,
  FiChevronRight,
} from 'react-icons/fi';
import { MdPalette } from 'react-icons/md';
import Sidebar from '../components/dashboard/Sidebar';
import ProfileSettings from '../components/settings/ProfileSettings';
import ChangePassword from '../components/settings/ChangePassword';
import ThemeSettings from '../components/settings/ThemeSettings';
import DeleteAccount from '../components/settings/DeleteAccount';
import { useAuthStore } from '../stores/useAuthStore';

const Settings = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const { user } = useAuthStore();

  const tabs = [
    { id: 'profile', label: 'Profile', icon: FiUser },
    { id: 'password', label: 'Change Password', icon: FiLock },
    { id: 'theme', label: 'Theme', icon: MdPalette },
    { id: 'delete', label: 'Delete Account', icon: FiTrash2, danger: true },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <ProfileSettings />;
      case 'password':
        return <ChangePassword />;
      case 'theme':
        return <ThemeSettings />;
      case 'delete':
        return <DeleteAccount />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 overflow-hidden">
      <Sidebar />

      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
            Settings
          </h1>
          <div className="text-sm font-medium text-gray-700 dark:text-gray-300">
            {user?.email}
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Account Preferences</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Configure your profile, security credentials, and dashboard styling.</p>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
              {/* Tabs Sidebar */}
              <div className="w-full md:w-64 flex-shrink-0">
                <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`
                          w-full flex items-center gap-3 px-4 py-3.5 text-sm font-medium transition-all
                          ${isActive 
                            ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold' 
                            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                          }
                          ${tab.danger && !isActive ? 'text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20' : ''}
                          border-b border-gray-100 dark:border-gray-700 last:border-0
                        `}
                      >
                        <Icon size={18} />
                        <span className="flex-1 text-left">{tab.label}</span>
                        <FiChevronRight size={16} className={`${isActive ? 'opacity-100' : 'opacity-30'}`} />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Tab Panel */}
              <div className="flex-1 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm overflow-hidden">
                {renderContent()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;