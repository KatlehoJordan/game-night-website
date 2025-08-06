/**
 * Game Night Form Component
 * Handles creation and editing of game night events
 */

class GameNightForm extends HTMLElement {
  constructor() {
    super();
    this.isEditMode = false;
    this.eventId = null;
    this.formData = {};
    this.errors = {};
    
    // Bind methods
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    this.removeEventListeners();
  }

  /**
   * Show form for creating new event
   */
  showCreateForm(date = new Date()) {
    this.isEditMode = false;
    this.eventId = null;
    this.errors = {};
    
    // Set default date to next hour
    const defaultDate = new Date(date);
    defaultDate.setHours(defaultDate.getHours() + 1, 0, 0, 0);
    
    this.formData = {
      title: '',
      description: '',
      date: defaultDate,
      maxGuests: 6,
      duration: 180,
      host: {
        name: '',
        email: ''
      }
    };
    
    this.render();
    this.focusFirstInput();
  }

  /**
   * Show form for editing existing event
   */
  showEditForm(eventId) {
    this.isEditMode = true;
    this.eventId = eventId;
    this.errors = {};
    
    // Load event data
    if (typeof Storage !== 'undefined') {
      const event = Storage.getEvent(eventId);
      if (event) {
        this.formData = { ...event };
        this.render();
        this.focusFirstInput();
        return true;
      }
    }
    
    console.error('Event not found:', eventId);
    return false;
  }

  /**
   * Reset form to initial state
   */
  reset() {
    this.isEditMode = false;
    this.eventId = null;
    this.formData = {};
    this.errors = {};
    this.render();
  }

  /**
   * Validate form data
   */
  validate() {
    const errors = {};
    const data = this.formData;
    
    // Validate title
    if (!data.title || data.title.trim().length < 3) {
      errors.title = 'Title must be at least 3 characters long';
    } else if (data.title.length > 100) {
      errors.title = 'Title must be less than 100 characters';
    }
    
    // Validate date
    if (!data.date) {
      errors.date = 'Date and time are required';
    } else {
      const eventDate = new Date(data.date);
      if (isNaN(eventDate.getTime())) {
        errors.date = 'Invalid date format';
      } else if (!this.isEditMode && eventDate <= new Date()) {
        errors.date = 'Event date must be in the future';
      }
    }
    
    // Validate max guests
    if (!data.maxGuests || isNaN(data.maxGuests)) {
      errors.maxGuests = 'Maximum guests must be a number';
    } else {
      const maxGuests = parseInt(data.maxGuests);
      if (maxGuests < 1) {
        errors.maxGuests = 'Maximum guests must be at least 1';
      } else if (maxGuests > 50) {
        errors.maxGuests = 'Maximum guests cannot exceed 50';
      }
    }
    
    // Validate description (optional)
    if (data.description && data.description.length > 500) {
      errors.description = 'Description must be less than 500 characters';
    }
    
    // Validate duration (optional)
    if (data.duration && (isNaN(data.duration) || data.duration < 30)) {
      errors.duration = 'Duration must be at least 30 minutes';
    }
    
    // Validate host name
    if (!data.host || !data.host.name || data.host.name.trim().length < 2) {
      errors.hostName = 'Host name is required (at least 2 characters)';
    }
    
    // Validate host email (optional)
    if (data.host && data.host.email && !ValidationUtils.validateEmail(data.host.email)) {
      errors.hostEmail = 'Invalid email format';
    }
    
    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  }

  /**
   * Submit form data
   */
  submit() {
    const validation = this.validate();
    
    if (!validation.valid) {
      this.showErrors(validation.errors);
      return false;
    }
    
    // Prepare event data
    const eventData = {
      ...this.formData,
      maxGuests: parseInt(this.formData.maxGuests),
      duration: parseInt(this.formData.duration) || 180,
      date: new Date(this.formData.date).toISOString()
    };
    
    // Emit form submit event
    this.dispatchEvent(new CustomEvent('formSubmit', {
      detail: {
        eventData,
        isEdit: this.isEditMode,
        eventId: this.eventId
      },
      bubbles: true
    }));
    
    return true;
  }

