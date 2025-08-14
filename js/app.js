/**
 * Main Application Controller
 * Coordinates all components and manages application state
 */

class App {
  constructor() {
    this.events = new Map();
    this.currentUser = null;
    this.components = {
      calendar: null,
      gameNightForm: null,
      eventModal: null,
      formModal: null
    };
    
    // Bind methods
    this.handleCreateEventClick = this.handleCreateEventClick.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.handleFormCancel = this.handleFormCancel.bind(this);
  }

  /**
   * Initialize the application
   */
  static async init() {
    console.log('🎮 Game Night Website starting...');
    
    const app = new App();
    window.app = app; // Make globally available for debugging
    
    // Initialize components
    await app.initializeComponents();
    
    // Set up global event listeners
    app.setupGlobalEventListeners();
    
    // Load initial data
    app.loadInitialData();
    
    console.log('✅ Application ready!');
    return app;
  }

  /**
   * Initialize all components
   */
  async initializeComponents() {
    // Wait for custom elements to be defined
    await Promise.all([
      customElements.whenDefined('game-night-calendar'),
      customElements.whenDefined('game-night-form')
    ]);

    // Get component references
    this.components.calendar = document.getElementById('calendar');
    this.components.eventModal = document.getElementById('eventModal');
    this.components.formModal = document.getElementById('formModal');
    this.components.gameNightForm = document.getElementById('gameNightForm');

    // Set up component event listeners
    this.setupComponentEventListeners();
  }

  /**
   * Set up global event listeners
   */
  setupGlobalEventListeners() {
    // Create Game Night button
    const createBtn = document.getElementById('createEventBtn');
    if (createBtn) {
      createBtn.addEventListener('click', this.handleCreateEventClick);
    }

    // Modal close buttons
    document.addEventListener('click', (event) => {
      if (event.target.matches('.modal__close')) {
        this.closeModal(event.target.closest('.modal'));
      }
      
      // Close modal when clicking outside
      if (event.target.matches('.modal')) {
        this.closeModal(event.target);
      }
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        this.closeAllModals();
      }
    });

