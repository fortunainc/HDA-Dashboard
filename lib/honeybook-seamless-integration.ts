/**
 * Seamless HoneyBook Integration for Dashboard
 * Provides bidirectional sync between HoneyBook and dashboard storage
 */

export interface HoneyBookContact {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  notes?: string;
  created_at: Date;
  updated_at: Date;
}

export interface HoneyBookMessage {
  id: string;
  contact_id: string;
  subject: string;
  body: string;
  from: string;
  to: string[];
  sent_at: Date;
  read: boolean;
  thread_id?: string;
}

export interface HoneyBookBooking {
  id: string;
  client_id: string;
  project_id: string;
  title: string;
  start_time: Date;
  end_time: Date;
  location?: string;
  description?: string;
  status: 'confirmed' | 'pending' | 'cancelled' | 'completed';
  created_at: Date;
  updated_at: Date;
}

class HoneyBookSeamlessIntegration {
  private apiKey: string = '';
  private baseUrl = 'https://api.honeybook.com/v0';
  private storageKeys = {
    contacts: 'honeybook_contacts',
    messages: 'honeybook_messages',
    bookings: 'honeybook_bookings',
    lastSync: 'honeybook_last_sync',
    apiKey: 'honeybook_api_key',
  };

  constructor() {
    // Load API key from localStorage
    if (typeof window !== 'undefined') {
      this.apiKey = localStorage.getItem(this.storageKeys.apiKey) || '';
    }
  }