  /**
   * Show validation errors
   */
  showErrors(errors) {
    this.errors = errors;
    this.render();
    
    // Scroll to first error
    const firstErrorField = Object.keys(errors)[0];
    if (firstErrorField) {
      const element = this.querySelector(`[name="${firstErrorField}"], [data-field="${firstErrorField}"]`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.focus();
      }
    }
  }

  /**
   * Clear errors
   */
  clearErrors() {
    this.errors = {};
    this.render();
  }

  /**
   * Render the form
   */
  render() {
    const title = this.isEditMode ? 'Edit Game Night' : 'Create Game Night';
    const submitText = this.isEditMode ? 'Update Event' : 'Create Event';
    
    this.innerHTML = `
      <div class="game-night-form">
        <div class="form-header">
          <h2 class="form-header__title">${title}</h2>
          <p class="form-header__subtitle">
            ${this.isEditMode ? 'Update your game night details' : 'Set up a new game night for your friends'}
          </p>
        </div>
        
        <form id="gameNightForm" novalidate>
          <div class="form-group">
            <label for="title" class="form-label">Event Title *</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              class="form-input ${this.errors.title ? 'form-input--error' : ''}"
              value="${this.escapeHtml(this.formData.title || '')}"
              placeholder="Friday Night Board Games"
              maxlength="100"
              required
            />
            ${this.renderError('title')}
          </div>
          
          <div class="form-group">
            <label for="description" class="form-label">Description</label>
            <textarea 
              id="description" 
              name="description" 
              class="form-textarea ${this.errors.description ? 'form-input--error' : ''}"
              placeholder="Tell your guests what games you'll be playing, what to bring, or any special instructions..."
              maxlength="500"
              rows="3"
            >${this.escapeHtml(this.formData.description || '')}</textarea>
            ${this.renderError('description')}
            <div class="form-help">Optional - Let guests know what to expect</div>
          </div>
          
          <div class="form-row">
            <div class="form-group">
              <label for="date" class="form-label">Date & Time *</label>
              <input 
                type="datetime-local" 
                id="date" 
                name="date" 
                class="form-input ${this.errors.date ? 'form-input--error' : ''}"
                value="${this.formatDateForInput(this.formData.date)}"
                required
              />
              ${this.renderError('date')}
            </div>
            
            <div class="form-group">
              <label for="duration" class="form-label">Duration (minutes)</label>
              <input 
                type="number" 
                id="duration" 
                name="duration" 
                class="form-input ${this.errors.duration ? 'form-input--error' : ''}"
                value="${this.formData.duration || 180}"
                min="30"
                max="720"
                step="30"
              />
              ${this.renderError('duration')}
              <div class="form-help">How long will the event last?</div>
            </div>
          </div>
          
          <div class="form-group">
            <label for="maxGuests" class="form-label">Maximum Guests *</label>
            <input 
              type="number" 
              id="maxGuests" 
              name="maxGuests" 
              class="form-input ${this.errors.maxGuests ? 'form-input--error' : ''}"
              value="${this.formData.maxGuests || 6}"
              min="1"
              max="50"
              required
            />
            ${this.renderError('maxGuests')}
            <div class="form-help">How many people can join this game night?</div>
          </div>
          
          <fieldset class="form-fieldset">
            <legend class="form-legend">Host Information</legend>
            
            <div class="form-row">
              <div class="form-group">
                <label for="hostName" class="form-label">Your Name *</label>
                <input 
                  type="text" 
                  id="hostName" 
                  name="hostName" 
                  data-field="hostName"
                  class="form-input ${this.errors.hostName ? 'form-input--error' : ''}"
                  value="${this.escapeHtml(this.formData.host?.name || '')}"
                  placeholder="Your name"
                  maxlength="50"
                  required
                />
                ${this.renderError('hostName')}
              </div>
              
              <div class="form-group">
                <label for="hostEmail" class="form-label">Your Email</label>
                <input 
                  type="email" 
                  id="hostEmail" 
                  name="hostEmail" 
                  data-field="hostEmail"
                  class="form-input ${this.errors.hostEmail ? 'form-input--error' : ''}"
                  value="${this.escapeHtml(this.formData.host?.email || '')}"
                  placeholder="your.email@example.com"
                  maxlength="100"
                />
                ${this.renderError('hostEmail')}
                <div class="form-help">Optional - for guests to contact you</div>
              </div>
            </div>
          </fieldset>
          
          <div class="form-actions">
            <button type="button" class="btn btn--secondary" id="cancelBtn">Cancel</button>
            <button type="submit" class="btn btn--primary" id="submitBtn">
              ${submitText}
            </button>
          </div>
        </form>
      </div>
    `;
  }

