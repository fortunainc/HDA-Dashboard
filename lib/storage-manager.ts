/**
 * Centralized Storage Manager for Dashboard
 * Handles all localStorage operations with error handling and consistency
 */

export class StorageManager {
  private static instance: StorageManager;

  private constructor() {}

  static getInstance(): StorageManager {
    if (!StorageManager.instance) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  // Generic get with default value
  get<T>(key: string, defaultValue: T): T {
    if (typeof window === 'undefined') return defaultValue;
    
    try {
      const item = localStorage.getItem(key);
      if (item === null) return defaultValue;
      return JSON.parse(item);
    } catch (error) {
      console.error(`Error reading from localStorage (${key}):`, error);
      return defaultValue;
    }
  }

  // Generic set with error handling
  set<T>(key: string, value: T): boolean {
    if (typeof window === 'undefined') return false;
    
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error writing to localStorage (${key}):`, error);
      return false;
    }
  }

  // Remove item
  remove(key: string): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage (${key}):`, error);
    }
  }

  // Clear all dashboard data
  clearAll(): void {
    if (typeof window === 'undefined') return;
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith('hda_') || 
          ['campaigns', 'leads', 'contacts', 'bookings', 'partnerships', 
           'industries', 'targets', 'competitors', 'pr_campaigns', 'media_contacts'].includes(key)) {
        localStorage.removeItem(key);
      }
    });
  }

  // Specific getters/setters for each data type
  getCampaigns() {
    return this.get('campaigns', []);
  }
  
  setCampaigns(value: any) {
    return this.set('campaigns', value);
  }

  getLeads() {
    return this.get('leads', []);
  }
  
  setLeads(value: any) {
    return this.set('leads', value);
  }

  getContacts() {
    return this.get('contacts', []);
  }
  
  setContacts(value: any) {
    return this.set('contacts', value);
  }

  getBookings() {
    return this.get('bookings', []);
  }
  
  setBookings(value: any) {
    return this.set('bookings', value);
  }

  getPartnerships() {
    return this.get('partnerships', []);
  }
  
  setPartnerships(value: any) {
    return this.set('partnerships', value);
  }

  getIndustries() {
    return this.get('industries', []);
  }
  
  setIndustries(value: any) {
    return this.set('industries', value);
  }

  getTargets() {
    return this.get('targets', []);
  }
  
  setTargets(value: any) {
    return this.set('targets', value);
  }

  getCompetitors() {
    return this.get('competitors', []);
  }
  
  setCompetitors(value: any) {
    return this.set('competitors', value);
  }

  getPRCampaigns() {
    return this.get('pr_campaigns', []);
  }
  
  setPRCampaigns(value: any) {
    return this.set('pr_campaigns', value);
  }

  getMediaContacts() {
    return this.get('media_contacts', []);
  }
  
  setMediaContacts(value: any) {
    return this.set('media_contacts', value);
  }

  getMessages() {
    return this.get('messages', []);
  }
  
  setMessages(value: any) {
    return this.set('messages', value);
  }

  getPipelineItems() {
    return this.get('pipeline_items', []);
  }
  
  setPipelineItems(value: any) {
    return this.set('pipeline_items', value);
  }
}

export const storage = StorageManager.getInstance();