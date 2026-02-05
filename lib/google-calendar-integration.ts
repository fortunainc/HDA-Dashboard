/**
 * Google Calendar Integration for Dashboard
 * Handles calendar sync, booking management, and event creation
 */

export interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  start: Date;
  end: Date;
  location?: string;
  attendees?: string[];
  status: 'confirmed' | 'pending' | 'cancelled';
}

export interface GoogleCalendarConfig {
  clientId: string;
  apiKey: string;
  scope: string;
  discoveryDocs: string[];
}

class GoogleCalendarIntegration {
  private config: GoogleCalendarConfig;
  private tokenClient: any = null;
  private gapiInited = false;
  private gisInited = false;

  constructor() {
    this.config = {
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_API_KEY || '',
      scope: 'https://www.googleapis.com/auth/calendar.events',
      discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest'],
    };
  }

  /**
   * Initialize Google Calendar API
   */
  async initialize(): Promise<boolean> {
    try {
      // Check if Google API is available
      const gapi = (window as any).gapi;
      if (typeof gapi === 'undefined') {
        console.warn('Google API not loaded');
        return false;
      }

      await gapi.client.init({
        apiKey: this.config.apiKey,
        discoveryDocs: this.config.discoveryDocs,
      });

      this.gapiInited = true;
      return true;
    } catch (error) {
      console.error('Error initializing Google Calendar:', error);
      return false;
    }
  }

  /**
   * Handle Google Sign-In
   */
  async signIn(): Promise<string | null> {
    try {
      const gapi = (window as any).gapi;
      const token = gapi.client.getToken();
      if (token) {
        return token.access_token;
      }

      // If no token, show sign-in popup
      // This would require OAuth flow implementation
      return null;
    } catch (error) {
      console.error('Error signing in to Google Calendar:', error);
      return null;
    }
  }

  /**
   * Create a calendar event
   */
  async createEvent(event: CalendarEvent): Promise<string | null> {
    const gapi = (window as any).gapi;
    try {
      const token = await this.signIn();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const gapi = (window as any).gapi;
      const eventBody = {
        summary: event.title,
        description: event.description,
        start: {
          dateTime: event.start.toISOString(),
        },
        end: {
          dateTime: event.end.toISOString(),
        },
        location: event.location,
        attendees: event.attendees?.map(email => ({ email })),
        status: event.status,
      };

      const response = await gapi.client.calendar.events.insert({
        calendarId: 'primary',
        resource: eventBody,
      });

      return response.result.id;
    } catch (error) {
      console.error('Error creating calendar event:', error);
      return null;
    }
  }

  /**
   * Get calendar events for a date range
   */
  async getEvents(startDate: Date, endDate: Date): Promise<CalendarEvent[]> {
    const gapi = (window as any).gapi;
    try {
      const token = await this.signIn();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const response = await gapi.client.calendar.events.list({
        calendarId: 'primary',
        timeMin: startDate.toISOString(),
        timeMax: endDate.toISOString(),
        singleEvents: true,
        orderBy: 'startTime',
      });

      const events = response.result.items?.map((item: any) => ({
        id: item.id,
        title: item.summary,
        description: item.description,
        start: new Date(item.start.dateTime || item.start.date),
        end: new Date(item.end.dateTime || item.end.date),
        location: item.location,
        attendees: item.attendees?.map((a: any) => a.email),
        status: item.status,
      })) || [];

      return events;
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return [];
    }
  }

  /**
   * Update a calendar event
   */
  async updateEvent(eventId: string, event: Partial<CalendarEvent>): Promise<boolean> {
    const gapi = (window as any).gapi;
    try {
      const token = await this.signIn();
      if (!token) {
        throw new Error('Not authenticated');
      }

      const eventBody: any = {};
      if (event.title) eventBody.summary = event.title;
      if (event.description) eventBody.description = event.description;
      if (event.start) eventBody.start = { dateTime: event.start.toISOString() };
      if (event.end) eventBody.end = { dateTime: event.end.toISOString() };
      if (event.location) eventBody.location = event.location;
      if (event.status) eventBody.status = event.status;

      await gapi.client.calendar.events.patch({
        calendarId: 'primary',
        eventId: eventId,
        resource: eventBody,
      });

      return true;
    } catch (error) {
      console.error('Error updating calendar event:', error);
      return false;
    }
  }

  /**
   * Delete a calendar event
   */
  async deleteEvent(eventId: string): Promise<boolean> {
    const gapi = (window as any).gapi;
    try {
      const token = await this.signIn();
      if (!token) {
        throw new Error('Not authenticated');
      }

      await gapi.client.calendar.events.delete({
        calendarId: 'primary',
        eventId: eventId,
      });

      return true;
    } catch (error) {
      console.error('Error deleting calendar event:', error);
      return false;
    }
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const gapi = (window as any).gapi;
    return gapi.client.getToken() !== null;
  }

  /**
   * Sign out from Google Calendar
   */
  async signOut(): Promise<void> {
    try {
      const gapi = (window as any).gapi;
      const token = gapi.client.getToken();
      if (token) {
        gapi.client.setToken('');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  }
}

// Export singleton instance
export const googleCalendar = new GoogleCalendarIntegration();