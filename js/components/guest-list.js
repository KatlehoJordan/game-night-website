/**
 * Guest List Component
 * 
 * TODO: Implement guest list component including:
 * - Display current guests
 * - Show remaining spots
 * - Add/remove guest functionality
 * - Guest information display
 */

class GuestList extends HTMLElement {
  constructor() {
    super();
    this.eventId = null;
    this.guests = [];
    this.maxGuests = 0;
    
    // TODO: Initialize guest list
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    // TODO: Cleanup event listeners
  }

  /**
   * Set event ID and load guests
   */
  set eventId(id) {
    this._eventId = id;
    this.loadGuests();
  }

  get eventId() {
    return this._eventId;
  }

  /**
   * Load guests for current event
   */
  loadGuests() {
    // TODO: Implement guest loading
    if (!this.eventId) return;
    
    const event = Storage.getEvent(this.eventId);
    if (event) {
      this.guests = event.guests || [];
      this.maxGuests = event.maxGuests || 0;
      this.render();
    }
  }

  /**
   * Refresh guest list display
   */
  refresh() {
    // TODO: Implement refresh
    this.loadGuests();
  }

  /**
   * Show add guest form
   */
  showAddGuestForm() {
    // TODO: Implement add guest form
    console.log('TODO: Show add guest form');
  }

  /**
   * Add guest to event
   */
  addGuest(guestData) {
    // TODO: Implement add guest
    const updatedEvent = Storage.addGuest(this.eventId, guestData);
    if (updatedEvent) {
      this.guests = updatedEvent.guests;
      this.render();
      
      // Emit guest added event
      this.dispatchEvent(new CustomEvent('guestAdded', {
        detail: { guest: guestData },
        bubbles: true
      }));
    }
  }

  /**
   * Remove guest from event
   */
  removeGuest(guestId) {
    // TODO: Implement remove guest
    const updatedEvent = Storage.removeGuest(this.eventId, guestId);
    if (updatedEvent) {
      this.guests = updatedEvent.guests;
      this.render();
      
      // Emit guest removed event
      this.dispatchEvent(new CustomEvent('guestRemoved', {
        detail: { guestId },
        bubbles: true
      }));
    }
  }

  /**
   * Get remaining spots
   */
  getRemainingSpots() {
    return Math.max(0, this.maxGuests - this.guests.length);
  }

  /**
   * Check if event is full
   */
  isFull() {
    return this.guests.length >= this.maxGuests;
  }

  /**
   * Render the guest list
   */
  render() {
    // TODO: Implement complete guest list rendering
    const remainingSpots = this.getRemainingSpots();
    const isFull = this.isFull();
    
    this.innerHTML = `
      <div class="guest-list">
        <div class="guest-list__header">
          <h3>Guest List</h3>
          <div class="guest-list__stats">
            <span class="guest-count">${this.guests.length}/${this.maxGuests}</span>
            <span class="remaining-spots ${isFull ? 'full' : ''}">
              ${remainingSpots} spots remaining
            </span>
          </div>
        </div>
        
        <div class="guest-list__content">
          ${this.guests.length > 0 ? this.renderGuests() : this.renderEmptyState()}
        </div>
        
        ${!isFull ? this.renderAddGuestButton() : ''}
      </div>
    `;
  }

  /**
   * Render individual guests
   */
  renderGuests() {
    // TODO: Implement guest rendering
    return this.guests.map(guest => `
      <div class="guest-item" data-guest-id="${guest.id}">
        <div class="guest-item__info">
          <div class="guest-item__name">${guest.name}</div>
          ${guest.dietary ? `<div class="guest-item__dietary">${guest.dietary}</div>` : ''}
          ${guest.notes ? `<div class="guest-item__notes">${guest.notes}</div>` : ''}
        </div>
        <div class="guest-item__actions">
          <button class="btn btn--small btn--danger remove-guest" data-guest-id="${guest.id}">
            Remove
          </button>
        </div>
      </div>
    `).join('');
  }

  /**
   * Render empty state
   */
  renderEmptyState() {
    // TODO: Implement empty state
    return `
      <div class="guest-list__empty">
        <p>No guests yet. Be the first to RSVP!</p>
      </div>
    `;
  }

  /**
   * Render add guest button
   */
  renderAddGuestButton() {
    // TODO: Implement add guest button
    return `
      <div class="guest-list__actions">
        <button class="btn btn--primary add-guest">
          Add Guest
        </button>
      </div>
    `;
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // TODO: Implement event listeners
    this.addEventListener('click', (event) => {
      if (event.target.matches('.remove-guest')) {
        const guestId = event.target.dataset.guestId;
        this.handleRemoveGuest(guestId);
      } else if (event.target.matches('.add-guest')) {
        this.handleAddGuest();
      }
    });
  }

  /**
   * Handle remove guest
   */
  handleRemoveGuest(guestId) {
    // TODO: Implement remove guest handling
    if (confirm('Are you sure you want to remove this guest?')) {
      this.removeGuest(guestId);
    }
  }

  /**
   * Handle add guest
   */
  handleAddGuest() {
    // TODO: Implement add guest handling
    this.showAddGuestForm();
  }
}

// Register custom element
customElements.define('guest-list', GuestList);