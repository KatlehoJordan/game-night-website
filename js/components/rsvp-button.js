/**
 * RSVP Button Component
 * 
 * TODO: Implement RSVP component including:
 * - Join/leave event functionality
 * - Guest information collection
 * - RSVP status display
 * - Integration with guest list
 */

class RSVPButton extends HTMLElement {
  constructor() {
    super();
    this.eventId = null;
    this.userId = null;
    this.userRSVP = null;
    this.isJoined = false;
    
    // TODO: Initialize RSVP button
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.updateState();
  }

  disconnectedCallback() {
    // TODO: Cleanup event listeners
  }

  /**
   * Set event ID
   */
  set eventId(id) {
    this._eventId = id;
    this.updateState();
  }

  get eventId() {
    return this._eventId;
  }

  /**
   * Set user ID
   */
  set userId(id) {
    this._userId = id;
    this.updateState();
  }

  get userId() {
    return this._userId;
  }

  /**
   * Update button state based on current RSVP status
   */
  updateState() {
    // TODO: Implement state update
    if (!this.eventId) return;
    
    const event = Storage.getEvent(this.eventId);
    if (!event) return;
    
    // Check if user is already in guest list
    this.userRSVP = event.guests.find(guest => 
      guest.userId === this.userId || guest.name === this.getCurrentUserName()
    );
    
    this.isJoined = !!this.userRSVP;
    this.render();
  }

  /**
   * Get current user name
   */
  getCurrentUserName() {
    // TODO: Get from user preferences or prompt
    const user = App.getCurrentUser();
    return user ? user.name : null;
  }

  /**
   * Join event (RSVP)
   */
  async joinEvent() {
    // TODO: Implement join event
    if (!this.eventId) return;
    
    const event = Storage.getEvent(this.eventId);
    if (!event) return;
    
    // Check if event is full
    if (event.guests.length >= event.maxGuests) {
      App.showNotification('This event is full!', 'warning');
      return;
    }
    
    // Get user information
    const guestData = await this.collectGuestInfo();
    if (!guestData) return;
    
    // Add guest to event
    const updatedEvent = Storage.addGuest(this.eventId, guestData);
    if (updatedEvent) {
      this.updateState();
      
      // Emit RSVP success event
      this.dispatchEvent(new CustomEvent('rsvpSuccess', {
        detail: { 
          eventId: this.eventId, 
          action: 'join',
          guest: guestData 
        },
        bubbles: true
      }));
      
      App.showNotification('Successfully joined the game night!', 'success');
    }
  }

  /**
   * Leave event (Cancel RSVP)
   */
  leaveEvent() {
    // TODO: Implement leave event
    if (!this.eventId || !this.userRSVP) return;
    
    if (!confirm('Are you sure you want to cancel your RSVP?')) {
      return;
    }
    
    const updatedEvent = Storage.removeGuest(this.eventId, this.userRSVP.id);
    if (updatedEvent) {
      this.updateState();
      
      // Emit RSVP success event
      this.dispatchEvent(new CustomEvent('rsvpSuccess', {
        detail: { 
          eventId: this.eventId, 
          action: 'leave',
          guestId: this.userRSVP.id 
        },
        bubbles: true
      }));
      
      App.showNotification('RSVP cancelled successfully', 'info');
    }
  }

  /**
   * Collect guest information
   */
  async collectGuestInfo() {
    // TODO: Implement guest info collection
    // For now, use simple prompts - can be enhanced with a modal form
    
    const name = prompt('Enter your name:');
    if (!name || name.trim().length === 0) {
      return null;
    }
    
    const email = prompt('Enter your email (optional):') || '';
    const dietary = prompt('Any dietary restrictions (optional):') || '';
    const notes = prompt('Additional notes (optional):') || '';
    
    return {
      id: Storage.generateId(),
      name: name.trim(),
      email: email.trim(),
      dietary: dietary.trim(),
      notes: notes.trim(),
      rsvpDate: new Date(),
      userId: this.userId
    };
  }

  /**
   * Render the RSVP button
   */
  render() {
    // TODO: Implement complete RSVP button rendering
    if (!this.eventId) {
      this.innerHTML = '<div class="rsvp-button">Event not found</div>';
      return;
    }
    
    const event = Storage.getEvent(this.eventId);
    if (!event) {
      this.innerHTML = '<div class="rsvp-button">Event not found</div>';
      return;
    }
    
    const isFull = event.guests.length >= event.maxGuests;
    const canJoin = !this.isJoined && !isFull;
    const canLeave = this.isJoined;
    
    this.innerHTML = `
      <div class="rsvp-button">
        ${this.isJoined ? this.renderJoinedState() : this.renderNotJoinedState(canJoin, isFull)}
      </div>
    `;
  }

  /**
   * Render joined state
   */
  renderJoinedState() {
    // TODO: Implement joined state rendering
    return `
      <div class="rsvp-status rsvp-status--joined">
        <div class="rsvp-status__text">
          ✅ You're going as ${this.userRSVP.name}
        </div>
        <button class="btn btn--secondary rsvp-action" data-action="leave">
          Cancel RSVP
        </button>
      </div>
    `;
  }

  /**
   * Render not joined state
   */
  renderNotJoinedState(canJoin, isFull) {
    // TODO: Implement not joined state rendering
    if (isFull) {
      return `
        <div class="rsvp-status rsvp-status--full">
          <div class="rsvp-status__text">
            😔 Event is full
          </div>
        </div>
      `;
    }
    
    if (canJoin) {
      return `
        <div class="rsvp-status rsvp-status--available">
          <button class="btn btn--primary rsvp-action" data-action="join">
            🎮 Join Game Night
          </button>
        </div>
      `;
    }
    
    return `
      <div class="rsvp-status rsvp-status--unavailable">
        <div class="rsvp-status__text">
          Unable to RSVP
        </div>
      </div>
    `;
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // TODO: Implement event listeners
    this.addEventListener('click', (event) => {
      if (event.target.matches('.rsvp-action')) {
        const action = event.target.dataset.action;
        this.handleRSVPAction(action);
      }
    });
  }

  /**
   * Handle RSVP action
   */
  handleRSVPAction(action) {
    // TODO: Implement RSVP action handling
    if (action === 'join') {
      this.joinEvent();
    } else if (action === 'leave') {
      this.leaveEvent();
    }
  }
}

// Register custom element
customElements.define('rsvp-button', RSVPButton);