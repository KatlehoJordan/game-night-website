/**
 * Game Night Form Component
 * 
 * TODO: Implement form component including:
 * - Create/edit game night forms
 * - Form validation
 * - Date/time selection
 * - Guest limit setting
 * - Form submission handling
 */

class GameNightForm extends HTMLElement {
  constructor() {
    super();
    this.isEditMode = false;
    this.eventId = null;
    this.formData = {};
    
    // TODO: Initialize form
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
  }

  disconnectedCallback() {
    // TODO: Cleanup event listeners
  }

  /**
   * Show form for creating new event
   */
  showCreateForm(date = new Date()) {
    // TODO: Implement create form
    this.isEditMode = false;
    this.eventId = null;
    this.formData = {
      date: date,
      title: '',
      description: '',
      maxGuests: 4,
      duration: 180
    };
    this.render();
  }

  /**
   * Show form for editing existing event
   */
  showEditForm(eventId) {
    // TODO: Implement edit form
    this.isEditMode = true;
    this.eventId = eventId;
    
    // Load event data
    const event = Storage.getEvent(eventId);
    if (event) {
      this.formData = { ...event };
      this.render();
    }
  }

  /**
   * Reset form to initial state
   */
  reset() {
    // TODO: Implement form reset
    this.isEditMode = false;
    this.eventId = null;
    this.formData = {};
    this.render();
  }

  /**
   * Validate form data
   */
  validate() {
    // TODO: Implement form validation
    const errors = [];
    
    if (!this.formData.title || this.formData.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters long');
    }
    
    if (!this.formData.date) {
      errors.push('Date is required');
    }
    
    if (!this.formData.maxGuests || this.formData.maxGuests < 1) {
      errors.push('Maximum guests must be at least 1');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Submit form data
   */
  submit() {
    // TODO: Implement form submission
    const validation = this.validate();
    
    if (!validation.valid) {
      this.showErrors(validation.errors);
      return;
    }
    
    // Emit form submit event
    this.dispatchEvent(new CustomEvent('formSubmit', {
      detail: {
        eventData: this.formData,
        isEdit: this.isEditMode
      },
      bubbles: true
    }));
  }

  /**
   * Show validation errors
   */
  showErrors(errors) {
    // TODO: Implement error display
    console.log('Form errors:', errors);
  }

  /**
   * Render the form
   */
  render() {
    // TODO: Implement complete form rendering
    this.innerHTML = `
      <div class="game-night-form">
        <h2>${this.isEditMode ? 'Edit' : 'Create'} Game Night</h2>
        <form id="gameNightForm">
          <div class="form-group">
            <label for="title">Event Title</label>
            <input 
              type="text" 
              id="title" 
              name="title" 
              value="${this.formData.title || ''}"
              placeholder="Friday Night Board Games"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="description">Description</label>
            <textarea 
              id="description" 
              name="description" 
              placeholder="Bring your favorite games!"
            >${this.formData.description || ''}</textarea>
          </div>
          
          <div class="form-group">
            <label for="date">Date & Time</label>
            <input 
              type="datetime-local" 
              id="date" 
              name="date" 
              value="${this.formatDateForInput(this.formData.date)}"
              required
            />
          </div>
          
          <div class="form-group">
            <label for="maxGuests">Maximum Guests</label>
            <input 
              type="number" 
              id="maxGuests" 
              name="maxGuests" 
              value="${this.formData.maxGuests || 4}"
              min="1"
              max="20"
              required
            />
          </div>
          
          <div class="form-actions">
            <button type="button" class="btn btn--secondary" id="cancelBtn">Cancel</button>
            <button type="submit" class="btn btn--primary" id="submitBtn">
              ${this.isEditMode ? 'Update' : 'Create'} Event
            </button>
          </div>
        </form>
      </div>
    `;
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // TODO: Implement event listeners
    this.addEventListener('submit', (event) => {
      event.preventDefault();
      this.handleSubmit();
    });
    
    this.addEventListener('click', (event) => {
      if (event.target.id === 'cancelBtn') {
        this.handleCancel();
      }
    });
    
    this.addEventListener('input', (event) => {
      this.handleInputChange(event);
    });
  }

  /**
   * Handle form submission
   */
  handleSubmit() {
    // TODO: Implement submit handling
    this.collectFormData();
    this.submit();
  }

  /**
   * Handle form cancellation
   */
  handleCancel() {
    // TODO: Implement cancel handling
    this.dispatchEvent(new CustomEvent('formCancel', {
      bubbles: true
    }));
  }

  /**
   * Handle input changes
   */
  handleInputChange(event) {
    // TODO: Implement input change handling
    const { name, value } = event.target;
    this.formData[name] = value;
  }

  /**
   * Collect form data
   */
  collectFormData() {
    // TODO: Implement form data collection
    const form = this.querySelector('#gameNightForm');
    const formData = new FormData(form);
    
    for (const [key, value] of formData.entries()) {
      this.formData[key] = value;
    }
  }

  /**
   * Format date for input field
   */
  formatDateForInput(date) {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  }
}

// Register custom element
customElements.define('game-night-form', GameNightForm);