/**
 * Validation Utility Functions
 * 
 * TODO: Implement validation utilities including:
 * - Input validation
 * - Data sanitization
 * - Security validation
 * - Form validation helpers
 */

class ValidationUtils {
  /**
   * Validate email address
   */
  static validateEmail(email) {
    // TODO: Implement email validation
    if (!email || typeof email !== 'string') return false;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email.trim());
  }

  /**
   * Validate event data structure
   */
  static validateEventData(eventData) {
    // TODO: Implement event data validation
    const errors = [];
    
    if (!eventData) {
      errors.push('Event data is required');
      return { valid: false, errors };
    }
    
    // Validate title
    if (!eventData.title || typeof eventData.title !== 'string') {
      errors.push('Title is required');
    } else if (eventData.title.trim().length < 3) {
      errors.push('Title must be at least 3 characters long');
    } else if (eventData.title.length > 100) {
      errors.push('Title must be less than 100 characters');
    }
    
    // Validate date
    if (!eventData.date) {
      errors.push('Date is required');
    } else {
      const date = new Date(eventData.date);
      if (isNaN(date.getTime())) {
        errors.push('Invalid date format');
      } else if (date < new Date()) {
        errors.push('Date must be in the future');
      }
    }
    
    // Validate maxGuests
    if (!eventData.maxGuests) {
      errors.push('Maximum guests is required');
    } else if (!Number.isInteger(eventData.maxGuests)) {
      errors.push('Maximum guests must be a number');
    } else if (eventData.maxGuests < 1) {
      errors.push('Maximum guests must be at least 1');
    } else if (eventData.maxGuests > 50) {
      errors.push('Maximum guests cannot exceed 50');
    }
    
    // Validate description (optional)
    if (eventData.description && eventData.description.length > 500) {
      errors.push('Description must be less than 500 characters');
    }
    
    // Validate duration (optional)
    if (eventData.duration && (!Number.isInteger(eventData.duration) || eventData.duration < 30)) {
      errors.push('Duration must be at least 30 minutes');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate guest data
   */
  static validateGuestData(guestData) {
    // TODO: Implement guest data validation
    const errors = [];
    
    if (!guestData) {
      errors.push('Guest data is required');
      return { valid: false, errors };
    }
    
    // Validate name
    if (!guestData.name || typeof guestData.name !== 'string') {
      errors.push('Name is required');
    } else if (guestData.name.trim().length < 2) {
      errors.push('Name must be at least 2 characters long');
    } else if (guestData.name.length > 50) {
      errors.push('Name must be less than 50 characters');
    }
    
    // Validate email (optional)
    if (guestData.email && !this.validateEmail(guestData.email)) {
      errors.push('Invalid email format');
    }
    
    // Validate dietary restrictions (optional)
    if (guestData.dietary && guestData.dietary.length > 100) {
      errors.push('Dietary restrictions must be less than 100 characters');
    }
    
    // Validate notes (optional)
    if (guestData.notes && guestData.notes.length > 200) {
      errors.push('Notes must be less than 200 characters');
    }
    
    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Sanitize input to prevent XSS
   */
  static sanitizeInput(input) {
    // TODO: Implement input sanitization
    if (typeof input !== 'string') return input;
    
    return input
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#x27;')
      .replace(/\//g, '&#x2F;');
  }

  /**
   * Validate required fields
   */
  static validateRequired(value, fieldName) {
    // TODO: Implement required field validation
    if (value === null || value === undefined) {
      return { valid: false, error: `${fieldName} is required` };
    }
    
    if (typeof value === 'string' && value.trim().length === 0) {
      return { valid: false, error: `${fieldName} is required` };
    }
    
    return { valid: true, error: null };
  }

  /**
   * Validate string length
   */
  static validateLength(value, min, max, fieldName) {
    // TODO: Implement length validation
    if (typeof value !== 'string') {
      return { valid: false, error: `${fieldName} must be a string` };
    }
    
    const length = value.trim().length;
    
    if (min && length < min) {
      return { valid: false, error: `${fieldName} must be at least ${min} characters` };
    }
    
    if (max && length > max) {
      return { valid: false, error: `${fieldName} must be less than ${max} characters` };
    }
    
    return { valid: true, error: null };
  }

  /**
   * Validate number range
   */
  static validateRange(value, min, max, fieldName) {
    // TODO: Implement range validation
    const num = Number(value);
    
    if (isNaN(num)) {
      return { valid: false, error: `${fieldName} must be a number` };
    }
    
    if (min !== undefined && num < min) {
      return { valid: false, error: `${fieldName} must be at least ${min}` };
    }
    
    if (max !== undefined && num > max) {
      return { valid: false, error: `${fieldName} must be no more than ${max}` };
    }
    
    return { valid: true, error: null };
  }

  /**
   * Validate date range
   */
  static validateDateRange(date, minDate, maxDate, fieldName) {
    // TODO: Implement date range validation
    const d = new Date(date);
    
    if (isNaN(d.getTime())) {
      return { valid: false, error: `${fieldName} must be a valid date` };
    }
    
    if (minDate && d < new Date(minDate)) {
      return { valid: false, error: `${fieldName} must be after ${new Date(minDate).toLocaleDateString()}` };
    }
    
    if (maxDate && d > new Date(maxDate)) {
      return { valid: false, error: `${fieldName} must be before ${new Date(maxDate).toLocaleDateString()}` };
    }
    
    return { valid: true, error: null };
  }

  /**
   * Validate form data using rules
   */
  static validateForm(data, rules) {
    // TODO: Implement form validation with rules
    const errors = {};
    let isValid = true;
    
    for (const [field, rule] of Object.entries(rules)) {
      const value = data[field];
      const fieldErrors = [];
      
      // Required validation
      if (rule.required) {
        const result = this.validateRequired(value, field);
        if (!result.valid) {
          fieldErrors.push(result.error);
        }
      }
      
      // Skip other validations if field is not required and empty
      if (!rule.required && (!value || (typeof value === 'string' && value.trim().length === 0))) {
        continue;
      }
      
      // Length validation
      if (rule.minLength || rule.maxLength) {
        const result = this.validateLength(value, rule.minLength, rule.maxLength, field);
        if (!result.valid) {
          fieldErrors.push(result.error);
        }
      }
      
      // Range validation
      if (rule.min !== undefined || rule.max !== undefined) {
        const result = this.validateRange(value, rule.min, rule.max, field);
        if (!result.valid) {
          fieldErrors.push(result.error);
        }
      }
      
      // Email validation
      if (rule.email && value) {
        if (!this.validateEmail(value)) {
          fieldErrors.push(`${field} must be a valid email address`);
        }
      }
      
      // Date validation
      if (rule.date) {
        const result = this.validateDateRange(value, rule.minDate, rule.maxDate, field);
        if (!result.valid) {
          fieldErrors.push(result.error);
        }
      }
      
      // Custom validation
      if (rule.custom && typeof rule.custom === 'function') {
        const result = rule.custom(value, data);
        if (result && !result.valid) {
          fieldErrors.push(result.error);
        }
      }
      
      if (fieldErrors.length > 0) {
        errors[field] = fieldErrors;
        isValid = false;
      }
    }
    
    return {
      valid: isValid,
      errors,
      fieldErrors: errors
    };
  }

  /**
   * Escape HTML entities
   */
  static escapeHtml(text) {
    // TODO: Implement HTML escaping
    return this.sanitizeInput(text);
  }

  /**
   * Validate URL
   */
  static validateUrl(url) {
    // TODO: Implement URL validation
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}

// Make ValidationUtils globally available
window.ValidationUtils = ValidationUtils;