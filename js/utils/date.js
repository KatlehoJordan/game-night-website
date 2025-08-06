/**
 * Date Utility Functions
 * Comprehensive date handling for the Game Night Website
 */

class DateUtils {
  /**
   * Format date according to specified format
   */
  static formatDate(date, format = 'short') {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
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
          minute: '2-digit',
          hour12: true
        });
      case 'datetime':
        return d.toLocaleString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true
        });
      case 'day-month':
        return d.toLocaleDateString('en-US', { 
          month: 'short', 
          day: 'numeric' 
        });
      case 'weekday':
        return d.toLocaleDateString('en-US', { 
          weekday: 'long' 
        });
      case 'month-year':
        return d.toLocaleDateString('en-US', { 
          year: 'numeric', 
          month: 'long' 
        });
      case 'iso':
        return d.toISOString();
      default:
        return d.toLocaleDateString();
    }
  }

  /**
   * Check if date falls within range
   */
  static isDateInRange(date, startDate, endDate) {
    const d = new Date(date);
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(d.getTime()) || isNaN(start.getTime()) || isNaN(end.getTime())) {
      return false;
    }
    
    return d >= start && d <= end;
  }

  /**
   * Add days to a date
   */
  static addDays(date, days) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    result.setDate(result.getDate() + days);
    return result;
  }

  /**
   * Add months to a date
   */
  static addMonths(date, months) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    result.setMonth(result.getMonth() + months);
    return result;
  }

  /**
   * Add years to a date
   */
  static addYears(date, years) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    result.setFullYear(result.getFullYear() + years);
    return result;
  }

  /**
   * Get start of day
   */
  static startOfDay(date) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    result.setHours(0, 0, 0, 0);
    return result;
  }

  /**
   * Get end of day
   */
  static endOfDay(date) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    result.setHours(23, 59, 59, 999);
    return result;
  }

  /**
   * Get start of month
   */
  static startOfMonth(date) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  /**
   * Get end of month
   */
  static endOfMonth(date) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    result.setMonth(result.getMonth() + 1, 0);
    result.setHours(23, 59, 59, 999);
    return result;
  }

  /**
   * Get start of week (Sunday)
   */
  static startOfWeek(date) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    const day = result.getDay();
    result.setDate(result.getDate() - day);
    result.setHours(0, 0, 0, 0);
    return result;
  }

  /**
   * Get end of week (Saturday)
   */
  static endOfWeek(date) {
    const result = new Date(date);
    if (isNaN(result.getTime())) return null;
    
    const day = result.getDay();
    result.setDate(result.getDate() + (6 - day));
    result.setHours(23, 59, 59, 999);
    return result;
  }

  /**
   * Check if two dates are the same day
   */
  static isSameDay(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return false;
    }
    
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth() &&
           d1.getDate() === d2.getDate();
  }

  /**
   * Check if two dates are in the same month
   */
  static isSameMonth(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return false;
    }
    
    return d1.getFullYear() === d2.getFullYear() &&
           d1.getMonth() === d2.getMonth();
  }

  /**
   * Check if date is today
   */
  static isToday(date) {
    return this.isSameDay(date, new Date());
  }

  /**
   * Check if date is in the past
   */
  static isPast(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    
    return this.endOfDay(d) < new Date();
  }

  /**
   * Check if date is in the future
   */
  static isFuture(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return false;
    
    return this.startOfDay(d) > new Date();
  }

  /**
   * Check if date is this week
   */
  static isThisWeek(date) {
    const today = new Date();
    const startWeek = this.startOfWeek(today);
    const endWeek = this.endOfWeek(today);
    
    return this.isDateInRange(date, startWeek, endWeek);
  }

  /**
   * Check if date is this month
   */
  static isThisMonth(date) {
    return this.isSameMonth(date, new Date());
  }

  /**
   * Get days between two dates
   */
  static daysBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return null;
    }
    
    const diffTime = Math.abs(d2 - d1);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  /**
   * Get hours between two dates
   */
  static hoursBetween(date1, date2) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      return null;
    }
    
    const diffTime = Math.abs(d2 - d1);
    return Math.floor(diffTime / (1000 * 60 * 60));
  }

  /**
   * Get calendar month grid (6 weeks x 7 days)
   */
  static getCalendarGrid(date) {
    const firstDay = this.startOfMonth(date);
    if (!firstDay) return [];
    
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
   * Get weeks in a month
   */
  static getWeeksInMonth(date) {
    const grid = this.getCalendarGrid(date);
    const weeks = [];
    
    for (let i = 0; i < 6; i++) {
      weeks.push(grid.slice(i * 7, (i + 1) * 7));
    }
    
    return weeks;
  }

  /**
   * Parse date from string
   */
  static parseDate(dateString) {
    if (!dateString) return null;
    
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date;
  }

  /**
   * Format for datetime-local input
   */
  static formatForInput(date) {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    return d.toISOString().slice(0, 16);
  }

  /**
   * Format for date input
   */
  static formatForDateInput(date) {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    return d.toISOString().slice(0, 10);
  }

  /**
   * Format for time input
   */
  static formatForTimeInput(date) {
    if (!date) return '';
    
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    return d.toTimeString().slice(0, 5);
  }

  /**
   * Get relative time description
   */
  static getRelativeTime(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return '';
    
    const now = new Date();
    const diffMs = d - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor(diffMs / (1000 * 60));

    if (this.isToday(d)) {
      if (Math.abs(diffHours) < 1) {
        if (Math.abs(diffMinutes) < 5) {
          return 'Now';
        } else if (diffMinutes < 0) {
          return `${Math.abs(diffMinutes)} minutes ago`;
        } else {
          return `In ${diffMinutes} minutes`;
        }
      } else if (diffHours < 0) {
        return `${Math.abs(diffHours)} hours ago`;
      } else {
        return `In ${diffHours} hours`;
      }
    }

    if (diffDays === 1) {
      return 'Tomorrow';
    } else if (diffDays === -1) {
      return 'Yesterday';
    } else if (diffDays > 1 && diffDays <= 7) {
      return `In ${diffDays} days`;
    } else if (diffDays < -1 && diffDays >= -7) {
      return `${Math.abs(diffDays)} days ago`;
    } else if (this.isThisWeek(d)) {
      return this.formatDate(d, 'weekday');
    } else if (diffDays > 7) {
      return `In ${Math.floor(diffDays / 7)} weeks`;
    } else {
      return this.formatDate(d, 'day-month');
    }
  }

  /**
   * Get month names
   */
  static getMonthNames(format = 'long') {
    const months = [];
    for (let i = 0; i < 12; i++) {
      const date = new Date(2024, i, 1);
      months.push(date.toLocaleDateString('en-US', { 
        month: format 
      }));
    }
    return months;
  }

  /**
   * Get day names
   */
  static getDayNames(format = 'long') {
    const days = [];
    // Start from Sunday (0) to Saturday (6)
    for (let i = 0; i < 7; i++) {
      const date = new Date(2024, 0, i); // January 2024 starts on Monday
      const day = new Date(2024, 0, i + 7); // Get the first week
      days.push(day.toLocaleDateString('en-US', { 
        weekday: format 
      }));
    }
    return days;
  }

  /**
   * Get time zones
   */
  static getTimezone() {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  }

  /**
   * Create date from components
   */
  static createDate(year, month, day, hour = 0, minute = 0, second = 0) {
    return new Date(year, month - 1, day, hour, minute, second);
  }

  /**
   * Clone a date
   */
  static cloneDate(date) {
    return new Date(date.getTime());
  }

  /**
   * Get age in years
   */
  static getAge(birthDate, referenceDate = new Date()) {
    const birth = new Date(birthDate);
    const reference = new Date(referenceDate);
    
    if (isNaN(birth.getTime()) || isNaN(reference.getTime())) {
      return null;
    }
    
    let age = reference.getFullYear() - birth.getFullYear();
    const monthDiff = reference.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && reference.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  }

  /**
   * Get duration string
   */
  static formatDuration(minutes) {
    if (!minutes || minutes < 0) return '';
    
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    
    if (hours === 0) {
      return `${mins} min${mins !== 1 ? 's' : ''}`;
    } else if (mins === 0) {
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    } else {
      return `${hours}h ${mins}m`;
    }
  }

  /**
   * Check if year is leap year
   */
  static isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  }

  /**
   * Get days in month
   */
  static getDaysInMonth(date) {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    
    return new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
  }
}

// Make DateUtils globally available
window.DateUtils = DateUtils;