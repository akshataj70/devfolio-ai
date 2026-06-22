// Mock service - will be replaced with real API calls
class SyncService {
  constructor() {
    this.syncListeners = [];
    this.isConnected = true;
  }

  // Add listener for sync events
  addListener(callback) {
    this.syncListeners.push(callback);
    return () => {
      this.syncListeners = this.syncListeners.filter(cb => cb !== callback);
    };
  }

  // Notify all listeners
  notifyListeners(data) {
    this.syncListeners.forEach(callback => callback(data));
  }

  // Sync data to backend
  async syncToBackend(data) {
    console.log('🔄 Syncing to backend:', data);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('✅ Sync successful');
        resolve({ success: true, data });
      }, 1000);
    });
  }

  // Sync data from backend
  async syncFromBackend(userId) {
    console.log('🔄 Syncing from backend for user:', userId);
    
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('✅ Sync from backend successful');
        resolve({
          success: true,
          data: {
            personal: { firstName: 'Akash', lastName: 'Kumar' },
            skills: ['React', 'Node.js', 'Python'],
            experience: [],
            projects: [],
          }
        });
      }, 1000);
    });
  }

  // Auto-sync every X seconds
  startAutoSync(interval = 30000) {
    this.autoSyncInterval = setInterval(() => {
      if (this.isConnected) {
        console.log('🔄 Auto-sync triggered');
        this.notifyListeners({ type: 'AUTO_SYNC', timestamp: new Date() });
      }
    }, interval);
  }

  stopAutoSync() {
    if (this.autoSyncInterval) {
      clearInterval(this.autoSyncInterval);
      this.autoSyncInterval = null;
    }
  }

  // Check connection status
  checkConnection() {
    // Simulate connection check
    this.isConnected = true;
    return this.isConnected;
  }

  // Get sync status
  getStatus() {
    return {
      connected: this.isConnected,
      listeners: this.syncListeners.length,
      autoSync: !!this.autoSyncInterval,
    };
  }
}

// Export singleton
export const syncService = new SyncService();