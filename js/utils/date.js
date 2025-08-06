/**
 * Date Utility Functions
 * 
 * TODO: Implement date utilities including:
 * - Date formatting functions
 * - Date range calculations
 * - Time zone handling
 * - Calendar date operations
 */

class DateUtils {
  /**
   * Format date according to specified format
   */
  static formatDate(date, format = 'short') {
    // TODO: Implement date formatting
    if (!date) return '';
    
    const d = new Date(date);
    
    switch (format) {
      case 'short':
        return d.toLocaleDateString();
      case 'long':
        return d.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric' 
        });
      case 'time':
        return d.toLocaleTimeString('en-US', { 
          hour: 'numeric', 
          minute: '2-digit' 
        });
      case 'datetime':
        return d.toLocaleString();
      default:
        return d.toLocaleDateString();
    }
  }

  /**
   * Check if date falls within range
   */
  static isDateInRange(date, startDate, endDate) {
    // TODO: Implement date range check
    const d = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    return d >= start && d <= end;
  }

  /**
   * Add days to a date
   */
  static addDays(date, days) {
    // TODO: Implement add days
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Add months to a date
   */
  static addMonths(date, months) {
    // TODO: Implement add months
    const result = new Date(date);
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * Get start of day
   */
  static startOfDay(date) {
    // TODO: Implement start of day
    const result = new Date(date);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  /**
   * Get end of day
   */
  static endOfDay(date) {
    // TODO: Implement end of day
    const result = new Date(date);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  /**
   * Get start of month
   */
  static startOfMonth(date) {
    // TODO: Implement start of month
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  /**
   * Get end of month
   */
  static endOfMonth(date) {
    // TODO: Implement end of month
    const result = new Date(date);
    result.setMonth(result.getMonth() + 1, 0);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  /**
   * Check if two dates are the same day
   */
  static isSameDay(date1, date2) {
    // TODO: Implement same day check
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  /**
   * Check if date is today
   */
  static isToday(date) {
    // TODO: Implement today check
    return this.isSameDay(date, new Date());
  }

  /**
   * Check if date is in the past
   */
  static isPast(date) {
    // TODO: Implement past check
    return new Date(date) < new Date();
  }

  /**
   * Check if date is in the future
   */
  static isFuture(date) {
    // TODO: Implement future check
    return new Date(date) > new Date();
  }

  /**
   * Get days between two dates
   */
  static daysBetween(date1, date2) {
    // TODO: Implement days between calculation
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Get calendar month grid (6 weeks x 7 days)
   */
  static getCalendarGrid(date) {
    // TODO: Implement calendar grid generation
    const firstDay = this.startOfMonth(date);
    const lastDay = this.endOfMonth(date);
    
    // Get the start of the calendar (may include days from previous month)
    const calendarStart = new Date(firstDay);
    calendarStart.setDate(calendarStart.getDate() - firstDay.getDay());
    
    // Generate 42 days (6 weeks)
    const days = [];
    for (let i = 0; i < 42; i++) {
      const day = new Date(calendarStart);
      day.setDate(day.getDate() + i);
      days.push(day);
    }
    
    return days;
  }

  /**
   * Parse date from string
   */
  static parseDate(dateString) {
    // TODO: Implement date parsing
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  /**
   * Format for datetime-local input
   */
  static formatForInput(date) {
    // TODO: Implement input formatting
    if (!date) return '';
    
    const d = new Date(date);
    return d.toISOString().slice(0, 16);
  }
}

// Make DateUtils globally available
window.DateUtils = DateUtils;