  /**
   * Render error message for a field
   */
  renderError(fieldName) {
    const error = this.errors[fieldName];
    return error ? `<div class="form-error">${this.escapeHtml(error)}</div>` : '';
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    this.addEventListener('submit', this.handleSubmit);
    this.addEventListener('click', this.handleClick);
    this.addEventListener('input', this.handleInputChange);
    this.addEventListener('change', this.handleInputChange);
  }

  /**
   * Remove event listeners
   */
  removeEventListeners() {
    this.removeEventListener('submit', this.handleSubmit);
    this.removeEventListener('click', this.handleClick);
    this.removeEventListener('input', this.handleInputChange);
    this.removeEventListener('change', this.handleInputChange);
  }

  /**
   * Handle form submission
   */
  handleSubmit(event) {
    event.preventDefault();
    this.collectFormData();
    this.submit();
  }

  /**
   * Handle click events
   */
  handleClick = (event) => {
    if (event.target.id === 'cancelBtn') {
      this.handleCancel();
    }
  }

  /**
   * Handle form cancellation
   */
  handleCancel() {
    this.dispatchEvent(new CustomEvent('formCancel', {
      bubbles: true
    }));
  }

  /**
   * Handle input changes
   */
  handleInputChange(event) {
    const { name, value } = event.target;
    
    // Clear errors for this field when user starts typing
    if (this.errors[name]) {
      delete this.errors[name];
      this.updateFieldError(name);
    }
    
    // Update form data
    if (name === 'hostName' || name === 'hostEmail') {
      if (!this.formData.host) this.formData.host = {};
      this.formData.host[name.replace('host', '').toLowerCase()] = value;
    } else {
      this.formData[name] = value;
    }
  }

  /**
   * Update error display for a specific field
   */
  updateFieldError(fieldName) {
    const field = this.querySelector(`[name="${fieldName}"], [data-field="${fieldName}"]`);
    const errorElement = field?.parentElement.querySelector('.form-error');
    
    if (field) {
      field.classList.remove('form-input--error');
    }
    
    if (errorElement) {
      errorElement.remove();
    }
  }

  /**
   * Collect form data
   */
  collectFormData() {
    const form = this.querySelector('#gameNightForm');
    const formData = new FormData(form);
    
    // Basic fields
    for (const [key, value] of formData.entries()) {
      if (key === 'hostName' || key === 'hostEmail') {
        if (!this.formData.host) this.formData.host = {};
        this.formData.host[key.replace('host', '').toLowerCase()] = value;
      } else {
        this.formData[key] = value;
      }
    }
  }

  /**
   * Format date for input field
   */
  formatDateForInput(date) {
    if (!date) return '';
    return DateUtils.formatForInput(date);
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
   * Focus first input
   */
  focusFirstInput() {
    setTimeout(() => {
      const firstInput = this.querySelector('input, textarea');
      if (firstInput) {
        firstInput.focus();
      }
    }, 100);
  }

  /**
   * Get form data
   */
  getFormData() {
    return { ...this.formData };
  }

  /**
   * Set form data
   */
  setFormData(data) {
    this.formData = { ...data };
    this.render();
  }

  /**
   * Check if form has unsaved changes
   */
  hasUnsavedChanges() {
    if (this.isEditMode && this.eventId) {
      const originalEvent = Storage?.getEvent(this.eventId);
      if (!originalEvent) return false;
      
      // Compare key fields
      return (
        this.formData.title !== originalEvent.title ||
        this.formData.description !== originalEvent.description ||
        new Date(this.formData.date).getTime() !== new Date(originalEvent.date).getTime() ||
        parseInt(this.formData.maxGuests) !== originalEvent.maxGuests
      );
    }
    
    // For new events, check if any data has been entered
    return (
      (this.formData.title && this.formData.title.trim().length > 0) ||
      (this.formData.description && this.formData.description.trim().length > 0) ||
      (this.formData.host?.name && this.formData.host.name.trim().length > 0)
    );
  }
}

// Register custom element
customElements.define('game-night-form', GameNightForm);