    // Listen for storage changes from other tabs
    window.addEventListener('storage', (event) => {
      if (event.key === Storage.STORAGE_KEYS.EVENTS) {
        this.refreshCalendar();
      }
    });
  }

  /**
   * Set up component-specific event listeners
   */
  setupComponentEventListeners() {
    // Calendar events
    if (this.components.calendar) {
      this.components.calendar.addEventListener('dateClick', this.handleDateClick);
      this.components.calendar.addEventListener('eventClick', this.handleEventClick);
    }

    // Form events
    if (this.components.gameNightForm) {
      this.components.gameNightForm.addEventListener('formSubmit', this.handleFormSubmit);
      this.components.gameNightForm.addEventListener('formCancel', this.handleFormCancel);
    }
  }

  /**
   * Load initial data
   */
  loadInitialData() {
    // Check for shared events in URL
    this.checkForSharedEvents();
    
    // Load user preferences
    this.loadUserPreferences();
    
    // Refresh calendar with events
    this.refreshCalendar();
    
    // Load current user if available
    this.loadCurrentUser();
  }

  /**
   * Check for shared events in URL parameters
   */
  checkForSharedEvents() {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.has('event')) {
        // Show notification about shared event
        const sharedEvents = Storage.getSharedEventsFromURL();
        if (sharedEvents.length > 0) {
          const event = sharedEvents[0];
          this.showNotification(`Viewing shared event: "${event.title}"`, 'info');
          
          // Optionally auto-open the event details
          setTimeout(() => {
            this.showEventDetails(event.id);
          }, 1000);
        }
      }
    } catch (error) {
      console.error('Error checking for shared events:', error);
    }
  }

  /**
   * Load user preferences
   */
  loadUserPreferences() {
    if (typeof Storage !== 'undefined') {
      const preferences = Storage.getUserPreferences();
      // Apply theme, timezone, etc.
      if (preferences.theme && preferences.theme !== 'auto') {
        document.body.setAttribute('data-theme', preferences.theme);
      }
    }
  }

  /**
   * Load current user
   */
  loadCurrentUser() {
    if (typeof Storage !== 'undefined') {
      this.currentUser = Storage.getCurrentUser();
    }
  }

  /**
   * Refresh calendar display
   */
  refreshCalendar() {
    if (this.components.calendar && typeof Storage !== 'undefined') {
      const events = Storage.getAllEvents();
      this.components.calendar.setEvents(events);
    }
  }

  /**
   * Handle Create Game Night button click
   */
  handleCreateEventClick() {
    this.showCreateEventForm();
  }

  /**
   * Handle calendar date click
   */
  handleDateClick(event) {
    const { date } = event.detail;
    this.showCreateEventForm(date);
  }

  /**
   * Handle calendar event click
   */
  handleEventClick(event) {
    const { eventData } = event.detail;
    this.showEventDetails(eventData);
  }

  /**
   * Handle form submission
   */
  async handleFormSubmit(event) {
    const { eventData, isEdit, eventId } = event.detail;
    
    try {
      let result;
      
      if (isEdit && eventId) {
        // Update existing event
        result = Storage.updateEvent(eventId, eventData);
        if (result) {
          this.showNotification('Game night updated successfully!', 'success');
          this.emitEvent('gameNightUpdated', result);
        } else {
          throw new Error('Failed to update event');
        }
      } else {
        // Create new event
        result = Storage.createEvent(eventData);
        if (result) {
          this.showNotification('Game night created successfully!', 'success');
          this.emitEvent('gameNightCreated', result);
        } else {
          throw new Error('Failed to create event');
        }
      }
      
      // Close form and refresh calendar
      this.closeModal(this.components.formModal);
      this.refreshCalendar();
      
    } catch (error) {
      console.error('Error saving event:', error);
      this.showNotification('Error saving event. Please try again.', 'error');
    }
  }

  /**
   * Handle form cancellation
   */
  handleFormCancel() {
    this.closeModal(this.components.formModal);
  }

  /**
   * Show create event form
   */
  showCreateEventForm(date = null) {
    if (this.components.gameNightForm && this.components.formModal) {
      const formDate = date || new Date();
      this.components.gameNightForm.showCreateForm(formDate);
      this.openModal(this.components.formModal);
    }
  }

  /**
   * Show edit event form
   */
  showEditEventForm(eventId) {
    if (this.components.gameNightForm && this.components.formModal) {
      const success = this.components.gameNightForm.showEditForm(eventId);
      if (success) {
        this.openModal(this.components.formModal);
      } else {
        this.showNotification('Event not found', 'error');
      }
    }
  }

  /**
   * Show event details
   */
  showEventDetails(eventData) {
    if (this.components.eventModal) {
      this.renderEventDetails(eventData);
      this.openModal(this.components.eventModal);
    }
  }

  /**
   * Render event details in modal
   */
  renderEventDetails(event) {
    const eventDetails = this.components.eventModal.querySelector('#eventDetails');
    if (!eventDetails) return;

    const eventDate = new Date(event.date);
    const isPast = DateUtils.isPast(eventDate);
    const guests = event.guests || [];
    const isFull = guests.length >= event.maxGuests;
    const spotsLeft = event.maxGuests - guests.length;
    const isShared = event.isShared || false;

    eventDetails.innerHTML = `
      <div class="event-details">
        <div class="event-details__header">
          <h2 class="event-details__title">${this.escapeHtml(event.title)}</h2>
          <div class="event-details__badges">
            ${isPast ? '<span class="badge badge--error">Past Event</span>' : 
              isFull ? '<span class="badge badge--warning">Full</span>' : 
              '<span class="badge badge--success">Available</span>'}
            ${isShared ? '<span class="badge badge--info">Shared Event</span>' : ''}
          </div>
        </div>
        
        <div class="event-details__meta">
          <div class="event-meta-item">
            <div class="event-meta-item__label">Date</div>
            <div class="event-meta-item__value">${DateUtils.formatDate(eventDate, 'long')}</div>
          </div>
          <div class="event-meta-item">
            <div class="event-meta-item__label">Time</div>
            <div class="event-meta-item__value">${DateUtils.formatDate(eventDate, 'time')}</div>
          </div>
          <div class="event-meta-item">
            <div class="event-meta-item__label">Duration</div>
            <div class="event-meta-item__value">${DateUtils.formatDuration(event.duration)}</div>
          </div>
          <div class="event-meta-item">
            <div class="event-meta-item__label">Guests</div>
            <div class="event-meta-item__value">${guests.length}/${event.maxGuests}</div>
          </div>
        </div>
        
        ${event.description ? `
          <div class="event-details__description">
            <h3>Description</h3>
            <p>${this.escapeHtml(event.description)}</p>
          </div>
        ` : ''}
        
        <div class="guest-list">
          <div class="guest-list__header">
            <h3 class="guest-list__title">Attendees</h3>
            <span class="guest-list__count">${guests.length} guest${guests.length !== 1 ? 's' : ''}</span>
          </div>
          <div class="guest-list__items">
            ${guests.length > 0 ? 
              guests.map(guest => `
                <div class="guest-list__item">
                  <div class="guest-info">
                    <div class="guest-info__name">${this.escapeHtml(guest.name)}</div>
                    <div class="guest-info__meta">
                      Joined ${DateUtils.getRelativeTime(guest.rsvpDate)}
                      ${guest.dietary ? `• ${this.escapeHtml(guest.dietary)}` : ''}
                    </div>
                  </div>
                </div>
              `).join('') : 
              '<div class="guest-list__empty">No guests yet</div>'
            }
          </div>
        </div>
        
        <div class="event-details__actions">
          ${!isPast && !isFull ? `
            <button class="btn btn--primary" onclick="app.showRSVPForm('${event.id}')">
              Reserve Spot
            </button>
          ` : ''}
          
          ${isShared ? `
            <button class="btn btn--primary" onclick="app.importSharedEvent('${event.id}')">
              Save to My Events
            </button>
          ` : ''}
          
          <button class="btn btn--secondary" onclick="app.shareEvent('${event.id}')">
            Share Event
          </button>
          
          ${!isShared ? `
            <button class="btn btn--secondary" onclick="app.showEditEventForm('${event.id}')">
              Edit Event
            </button>
            
            <button class="btn btn--danger" onclick="app.deleteEvent('${event.id}')">
              Delete Event
            </button>
          ` : ''}
        </div>
        
        <div class="event-details__host">
          <small>Hosted by ${this.escapeHtml((event.host && event.host.name) || 'Unknown Host')}</small>
        </div>
      </div>
    `;
  }

  /**
   * Show RSVP form (simplified for now)
   */
  showRSVPForm(eventId) {
    const guestName = prompt('Enter your name:');
    if (guestName) {
      this.addGuestToEvent(eventId, { name: guestName.trim() });
    }
  }

  /**
   * Add guest to event
   */
  addGuestToEvent(eventId, guestData) {
    try {
      const result = Storage.addGuest(eventId, guestData);
      if (result) {
        this.showNotification('Successfully joined the game night!', 'success');
        this.refreshCalendar();
        
        // Update event details if modal is open
        const event = Storage.getEvent(eventId);
        if (event && this.components.eventModal.classList.contains('is-open')) {
          this.renderEventDetails(event);
        }
        
        this.emitEvent('guestJoined', { eventId, guest: guestData });
      } else {
        throw new Error('Failed to join event');
      }
    } catch (error) {
      console.error('Error joining event:', error);
      this.showNotification(error.message || 'Error joining event', 'error');
    }
  }

  /**
   * Delete event
   */
  deleteEvent(eventId) {
    if (confirm('Are you sure you want to delete this game night?')) {
      try {
        const success = Storage.deleteEvent(eventId);
        if (success) {
          this.showNotification('Game night deleted', 'success');
          this.closeAllModals();
          this.refreshCalendar();
          this.emitEvent('gameNightDeleted', { eventId });
        } else {
          throw new Error('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        this.showNotification('Error deleting event', 'error');
      }
    }
  }

  /**
   * Share event - generate shareable URL
   */
  shareEvent(eventId) {
    try {
      const shareURL = Storage.generateShareableURL(eventId);
      if (shareURL) {
        // Try to use the Web Share API if available
        if (navigator.share) {
          navigator.share({
            title: 'Game Night Event',
            text: 'Join me for a game night!',
            url: shareURL
          }).catch(error => {
            // Fallback to clipboard if sharing fails
            this.copyToClipboard(shareURL);
          });
        } else {
          // Fallback to clipboard
          this.copyToClipboard(shareURL);
        }
      }
    } catch (error) {
      console.error('Error sharing event:', error);
      this.showNotification('Error sharing event', 'error');
    }
  }

  /**
   * Copy text to clipboard
   */
  copyToClipboard(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        this.showNotification('Event link copied to clipboard!', 'success');
      }).catch(error => {
        console.error('Failed to copy to clipboard:', error);
        this.showShareDialog(text);
      });
    } else {
      // Fallback for older browsers
      this.showShareDialog(text);
    }
  }

  /**
   * Show share dialog with URL
   */
  showShareDialog(shareURL) {
    const message = `Share this link to invite others to your game night:\n\n${shareURL}`;
    
    // Create a simple modal for the share URL
    const modal = document.createElement('div');
    modal.className = 'modal is-open';
    modal.style.display = 'flex';
    modal.innerHTML = `
      <div class="modal__content">
        <span class="modal__close" onclick="this.parentElement.parentElement.remove(); document.body.style.overflow = '';">&times;</span>
        <h2>Share Game Night</h2>
        <p>Copy this link to share your game night with others:</p>
        <div style="margin: 1rem 0;">
          <input type="text" value="${shareURL}" readonly style="width: 100%; padding: 0.5rem; border: 1px solid #ccc; border-radius: 4px;" onclick="this.select()">
        </div>
        <button class="btn btn--primary" onclick="navigator.clipboard ? navigator.clipboard.writeText('${shareURL}').then(() => alert('Copied!')) : this.previousElementSibling.querySelector('input').select(); this.parentElement.parentElement.remove(); document.body.style.overflow = '';">
          Copy Link
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    document.body.style.overflow = 'hidden';
    
    // Auto-select the input
    setTimeout(() => {
      const input = modal.querySelector('input');
      if (input) {
        input.select();
      }
    }, 100);
  }

  /**
   * Import shared event to local storage
   */
  importSharedEvent(eventId) {
    try {
      const importedEvent = Storage.importSharedEvent(eventId);
      if (importedEvent) {
        this.showNotification('Event saved to your calendar!', 'success');
        this.refreshCalendar();
        // Re-render the event details to show the updated state
        this.renderEventDetails(importedEvent);
      } else {
        throw new Error('Failed to import event');
      }
    } catch (error) {
      console.error('Error importing shared event:', error);
      this.showNotification('Error saving event', 'error');
    }
  }

  /**
   * Open modal
   */
  openModal(modal) {
    if (modal) {
      modal.classList.add('is-open');
      modal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
      
      // Focus first focusable element
      setTimeout(() => {
        const focusable = modal.querySelector('input, textarea, button, select');
        if (focusable) {
          focusable.focus();
        }
      }, 100);
    }
  }

  /**
   * Close modal
   */
  closeModal(modal) {
    if (modal) {
      modal.classList.remove('is-open');
      setTimeout(() => {
        modal.style.display = 'none';
      }, 300);
      document.body.style.overflow = '';
    }
  }

  /**
   * Close all modals
   */
  closeAllModals() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => this.closeModal(modal));
  }

  /**
   * Show notification to user
   */
  showNotification(message, type = 'info') {
    // Remove existing notifications
    const existing = document.querySelectorAll('.notification');
    existing.forEach(notification => notification.remove());

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification--${type}`;
    notification.innerHTML = `
      <div class="notification__content">
        <p>${this.escapeHtml(message)}</p>
        <button class="notification__close" onclick="this.parentElement.parentElement.remove()">×</button>
      </div>
    `;

    // Add to page
    document.body.appendChild(notification);

    // Show notification
    setTimeout(() => {
      notification.classList.add('is-visible');
    }, 10);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      notification.classList.remove('is-visible');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 5000);
  }

  /**
   * Emit custom event
   */
  emitEvent(eventName, data) {
    document.dispatchEvent(new CustomEvent(eventName, {
      detail: data
    }));
  }

  /**
   * Escape HTML entities
   */
  escapeHtml(text) {
    if (typeof ValidationUtils !== 'undefined') {
      return ValidationUtils.escapeHtml(text || '');
    }
    return text || '';
  }

  /**
   * Get current user information
   */
  static getCurrentUser() {
    return window.app?.currentUser || null;
  }

  /**
   * Set current user information
   */
  static setCurrentUser(user) {
    if (window.app) {
      window.app.currentUser = user;
      if (typeof Storage !== 'undefined') {
        Storage.setCurrentUser(user);
      }
    }
  }

  /**
   * Global event emitter
   */
  static emit(eventName, data) {
    if (window.app) {
      window.app.emitEvent(eventName, data);
    }
  }

  /**
   * Global event listener
   */
  static on(eventName, handler) {
    document.addEventListener(eventName, handler);
  }

  /**
   * Remove event listener
   */
  static off(eventName, handler) {
    document.removeEventListener(eventName, handler);
  }

  /**
   * Show notification (static method)
   */
  static showNotification(message, type = 'info') {
    if (window.app) {
      window.app.showNotification(message, type);
    } else {
      console.log(`${type.toUpperCase()}: ${message}`);
    }
  }

  /**
   * Get application statistics
   */
  getStats() {
    if (typeof Storage !== 'undefined') {
      return Storage.getStorageStats();
    }
    return null;
  }

  /**
   * Export application data
   */
  exportData() {
    if (typeof Storage !== 'undefined') {
      const data = Storage.exportData();
      if (data) {
        const blob = new Blob([JSON.stringify(data, null, 2)], { 
          type: 'application/json' 
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `game-night-backup-${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        URL.revokeObjectURL(url);
        this.showNotification('Data exported successfully', 'success');
      }
    }
  }

  /**
   * Import application data
   */
  importData(file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        if (typeof Storage !== 'undefined' && Storage.importData(data)) {
          this.refreshCalendar();
          this.showNotification('Data imported successfully', 'success');
        } else {
          throw new Error('Invalid data format');
        }
      } catch (error) {
        console.error('Import error:', error);
        this.showNotification('Error importing data', 'error');
      }
    };
    reader.readAsText(file);
  }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  App.init().catch(error => {
    console.error('Failed to initialize app:', error);
  });
});

// Make App globally available
window.App = App;