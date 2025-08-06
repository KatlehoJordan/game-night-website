/**
 * Game Night Calendar Component
 * 
 * TODO: Implement calendar component including:
 * - Calendar display and navigation
 * - Event rendering
 * - Date selection
 * - Integration with FullCalendar.js
 * - Responsive design
 */

class GameNightCalendar extends HTMLElement {
  constructor() {
    super();
    this.events = [];
    this.currentDate = new Date();
    this.view = 'month';
    
    // TODO: Initialize calendar
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    
    // TODO: Initialize FullCalendar or custom calendar
  }

  disconnectedCallback() {
    // TODO: Cleanup event listeners
  }

  /**
   * Set events to display
   */
  setEvents(events) {
    // TODO: Implement set events
    this.events = events;
    this.render();
  }

  /**
   * Add event to calendar
   */
  addEvent(event) {
    // TODO: Implement add event
    this.events.push(event);
    this.render();
  }

  /**
   * Remove event from calendar
   */
  removeEvent(eventId) {
    // TODO: Implement remove event
    this.events = this.events.filter(e => e.id !== eventId);
    this.render();
  }

  /**
   * Navigate to specific date
   */
  goToDate(date) {
    // TODO: Implement date navigation
    this.currentDate = date;
    this.render();
  }

  /**
   * Render the calendar
   */
  render() {
    // TODO: Implement calendar rendering
    this.innerHTML = `
      <div class="calendar">
        <div class="calendar__header">
          <button class="calendar__nav" data-direction="prev">‹</button>
          <h2 class="calendar__title">${this.formatMonth(this.currentDate)}</h2>
          <button class="calendar__nav" data-direction="next">›</button>
        </div>
        <div class="calendar__grid">
          <!-- TODO: Implement calendar grid -->
          <p>Calendar will be implemented here</p>
        </div>
      </div>
    `;
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // TODO: Implement event listeners for:
    // - Date clicks
    // - Event clicks
    // - Navigation buttons
    
    this.addEventListener('click', (event) => {
      if (event.target.matches('.calendar__nav')) {
        this.handleNavigation(event.target.dataset.direction);
      }
    });
  }

  /**
   * Handle calendar navigation
   */
  handleNavigation(direction) {
    // TODO: Implement navigation logic
    const newDate = new Date(this.currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    this.goToDate(newDate);
  }

  /**
   * Format month for display
   */
  formatMonth(date) {
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  }

  /**
   * Handle date click
   */
  handleDateClick(date) {
    // TODO: Emit dateClick event
    this.dispatchEvent(new CustomEvent('dateClick', {
      detail: { date },
      bubbles: true
    }));
  }

  /**
   * Handle event click
   */
  handleEventClick(eventId) {
    // TODO: Emit eventClick event
    const eventData = this.events.find(e => e.id === eventId);
    this.dispatchEvent(new CustomEvent('eventClick', {
      detail: { eventId, eventData },
      bubbles: true
    }));
  }
}

// Register custom element
customElements.define('game-night-calendar', GameNightCalendar);