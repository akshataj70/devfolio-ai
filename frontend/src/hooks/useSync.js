import { useSync } from '../context/SyncContext';

export const useSyncData = () => {
  const { 
    resumeData, 
    portfolioData, 
    isSyncing, 
    lastSynced, 
    syncData, 
    updateSection 
  } = useSync();

  // Sync skills
  const syncSkills = (skills) => {
    updateSection('skills', skills);
  };

  // Sync experience
  const syncExperience = (experience) => {
    updateSection('experience', experience);
  };

  // Sync projects
  const syncProjects = (projects) => {
    updateSection('projects', projects);
  };

  // Sync education
  const syncEducation = (education) => {
    updateSection('education', education);
  };

  // Sync certifications
  const syncCertifications = (certifications) => {
    updateSection('certifications', certifications);
  };

  // Sync personal info
  const syncPersonal = (personal) => {
    updateSection('personal', personal);
  };

  // Get sync status
  const getSyncStatus = () => {
    if (isSyncing) return 'syncing';
    if (lastSynced) return 'synced';
    return 'unsynced';
  };

  // Get last synced time
  const getLastSyncedTime = () => {
    if (!lastSynced) return 'Never';
    const date = new Date(lastSynced);
    return date.toLocaleString();
  };

  return {
    // Data
    resumeData,
    portfolioData,
    
    // Status
    isSyncing,
    lastSynced,
    getSyncStatus,
    getLastSyncedTime,
    
    // Methods
    syncData,
    syncSkills,
    syncExperience,
    syncProjects,
    syncEducation,
    syncCertifications,
    syncPersonal,
    updateSection,
  };
};