  /**
   * Set HoneyBook API key
   */
  setApiKey(apiKey: string): void {
    this.apiKey = apiKey;
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKeys.apiKey, apiKey);
    }
  }

  /**
   * Get HoneyBook API key
   */
  getApiKey(): string {
    return this.apiKey;
  }

  /**
   * Test HoneyBook API connection
   */
  async testConnection(): Promise<boolean> {
    if (!this.apiKey) {
      return false;
    }

    try {
      const response = await fetch(`${this.baseUrl}/me`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      return response.ok;
    } catch (error) {
      console.error('HoneyBook connection test failed:', error);
      return false;
    }
  }

  /**
   * Fetch contacts from HoneyBook API
   */
  async fetchContacts(): Promise<HoneyBookContact[]> {
    if (!this.apiKey) {
      return this.getLocalContacts();
    }

    try {
      const response = await fetch(`${this.baseUrl}/contacts`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch contacts');
      }

      const data = await response.json();
      const contacts: HoneyBookContact[] = data.data?.contacts || [];

      // Save to localStorage
      this.saveContacts(contacts);

      return contacts;
    } catch (error) {
      console.error('Error fetching contacts from HoneyBook:', error);
      return this.getLocalContacts();
    }
  }

  /**
   * Fetch messages from HoneyBook API
   */
  async fetchMessages(): Promise<HoneyBookMessage[]> {
    if (!this.apiKey) {
      return this.getLocalMessages();
    }

    try {
      const response = await fetch(`${this.baseUrl}/messages`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await response.json();
      const messages: HoneyBookMessage[] = data.data?.messages || [];

      // Save to localStorage
      this.saveMessages(messages);

      return messages;
    } catch (error) {
      console.error('Error fetching messages from HoneyBook:', error);
      return this.getLocalMessages();
    }
  }

  /**
   * Fetch bookings from HoneyBook API
   */
  async fetchBookings(): Promise<HoneyBookBooking[]> {
    if (!this.apiKey) {
      return this.getLocalBookings();
    }

    try {
      const response = await fetch(`${this.baseUrl}/projects/bookings`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }

      const data = await response.json();
      const bookings: HoneyBookBooking[] = data.data?.bookings || [];

      // Save to localStorage
      this.saveBookings(bookings);

      return bookings;
    } catch (error) {
      console.error('Error fetching bookings from HoneyBook:', error);
      return this.getLocalBookings();
    }
  }

  /**
   * Sync all data from HoneyBook
   */
  async syncAll(): Promise<{ success: boolean; contacts: number; messages: number; bookings: number }> {
    try {
      const [contacts, messages, bookings] = await Promise.all([
        this.fetchContacts(),
        this.fetchMessages(),
        this.fetchBookings(),
      ]);

      // Update last sync time
      if (typeof window !== 'undefined') {
        localStorage.setItem(this.storageKeys.lastSync, new Date().toISOString());
      }

      return {
        success: true,
        contacts: contacts.length,
        messages: messages.length,
        bookings: bookings.length,
      };
    } catch (error) {
      console.error('Error syncing data from HoneyBook:', error);
      return {
        success: false,
        contacts: 0,
        messages: 0,
        bookings: 0,
      };
    }
  }

  /**
   * Save contacts to localStorage
   */
  saveContacts(contacts: HoneyBookContact[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKeys.contacts, JSON.stringify(contacts));
    }
  }

  /**
   * Save messages to localStorage
   */
  saveMessages(messages: HoneyBookMessage[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKeys.messages, JSON.stringify(messages));
    }
  }

  /**
   * Save bookings to localStorage
   */
  saveBookings(bookings: HoneyBookBooking[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.storageKeys.bookings, JSON.stringify(bookings));
    }
  }

  /**
   * Get local contacts from localStorage
   */
  getLocalContacts(): HoneyBookContact[] {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.storageKeys.contacts);
      if (data) {
        try {
          return JSON.parse(data);
        } catch (e) {
          console.error('Error parsing local contacts:', e);
        }
      }
    }
    return [];
  }

  /**
   * Get local messages from localStorage
   */
  getLocalMessages(): HoneyBookMessage[] {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.storageKeys.messages);
      if (data) {
        try {
          return JSON.parse(data);
        } catch (e) {
          console.error('Error parsing local messages:', e);
        }
      }
    }
    return [];
  }

  /**
   * Get local bookings from localStorage
   */
  getLocalBookings(): HoneyBookBooking[] {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.storageKeys.bookings);
      if (data) {
        try {
          return JSON.parse(data);
        } catch (e) {
          console.error('Error parsing local bookings:', e);
        }
      }
    }
    return [];
  }

  /**
   * Get last sync time
   */
  getLastSync(): Date | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(this.storageKeys.lastSync);
      if (data) {
        return new Date(data);
      }
    }
    return null;
  }

  /**
   * Clear all local HoneyBook data
   */
  clearLocalData(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKeys.contacts);
      localStorage.removeItem(this.storageKeys.messages);
      localStorage.removeItem(this.storageKeys.bookings);
      localStorage.removeItem(this.storageKeys.lastSync);
    }
  }

  /**
   * Create a new contact (saves locally, syncs to HoneyBook if API key available)
   */
  async createContact(contact: Omit<HoneyBookContact, 'id' | 'created_at' | 'updated_at'>): Promise<HoneyBookContact | null> {
    const newContact: HoneyBookContact = {
      ...contact,
      id: `local_${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Save locally
    const contacts = this.getLocalContacts();
    contacts.push(newContact);
    this.saveContacts(contacts);

    // Sync to HoneyBook if API key available
    if (this.apiKey) {
      try {
        const response = await fetch(`${this.baseUrl}/contacts`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(contact),
        });

        if (response.ok) {
          const data = await response.json();
          const honeybookContact = data.data.contact;
          
          // Update local contact with HoneyBook ID
          newContact.id = honeybookContact.id;
          const updatedContacts = contacts.map(c => 
            c.id === newContact.id ? newContact : c
          );
          this.saveContacts(updatedContacts);
        }
      } catch (error) {
        console.error('Error creating contact in HoneyBook:', error);
      }
    }

    return newContact;
  }

  /**
   * Create a new booking (saves locally, syncs to HoneyBook if API key available)
   */
  async createBooking(booking: Omit<HoneyBookBooking, 'id' | 'created_at' | 'updated_at'>): Promise<HoneyBookBooking | null> {
    const newBooking: HoneyBookBooking = {
      ...booking,
      id: `local_${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
    };

    // Save locally
    const bookings = this.getLocalBookings();
    bookings.push(newBooking);
    this.saveBookings(bookings);

    // Sync to HoneyBook if API key available
    if (this.apiKey) {
      try {
        const response = await fetch(`${this.baseUrl}/projects/${booking.project_id}/bookings`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: booking.title,
            start_time: booking.start_time.toISOString(),
            end_time: booking.end_time.toISOString(),
            location: booking.location,
            description: booking.description,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          const honeybookBooking = data.data.booking;
          
          // Update local booking with HoneyBook ID
          newBooking.id = honeybookBooking.id;
          const updatedBookings = bookings.map(b => 
            b.id === newBooking.id ? newBooking : b
          );
          this.saveBookings(updatedBookings);
        }
      } catch (error) {
        console.error('Error creating booking in HoneyBook:', error);
      }
    }

    return newBooking;
  }
}

// Export singleton instance
export const honeybookSeamless = new HoneyBookSeamlessIntegration();