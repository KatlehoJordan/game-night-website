# API Reference

This document provides a comprehensive API reference for the Game Night Website components and utilities.

## 📋 Table of Contents

- [Core Application API](#core-application-api)
- [Storage API](#storage-api)
- [Component APIs](#component-apis)
- [Utility Functions](#utility-functions)
- [Event System](#event-system)
- [Data Models](#data-models)

## 🏗️ Core Application API

### App Object (`js/app.js`)

The main application controller that coordinates all components and manages application state.

#### `App.init()`

Initializes the application and sets up all components.

```javascript
App.init()
```

**Returns**: `Promise<void>`

**Example**:
```javascript
document.addEventListener('DOMContentLoaded', () => {
  App.init().then(() => {
    console.log('Game Night Website ready!');
  });
});
```

#### `App.getCurrentUser()`

Gets the current user information from storage.

```javascript
App.getCurrentUser()
```

**Returns**: `Object|null` - User object or null if not set

#### `App.setCurrentUser(user)`

Sets the current user information.

```javascript
App.setCurrentUser(user)
```

**Parameters**:
- `user` (Object): User information object

**Example**:
```javascript
App.setCurrentUser({
  name: 'John Doe',
  email: 'john@example.com',
  preferences: {
    theme: 'dark',
    notifications: true
  }
});
```

#### `App.showNotification(message, type)`

Displays a notification to the user.

```javascript
App.showNotification(message, type = 'info')
```

**Parameters**:
- `message` (string): Notification message
- `type` (string): Notification type ('info', 'success', 'warning', 'error')

**Example**:
```javascript
App.showNotification('Game night created successfully!', 'success');
```

## 💾 Storage API

### Storage Object (`js/storage.js`)

Handles all data persistence and retrieval operations.

#### Event Management

##### `Storage.createEvent(eventData)`

Creates a new game night event.

```javascript
Storage.createEvent(eventData)
```

**Parameters**:
- `eventData` (Object): Event information
  - `title` (string): Event title
  - `description` (string): Event description
  - `date` (Date): Event date and time
  - `maxGuests` (number): Maximum number of guests
  - `host` (Object): Host information

**Returns**: `Object` - Created event with generated ID

**Example**:
```javascript
const event = Storage.createEvent({
  title: 'Friday Night Board Games',
  description: 'Bring your favorite games!',
  date: new Date('2024-01-15T19:00:00'),
  maxGuests: 6,
  host: {
    name: 'John Doe',
    email: 'john@example.com'
  }
});
```

##### `Storage.getEvent(eventId)`

Retrieves a specific event by ID.

```javascript
Storage.getEvent(eventId)
```

**Parameters**:
- `eventId` (string): Event ID

**Returns**: `Object|null` - Event object or null if not found

##### `Storage.updateEvent(eventId, updates)`

Updates an existing event.

```javascript
Storage.updateEvent(eventId, updates)
```

**Parameters**:
- `eventId` (string): Event ID
- `updates` (Object): Partial event data to update

**Returns**: `Object|null` - Updated event or null if not found

##### `Storage.deleteEvent(eventId)`

Deletes an event.

```javascript
Storage.deleteEvent(eventId)
```

**Parameters**:
- `eventId` (string): Event ID

**Returns**: `boolean` - True if deleted, false if not found

##### `Storage.getAllEvents()`

Gets all events.

```javascript
Storage.getAllEvents()
```

**Returns**: `Array<Object>` - Array of all events

##### `Storage.getEventsByDateRange(startDate, endDate)`

Gets events within a date range.

```javascript
Storage.getEventsByDateRange(startDate, endDate)
```

**Parameters**:
- `startDate` (Date): Start date
- `endDate` (Date): End date

**Returns**: `Array<Object>` - Array of events in date range

#### Guest Management

##### `Storage.addGuest(eventId, guestData)`

Adds a guest to an event.

```javascript
Storage.addGuest(eventId, guestData)
```

**Parameters**:
- `eventId` (string): Event ID
- `guestData` (Object): Guest information
  - `name` (string): Guest name
  - `email` (string, optional): Guest email
  - `dietary` (string, optional): Dietary restrictions
  - `notes` (string, optional): Additional notes

**Returns**: `Object|null` - Updated event or null if event not found

**Example**:
```javascript
Storage.addGuest('event-123', {
  name: 'Alice Smith',
  email: 'alice@example.com',
  dietary: 'vegetarian',
  notes: 'Will bring snacks'
});
```

##### `Storage.removeGuest(eventId, guestId)`

Removes a guest from an event.

```javascript
Storage.removeGuest(eventId, guestId)
```

**Parameters**:
- `eventId` (string): Event ID
- `guestId` (string): Guest ID

**Returns**: `Object|null` - Updated event or null if not found

##### `Storage.updateGuest(eventId, guestId, updates)`

Updates guest information.

```javascript
Storage.updateGuest(eventId, guestId, updates)
```

**Parameters**:
- `eventId` (string): Event ID
- `guestId` (string): Guest ID
- `updates` (Object): Partial guest data to update

**Returns**: `Object|null` - Updated event or null if not found

## 🧩 Component APIs

### GameNightCalendar Component

Custom element for displaying and interacting with the calendar.

#### Attributes

- `view` (string): Calendar view ('month', 'week', 'day')
- `date` (string): Current date in ISO format

#### Methods

##### `calendar.setEvents(events)`

Sets the events to display on the calendar.

```javascript
calendar.setEvents(events)
```

**Parameters**:
- `events` (Array<Object>): Array of event objects

##### `calendar.addEvent(event)`

Adds a new event to the calendar.

```javascript
calendar.addEvent(event)
```

**Parameters**:
- `event` (Object): Event object

##### `calendar.removeEvent(eventId)`

Removes an event from the calendar.

```javascript
calendar.removeEvent(eventId)
```

**Parameters**:
- `eventId` (string): Event ID

##### `calendar.goToDate(date)`

Navigates to a specific date.

```javascript
calendar.goToDate(date)
```

**Parameters**:
- `date` (Date): Date to navigate to

#### Events

##### `eventClick`

Fired when an event is clicked.

```javascript
calendar.addEventListener('eventClick', (event) => {
  console.log('Event clicked:', event.detail.eventId);
});
```

**Detail Object**:
- `eventId` (string): ID of clicked event
- `eventData` (Object): Full event object

##### `dateClick`

Fired when an empty date is clicked.

```javascript
calendar.addEventListener('dateClick', (event) => {
  console.log('Date clicked:', event.detail.date);
});
```

**Detail Object**:
- `date` (Date): Clicked date

### GameNightForm Component

Custom element for creating and editing game nights.

#### Methods

##### `form.showCreateForm(date)`

Shows the form for creating a new event.

```javascript
form.showCreateForm(date)
```

**Parameters**:
- `date` (Date, optional): Pre-selected date

##### `form.showEditForm(eventId)`

Shows the form for editing an existing event.

```javascript
form.showEditForm(eventId)
```

**Parameters**:
- `eventId` (string): ID of event to edit

##### `form.reset()`

Resets the form to initial state.

```javascript
form.reset()
```

##### `form.validate()`

Validates the current form data.

```javascript
form.validate()
```

**Returns**: `Object` - Validation result
- `valid` (boolean): Whether form is valid
- `errors` (Array<string>): Array of error messages

#### Events

##### `formSubmit`

Fired when the form is submitted with valid data.

```javascript
form.addEventListener('formSubmit', (event) => {
  const { eventData, isEdit } = event.detail;
  // Handle form submission
});
```

**Detail Object**:
- `eventData` (Object): Form data
- `isEdit` (boolean): Whether this is an edit operation

##### `formCancel`

Fired when the form is cancelled.

```javascript
form.addEventListener('formCancel', () => {
  // Handle form cancellation
});
```

### GuestList Component

Displays and manages the guest list for an event.

#### Properties

##### `eventId`

The ID of the event to display guests for.

```javascript
guestList.eventId = 'event-123';
```

#### Methods

##### `guestList.refresh()`

Refreshes the guest list display.

```javascript
guestList.refresh()
```

##### `guestList.showAddGuestForm()`

Shows the form for adding a new guest.

```javascript
guestList.showAddGuestForm()
```

#### Events

##### `guestAdded`

Fired when a guest is successfully added.

```javascript
guestList.addEventListener('guestAdded', (event) => {
  console.log('Guest added:', event.detail.guest);
});
```

##### `guestRemoved`

Fired when a guest is removed.

```javascript
guestList.addEventListener('guestRemoved', (event) => {
  console.log('Guest removed:', event.detail.guestId);
});
```

### RSVPButton Component

Handles RSVP functionality for events.

#### Properties

##### `eventId`

The ID of the event for RSVP.

```javascript
rsvpButton.eventId = 'event-123';
```

##### `userId`

The current user's ID.

```javascript
rsvpButton.userId = 'user-456';
```

#### Methods

##### `rsvpButton.updateState()`

Updates the button state based on current RSVP status.

```javascript
rsvpButton.updateState()
```

#### Events

##### `rsvpSuccess`

Fired when RSVP is successful.

```javascript
rsvpButton.addEventListener('rsvpSuccess', (event) => {
  const { eventId, action } = event.detail; // action: 'join' or 'leave'
});
```

## 🛠️ Utility Functions

### Date Utilities (`js/utils/date.js`)

#### `formatDate(date, format)`

Formats a date according to the specified format.

```javascript
formatDate(date, format)
```

**Parameters**:
- `date` (Date): Date to format
- `format` (string): Format string ('short', 'long', 'time', 'datetime')

**Returns**: `string` - Formatted date

**Example**:
```javascript
formatDate(new Date(), 'short'); // "1/15/2024"
formatDate(new Date(), 'long');  // "January 15, 2024"
formatDate(new Date(), 'time');  // "7:00 PM"
```

#### `isDateInRange(date, startDate, endDate)`

Checks if a date falls within a range.

```javascript
isDateInRange(date, startDate, endDate)
```

**Parameters**:
- `date` (Date): Date to check
- `startDate` (Date): Range start
- `endDate` (Date): Range end

**Returns**: `boolean` - True if date is in range

#### `addDays(date, days)`

Adds days to a date.

```javascript
addDays(date, days)
```

**Parameters**:
- `date` (Date): Starting date
- `days` (number): Number of days to add

**Returns**: `Date` - New date

### Validation Utilities (`js/utils/validation.js`)

#### `validateEmail(email)`

Validates an email address.

```javascript
validateEmail(email)
```

**Parameters**:
- `email` (string): Email to validate

**Returns**: `boolean` - True if valid

#### `validateEventData(eventData)`

Validates event data structure.

```javascript
validateEventData(eventData)
```

**Parameters**:
- `eventData` (Object): Event data to validate

**Returns**: `Object` - Validation result
- `valid` (boolean): Whether data is valid
- `errors` (Array<string>): Array of error messages

#### `sanitizeInput(input)`

Sanitizes user input to prevent XSS.

```javascript
sanitizeInput(input)
```

**Parameters**:
- `input` (string): Input to sanitize

**Returns**: `string` - Sanitized input

## 📡 Event System

### Custom Events

The application uses a custom event system for component communication.

#### `App.emit(eventName, data)`

Emits a custom event.

```javascript
App.emit(eventName, data)
```

**Parameters**:
- `eventName` (string): Name of the event
- `data` (any): Event data

#### `App.on(eventName, handler)`

Listens for a custom event.

```javascript
App.on(eventName, handler)
```

**Parameters**:
- `eventName` (string): Name of the event
- `handler` (Function): Event handler function

#### `App.off(eventName, handler)`

Removes an event listener.

```javascript
App.off(eventName, handler)
```

**Parameters**:
- `eventName` (string): Name of the event
- `handler` (Function): Event handler to remove

### Global Events

#### `gameNightCreated`

Fired when a new game night is created.

```javascript
App.on('gameNightCreated', (event) => {
  console.log('New game night:', event.detail);
});
```

#### `gameNightUpdated`

Fired when a game night is updated.

```javascript
App.on('gameNightUpdated', (event) => {
  const { eventId, updates } = event.detail;
});
```

#### `guestJoined`

Fired when a guest joins an event.

```javascript
App.on('guestJoined', (event) => {
  const { eventId, guest } = event.detail;
});
```

## 📊 Data Models

### Event Model

```typescript
interface GameNightEvent {
  id: string;
  title: string;
  description: string;
  date: Date;
  duration: number; // minutes
  maxGuests: number;
  host: {
    name: string;
    email?: string;
  };
  guests: Guest[];
  settings: {
    allowWaitlist: boolean;
    requireApproval: boolean;
    publicVisible: boolean;
  };
  metadata: {
    createdAt: Date;
    updatedAt: Date;
    version: number;
  };
}
```

### Guest Model

```typescript
interface Guest {
  id: string;
  name: string;
  email?: string;
  rsvpDate: Date;
  dietary?: string;
  notes?: string;
  status: 'confirmed' | 'waitlist' | 'cancelled';
}
```

### User Preferences Model

```typescript
interface UserPreferences {
  userId: string;
  displayName: string;
  defaultSettings: {
    maxGuests: number;
    defaultDuration: number;
    timezone: string;
  };
  notifications: {
    email?: string;
    reminders: boolean;
    updates: boolean;
  };
  theme: 'dark' | 'light' | 'auto';
}
```

---

This API reference provides a comprehensive guide to all available functions and components in the Game Night Website. Use this as a reference when developing new features or integrating with existing functionality.