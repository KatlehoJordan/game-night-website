/**
 * Data Storage and Persistence Layer
 * Handles all data operations using localStorage
 */

class Storage {
  static STORAGE_KEYS = {
    EVENTS: 'gameNightEvents',
    USER_PREFERENCES: 'userPreferences',
    CURRENT_USER: 'currentUser'
  };

  /**
   * Create a new game night event
   */
  static createEvent(eventData) {
    try {
      // Validate event data
      const validation = this.validateEventData(eventData);
      if (!validation.valid) {
        throw new Error(`Invalid event data: ${validation.errors.join(', ')}`);
      }

      // Generate unique ID and add metadata
      const event = {
        ...eventData,
        id: this.generateId(),
        guests: [],
        metadata: {
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          version: 1
        }
      };

      // Get existing events
      const events = this.getAllEvents();
      
      // Add new event
      events.push(event);
      
      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEYS.EVENTS, JSON.stringify(events));
      
      return event;
    } catch (error) {
      console.error('Error creating event:', error);
      return null;
    }
  }

  /**
   * Get event by ID
   */
  static getEvent(eventId) {
    try {
      const events = this.getAllEvents();
      return events.find(event => event.id === eventId) || null;
    } catch (error) {
      console.error('Error getting event:', error);
      return null;
    }
  }

  /**
   * Update existing event
   */
  static updateEvent(eventId, updates) {
    try {
      const events = this.getAllEvents();
      const eventIndex = events.findIndex(event => event.id === eventId);
      
      if (eventIndex === -1) {
        return null;
      }

      // Update the event
      const updatedEvent = {
        ...events[eventIndex],
        ...updates,
        metadata: {
          ...events[eventIndex].metadata,
          updatedAt: new Date().toISOString(),
          version: (events[eventIndex].metadata.version || 1) + 1
        }
      };

      // Validate updated data
      const validation = this.validateEventData(updatedEvent);
      if (!validation.valid) {
        throw new Error(`Invalid event data: ${validation.errors.join(', ')}`);
      }

      events[eventIndex] = updatedEvent;
      
      // Save to localStorage
      localStorage.setItem(this.STORAGE_KEYS.EVENTS, JSON.stringify(events));
      
      return updatedEvent;
    } catch (error) {
      console.error('Error updating event:', error);
      return null;
    }
  }

  /**
   * Delete event
   */
  static deleteEvent(eventId) {
    try {
      const events = this.getAllEvents();
      const filteredEvents = events.filter(event => event.id !== eventId);
      
      if (filteredEvents.length === events.length) {
        return false; // Event not found
      }
      
      localStorage.setItem(this.STORAGE_KEYS.EVENTS, JSON.stringify(filteredEvents));
      return true;
    } catch (error) {
      console.error('Error deleting event:', error);
      return false;
    }
  }

  /**
   * Get all events
   */
  static getAllEvents() {
    try {
      const eventsJson = localStorage.getItem(this.STORAGE_KEYS.EVENTS);
      return eventsJson ? JSON.parse(eventsJson) : [];
    } catch (error) {
      console.error('Error getting all events:', error);
      return [];
    }
  }

  /**
   * Get events by date range
   */
  static getEventsByDateRange(startDate, endDate) {
    try {
      const events = this.getAllEvents();
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate >= start && eventDate <= end;
      });
    } catch (error) {
      console.error('Error getting events by date range:', error);
      return [];
    }
  }

  /**
   * Get events for a specific date
   */
  static getEventsByDate(date) {
    try {
      const events = this.getAllEvents();
      const targetDate = new Date(date);
      
      return events.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === targetDate.toDateString();
      });
    } catch (error) {
      console.error('Error getting events by date:', error);
      return [];
    }
  }

  /**
   * Add guest to event
   */
  static addGuest(eventId, guestData) {
    try {
      const event = this.getEvent(eventId);
      if (!event) {
        throw new Error('Event not found');
      }

      // Check if event is full
      if (event.guests.length >= event.maxGuests) {
        throw new Error('Event is full');
      }

      // Check if guest already exists (by name for simplicity)
      const existingGuest = event.guests.find(guest => 
        guest.name.toLowerCase() === guestData.name.toLowerCase()
      );
      
      if (existingGuest) {
        throw new Error('Guest already registered');
      }

      // Add guest with ID and timestamp
      const guest = {
        ...guestData,
        id: this.generateId(),
        rsvpDate: new Date().toISOString(),
        status: 'confirmed'
      };

      event.guests.push(guest);
      
      // Update the event
      return this.updateEvent(eventId, { guests: event.guests });
    } catch (error) {
      console.error('Error adding guest:', error);
      return null;
    }
  }

  /**
   * Remove guest from event
   */
  static removeGuest(eventId, guestId) {
    try {
      const event = this.getEvent(eventId);
      if (!event) {
        return null;
      }

      const filteredGuests = event.guests.filter(guest => guest.id !== guestId);
      
      if (filteredGuests.length === event.guests.length) {
        throw new Error('Guest not found');
      }
      
      return this.updateEvent(eventId, { guests: filteredGuests });
    } catch (error) {
      console.error('Error removing guest:', error);
      return null;
    }
  }

  /**
   * Update guest information
   */
  static updateGuest(eventId, guestId, updates) {
    try {
      const event = this.getEvent(eventId);
      if (!event) {
        return null;
      }

      const guestIndex = event.guests.findIndex(guest => guest.id === guestId);
      if (guestIndex === -1) {
        throw new Error('Guest not found');
      }

      // Update guest
      event.guests[guestIndex] = {
        ...event.guests[guestIndex],
        ...updates
      };
      
      return this.updateEvent(eventId, { guests: event.guests });
    } catch (error) {
      console.error('Error updating guest:', error);
      return null;
    }
  }

  /**
   * Check if user is registered for event
   */
  static isUserRegistered(eventId, userName) {
    try {
      const event = this.getEvent(eventId);
      if (!event) {
        return false;
      }

      return event.guests.some(guest => 
        guest.name.toLowerCase() === userName.toLowerCase()
      );
    } catch (error) {
      console.error('Error checking user registration:', error);
      return false;
    }
  }

  /**
   * Get user preferences
   */
  static getUserPreferences() {
    try {
      const prefsJson = localStorage.getItem(this.STORAGE_KEYS.USER_PREFERENCES);
      return prefsJson ? JSON.parse(prefsJson) : {
        displayName: '',
        defaultSettings: {
          maxGuests: 6,
          defaultDuration: 180,
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        },
        notifications: {
          reminders: true,
          updates: true
        },
        theme: 'dark'
      };
    } catch (error) {
      console.error('Error getting user preferences:', error);
      return {};
    }
  }

  /**
   * Update user preferences
   */
  static updateUserPreferences(updates) {
    try {
      const currentPrefs = this.getUserPreferences();
      const updatedPrefs = { ...currentPrefs, ...updates };
      
      localStorage.setItem(this.STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(updatedPrefs));
      return updatedPrefs;
    } catch (error) {
      console.error('Error updating user preferences:', error);
      return null;
    }
  }

  /**
   * Get current user
   */
  static getCurrentUser() {
    try {
      const userJson = localStorage.getItem(this.STORAGE_KEYS.CURRENT_USER);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      console.error('Error getting current user:', error);
      return null;
    }
  }

  /**
   * Set current user
   */
  static setCurrentUser(user) {
    try {
      localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
      return user;
    } catch (error) {
      console.error('Error setting current user:', error);
      return null;
    }
  }

  /**
   * Generate unique ID
   */
  static generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9);
  }

  /**
   * Validate event data
   */
  static validateEventData(data) {
    const errors = [];

    if (!data.title || data.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters long');
    }

    if (!data.date || isNaN(new Date(data.date).getTime())) {
      errors.push('Valid date is required');
    }

    if (!data.maxGuests || data.maxGuests < 1 || data.maxGuests > 50) {
      errors.push('Max guests must be between 1 and 50');
    }

    if (!data.host || !data.host.name || data.host.name.trim().length < 2) {
      errors.push('Host name is required');
    }

    // Check if date is in the future for new events
    if (data.date && !data.id) {
      const eventDate = new Date(data.date);
      const now = new Date();
      if (eventDate < now) {
        errors.push('Event date must be in the future');
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Export data for backup
   */
  static exportData() {
    try {
      return {
        events: this.getAllEvents(),
        userPreferences: this.getUserPreferences(),
        currentUser: this.getCurrentUser(),
        exportDate: new Date().toISOString()
      };
    } catch (error) {
      console.error('Error exporting data:', error);
      return null;
    }
  }

  /**
   * Import data from backup
   */
  static importData(data) {
    try {
      if (data.events) {
        localStorage.setItem(this.STORAGE_KEYS.EVENTS, JSON.stringify(data.events));
      }
      if (data.userPreferences) {
        localStorage.setItem(this.STORAGE_KEYS.USER_PREFERENCES, JSON.stringify(data.userPreferences));
      }
      if (data.currentUser) {
        localStorage.setItem(this.STORAGE_KEYS.CURRENT_USER, JSON.stringify(data.currentUser));
      }
      return true;
    } catch (error) {
      console.error('Error importing data:', error);
      return false;
    }
  }

  /**
   * Clear all data
   */
  static clearAllData() {
    try {
      localStorage.removeItem(this.STORAGE_KEYS.EVENTS);
      localStorage.removeItem(this.STORAGE_KEYS.USER_PREFERENCES);
      localStorage.removeItem(this.STORAGE_KEYS.CURRENT_USER);
      return true;
    } catch (error) {
      console.error('Error clearing data:', error);
      return false;
    }
  }

  /**
   * Get storage usage statistics
   */
  static getStorageStats() {
    try {
      const events = this.getAllEvents();
      const totalEvents = events.length;
      const upcomingEvents = events.filter(event => new Date(event.date) > new Date()).length;
      const totalGuests = events.reduce((sum, event) => sum + event.guests.length, 0);
      
      return {
        totalEvents,
        upcomingEvents,
        pastEvents: totalEvents - upcomingEvents,
        totalGuests,
        storageUsed: this._getStorageSize()
      };
    } catch (error) {
      console.error('Error getting storage stats:', error);
      return null;
    }
  }

  /**
   * Get approximate storage size in bytes
   */
  static _getStorageSize() {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key) && key.startsWith('gameNight')) {
        total += localStorage.getItem(key).length;
      }
    }
    return total;
  }
}

// Make Storage globally available
window.Storage = Storage;