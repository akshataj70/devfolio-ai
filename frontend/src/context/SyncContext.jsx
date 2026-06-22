import { createContext, useContext, useState, useEffect } from 'react';

const SyncContext = createContext(null);

export const SyncProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(null);
  const [portfolioData, setPortfolioData] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSynced, setLastSynced] = useState(null);

  // Sync function - updates both resume and portfolio
  const syncData = (newData) => {
    setIsSyncing(true);
    
    // Update resume data
    setResumeData(newData);
    
    // Update portfolio data (same data, different format)
    setPortfolioData(newData);
    
    // Record sync time
    setLastSynced(new Date().toISOString());
    
    setIsSyncing(false);
    
    console.log('✅ Synced data at:', new Date().toLocaleTimeString());
  };

  // Update specific section (skills, projects, experience)
  const updateSection = (section, data) => {
    if (!resumeData) return;
    
    const updated = {
      ...resumeData,
      [section]: data,
    };
    
    syncData(updated);
  };

  const value = {
    resumeData,
    portfolioData,
    isSyncing,
    lastSynced,
    syncData,
    updateSection,
    setResumeData,
    setPortfolioData,
  };

  return (
    <SyncContext.Provider value={value}>
      {children}
    </SyncContext.Provider>
  );
};

export const useSync = () => {
  const context = useContext(SyncContext);
  if (!context) {
    throw new Error('useSync must be used within a SyncProvider');
  }
  return context;
};