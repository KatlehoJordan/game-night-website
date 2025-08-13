/**
 * Game Night Calendar Component
 * Interactive calendar for displaying and managing game night events
 */

class GameNightCalendar extends HTMLElement {
  constructor() {
    super();
    this.events = [];
    this.currentDate = new Date();
    this.view = 'month';
    this.selectedDate = null;
    
    // Bind methods
    this.handleNavigation = this.handleNavigation.bind(this);
    this.handleDateClick = this.handleDateClick.bind(this);
    this.handleEventClick = this.handleEventClick.bind(this);
    this.handleTodayClick = this.handleTodayClick.bind(this);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.loadEvents();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  /**
   * Load events from storage
   */
  loadEvents() {
    if (typeof Storage !== 'undefined') {
      this.events = Storage.getAllEvents() || [];
      this.render();
    }
  }

  /**
   * Set events to display
   */
  setEvents(events) {
    this.events = events || [];
    this.render();
  }

  /**
   * Add event to calendar
   */
  addEvent(event) {
    if (event && event.id) {
      // Remove existing event with same ID and add new one
      this.events = this.events.filter(e => e.id !== event.id);
      this.events.push(event);
      this.render();
    }
  }

  /**
   * Remove event from calendar
   */
  removeEvent(eventId) {
    this.events = this.events.filter(e => e.id !== eventId);
    this.render();
  }

  /**
   * Navigate to specific date
   */
  goToDate(date) {
    this.currentDate = new Date(date);
    this.render();
  }

  /**
   * Go to today
   */
  goToToday() {
    this.currentDate = new Date();
    this.render();
  }

  /**
   * Render the calendar
   */
  render() {
    const monthName = DateUtils.formatDate(this.currentDate, 'month-year');
    const calendarGrid = DateUtils.getCalendarGrid(this.currentDate);
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    this.innerHTML = `
      <div class="calendar">
        <div class="calendar__header">
          <h2 class="calendar__title">${monthName}</h2>
          <div class="calendar__controls">
            <button class="calendar__nav" data-direction="prev" aria-label="Previous month">‹</button>
            <button class="calendar__today-btn" aria-label="Go to today">Today</button>
            <button class="calendar__nav" data-direction="next" aria-label="Next month">›</button>
          </div>
        </div>
        <div class="calendar__grid">
          ${dayNames.map(day => `
            <div class="calendar__day-header">${day}</div>
          `).join('')}
          ${calendarGrid.map(date => this.renderDay(date)).join('')}
        </div>
        <div class="calendar__legend">
          <div class="calendar__legend-item">
            <div class="calendar__legend-color calendar__legend-color--available"></div>
            <span>Available</span>
          </div>
          <div class="calendar__legend-item">
            <div class="calendar__legend-color calendar__legend-color--full"></div>
            <span>Full</span>
          </div>
          <div class="calendar__legend-item">
            <div class="calendar__legend-color calendar__legend-color--past"></div>
            <span>Past Event</span>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Render a single day
   */
  renderDay(date) {
    const dayNumber = date.getDate();
    const isToday = DateUtils.isToday(date);
    const isOtherMonth = !DateUtils.isSameMonth(date, this.currentDate);
    const isSelected = this.selectedDate && DateUtils.isSameDay(date, this.selectedDate);
    
    // Get events for this date
    const dayEvents = this.events.filter(event => 
      DateUtils.isSameDay(new Date(event.date), date)
    );
    
    const hasEvents = dayEvents.length > 0;
    
    // Build CSS classes
    const classes = ['calendar__day'];
    if (isToday) classes.push('is-today');
    if (isOtherMonth) classes.push('is-other-month');
    if (isSelected) classes.push('is-selected');
    if (hasEvents) classes.push('has-events');
    
    return `
      <div class="${classes.join(' ')}" 
           data-date="${date.toISOString()}"
           tabindex="0"
           role="button"
           aria-label="Select ${DateUtils.formatDate(date, 'long')}">
        <div class="calendar__day-number">${dayNumber}</div>
        <div class="calendar__events">
          ${this.renderDayEvents(dayEvents, date)}
        </div>
      </div>
    `;
  }

  /**
   * Render events for a specific day
   */
  renderDayEvents(events, date) {
    const maxVisible = 3;
    const visibleEvents = events.slice(0, maxVisible);
    const hiddenCount = events.length - maxVisible;
    
    let html = visibleEvents.map(event => this.renderEvent(event, date)).join('');
    
    if (hiddenCount > 0) {
      html += `
        <div class="calendar__more-events" 
             data-date="${date.toISOString()}"
             role="button"
             tabindex="0">
          +${hiddenCount} more
        </div>
      `;
    }
    
    return html;
  }

  /**
   * Render a single event
   */
  renderEvent(event, date) {
    const eventDate = new Date(event.date);
    const isPast = DateUtils.isPast(eventDate);
    const isFull = event.guests.length >= event.maxGuests;
    const isShared = event.isShared || false;
    const time = DateUtils.formatDate(eventDate, 'time');
    
    const classes = ['calendar__event'];
    if (isPast) classes.push('calendar__event--past');
    if (isFull) classes.push('calendar__event--full');
    if (isShared) classes.push('calendar__event--shared');
    
    return `
      <div class="${classes.join(' ')}" 
           data-event-id="${event.id}"
           role="button"
           tabindex="0"
           title="${event.title} at ${time} - ${event.guests.length}/${event.maxGuests} guests${isShared ? ' (Shared Event)' : ''}"
           aria-label="Event: ${event.title} at ${time}">
        ${isShared ? '🔗 ' : ''}${event.title}
      </div>
    `;
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Navigation buttons
    this.addEventListener('click', (event) => {
      const target = event.target;
      
      if (target.matches('.calendar__nav')) {
        this.handleNavigation(target.dataset.direction);
      } else if (target.matches('.calendar__today-btn')) {
        this.handleTodayClick();
      } else if (target.matches('.calendar__day')) {
        this.handleDateClick(target);
      } else if (target.matches('.calendar__event')) {
        this.handleEventClick(target);
        event.stopPropagation();
      } else if (target.matches('.calendar__more-events')) {
        this.handleMoreEventsClick(target);
        event.stopPropagation();
      }
    });

    // Keyboard navigation
    this.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        const target = event.target;
        
        if (target.matches('.calendar__day')) {
          event.preventDefault();
          this.handleDateClick(target);
        } else if (target.matches('.calendar__event')) {
          event.preventDefault();
          this.handleEventClick(target);
        } else if (target.matches('.calendar__more-events')) {
          event.preventDefault();
          this.handleMoreEventsClick(target);
        }
      }
    });

    // Listen for storage changes
    this.storageListener = () => this.loadEvents();
    window.addEventListener('storage', this.storageListener);
    
    // Listen for custom events
    document.addEventListener('gameNightCreated', (event) => {
      this.addEvent(event.detail);
    });
    
    document.addEventListener('gameNightUpdated', (event) => {
      this.addEvent(event.detail);
    });
    
    document.addEventListener('gameNightDeleted', (event) => {
      this.removeEvent(event.detail.eventId);
    });
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    if (this.storageListener) {
      window.removeEventListener('storage', this.storageListener);
    }
  }

  /**
   * Handle calendar navigation
   */
  handleNavigation(direction) {
    const newDate = new Date(this.currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    this.goToDate(newDate);
  }

  /**
   * Handle today button click
   */
  handleTodayClick() {
    this.goToToday();
  }

  /**
   * Handle date click
   */
  handleDateClick(dayElement) {
    const dateStr = dayElement.dataset.date;
    const date = new Date(dateStr);
    
    // Update selected date
    this.selectedDate = date;
    this.render();
    
    // Emit dateClick event
    this.dispatchEvent(new CustomEvent('dateClick', {
      detail: { date },
      bubbles: true
    }));
  }

  /**
   * Handle event click
   */
  handleEventClick(eventElement) {
    const eventId = eventElement.dataset.eventId;
    const eventData = this.events.find(e => e.id === eventId);
    
    if (eventData) {
      // Emit eventClick event
      this.dispatchEvent(new CustomEvent('eventClick', {
        detail: { eventId, eventData },
        bubbles: true
      }));
    }
  }

  /**
   * Handle "more events" click
   */
  handleMoreEventsClick(moreElement) {
    const dateStr = moreElement.dataset.date;
    const date = new Date(dateStr);
    const dayEvents = this.events.filter(event => 
      DateUtils.isSameDay(new Date(event.date), date)
    );
    
    // Emit moreEventsClick event
    this.dispatchEvent(new CustomEvent('moreEventsClick', {
      detail: { date, events: dayEvents },
      bubbles: true
    }));
  }

  /**
   * Get events for a specific date
   */
  getEventsForDate(date) {
    return this.events.filter(event => 
      DateUtils.isSameDay(new Date(event.date), date)
    );
  }

  /**
   * Refresh calendar display
   */
  refresh() {
    this.loadEvents();
  }

  /**
   * Set view mode (future enhancement)
   */
  setView(view) {
    this.view = view;
    this.render();
  }

  /**
   * Get current month events
   */
  getCurrentMonthEvents() {
    const startOfMonth = DateUtils.startOfMonth(this.currentDate);
    const endOfMonth = DateUtils.endOfMonth(this.currentDate);
    
    return this.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= startOfMonth && eventDate <= endOfMonth;
    });
  }

  /**
   * Highlight date (programmatically)
   */
  highlightDate(date) {
    this.selectedDate = new Date(date);
    this.render();
  }

  /**
   * Clear date selection
   */
  clearSelection() {
    this.selectedDate = null;
    this.render();
  }
}

// Register custom element
customElements.define('game-night-calendar', GameNightCalendar);