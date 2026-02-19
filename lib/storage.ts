// Simple Local Storage Implementation for Data Persistence
// This will save all dashboard data to the browser's localStorage

export interface StorageData {
  leads: any[];
  pipeline: any[];
  campaigns: any[];
  competitors: any[];
  contacts: any[];
  bookings: any[];
  partnerships: any[];
  industries: any[];
  targets: any[];
  prCampaigns: any[];
  mediaContacts: any[];
  user: {
    name: string;
    email: string;
    company: string;
  };
}

const STORAGE_KEY = 'hda_dashboard_data';

// Default data structure
const DEFAULT_DATA: StorageData = {
  leads: [],
  pipeline: [],
  campaigns: [],
  competitors: [],
  contacts: [],
  bookings: [],
  partnerships: [],
  industries: [],
  targets: [],
  prCampaigns: [],
  mediaContacts: [],
  user: {
    name: '',
    email: '',
    company: ''
  }
};

// Get all data from localStorage
export function getStorageData(): StorageData {
  if (typeof window === 'undefined') {
    return DEFAULT_DATA;
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error reading from localStorage:', error);
  }

  return DEFAULT_DATA;
}

// Save all data to localStorage
export function saveStorageData(data: StorageData): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

// Get specific data type
export function getData<T extends keyof StorageData>(key: T): StorageData[T] {
  const data = getStorageData();
  return data[key] || DEFAULT_DATA[key];
}

// Save specific data type
export function saveData<T extends keyof StorageData>(key: T, value: StorageData[T]): void {
  const data = getStorageData();
  data[key] = value;
  saveStorageData(data);
}

// Clear all data
export function clearStorageData(): void {
  if (typeof window === 'undefined') {
    return;
  }

  localStorage.removeItem(STORAGE_KEY);
}

// Export data for backup
export function exportData(): string {
  const data = getStorageData();
  return JSON.stringify(data, null, 2);
}

// Import data from backup
export function importData(jsonString: string): boolean {
  try {
    const data = JSON.parse(jsonString);
    saveStorageData(data);
    return true;
  } catch (error) {
    console.error('Error importing data:', error);
    return false;
  }
}