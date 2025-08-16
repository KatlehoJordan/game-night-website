# Technical Architecture

This document outlines the technical architecture and design decisions for the Game Night Website.

## 🏗️ System Architecture

### Overview

The Game Night Website is a client-side single-page application (SPA) designed to run entirely in the browser without requiring a backend server. This approach enables simple deployment on GitHub Pages while providing a rich, interactive user experience.

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser Environment                       │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐  ┌─────────────────┐  ┌──────────────┐ │
│  │   Presentation  │  │   Application   │  │     Data     │ │
│  │      Layer      │  │      Layer      │  │    Layer     │ │
│  │                 │  │                 │  │              │ │
│  │ • HTML Template │  │ • Event Handler │  │ • LocalStore │ │
│  │ • CSS Styles    │  │ • State Mgmt    │  │ • JSON Data  │ │
│  │ • UI Components │  │ • Business Logic│  │ • Validation │ │
│  └─────────────────┘  └─────────────────┘  └──────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## 🎯 Design Principles

### 1. Progressive Enhancement
- Core functionality works without JavaScript
- Enhanced experience with JavaScript enabled
- Graceful degradation for older browsers

### 2. Mobile-First Design
- Responsive design starting from mobile viewport
- Touch-friendly interfaces and interactions
- Performance optimized for mobile networks

### 3. Component-Based Architecture
- Reusable UI components with encapsulated logic
- Custom elements for complex interactions
- Event-driven communication between components

### 4. Data-Driven UI
- Single source of truth for application state
- Reactive updates based on data changes
- Immutable data patterns where possible

## 🧩 Core Components

### Calendar Component (`js/components/calendar.js`)

**Purpose**: Display game nights in a calendar interface

**Key Features**:
- Month/week/day views
- Event creation and editing
- Date selection and navigation
- Integration with FullCalendar.js

**API**:
```javascript
class GameNightCalendar extends HTMLElement {
  // Initialize calendar with events
  init(events = [])
  
  // Add new event to calendar
  addEvent(eventData)
  
  // Update existing event
  updateEvent(eventId, eventData)
  
  // Remove event from calendar
  removeEvent(eventId)
  
  // Get all events for date range
  getEvents(startDate, endDate)
}
```

### Game Night Form Component (`js/components/game-night-form.js`)

**Purpose**: Create and edit game night events

**Key Features**:
- Form validation
- Date/time selection
- Guest limit setting
- Event description and details

**API**:
```javascript
class GameNightForm extends HTMLElement {
  // Show form for creating new event
  showCreate(date = new Date())
  
  // Show form for editing existing event
  showEdit(eventId)
  
  // Validate form data
  validate()
  
  // Submit form data
  submit()
  
  // Reset form to initial state
  reset()
}
```

### Guest List Component (`js/components/guest-list.js`)

**Purpose**: Display and manage event attendees

**Key Features**:
- Current guest list display
- Remaining spots indicator
- Guest management (add/remove)
- RSVP status tracking

### RSVP Component (`js/components/rsvp-button.js`)

**Purpose**: Handle guest reservations

**Key Features**:
- Reserve/cancel spot functionality
- Guest information collection
- Confirmation and feedback
- Integration with guest list

## 💾 Data Management

### Storage Strategy

**LocalStorage**: Primary storage mechanism
- Persistent across browser sessions
- No server requirements
- 5-10MB storage limit (sufficient for use case)

**Data Schema**:
```javascript
// Game Night Event
{
  id: "event_uuid_here",
  title: "Friday Night Board Games",
  description: "Bring your favorite games!",
  date: "2024-01-15T19:00:00.000Z",
  duration: 240, // minutes
  maxGuests: 6,
  host: {
    name: "Host Name",
    contact: "host@email.com"
  },
  guests: [
    {
      id: "guest_uuid_here",
      name: "Guest Name",
      rsvpDate: "2024-01-10T12:00:00.000Z",
      dietary: "vegetarian",
      notes: "Will bring snacks"
    }
  ],
  settings: {
    allowWaitlist: true,
    requireApproval: false,
    publicVisible: true
  },
  metadata: {
    createdAt: "2024-01-01T10:00:00.000Z",
    updatedAt: "2024-01-10T15:30:00.000Z",
    version: 1
  }
}

// User Preferences
{
  userId: "user_uuid_here",
  displayName: "User Name",
  defaultSettings: {
    maxGuests: 4,
    defaultDuration: 180,
    timezone: "America/New_York"
  },
  notifications: {
    email: "user@email.com",
    reminders: true,
    updates: true
  },
  theme: "dark" | "light" | "auto"
}
```

### Data Access Layer (`js/storage.js`)

**Purpose**: Centralized data management and persistence

**Key Functions**:
```javascript
// Event management
function createEvent(eventData)
function getEvent(eventId)
function updateEvent(eventId, updates)
function deleteEvent(eventId)
function getAllEvents()
function getEventsByDate(date)

// Guest management  
function addGuest(eventId, guestData)
function removeGuest(eventId, guestId)
function updateGuest(eventId, guestId, updates)

// User preferences
function getUserPreferences()
function updateUserPreferences(updates)

// Data validation and migration
function validateEventData(data)
function migrateDataSchema(currentVersion, targetVersion)
```

## 🎨 Styling Architecture

### CSS Organization

```
css/
├── main.css           # Base styles and CSS custom properties
├── layout.css         # Grid and flexbox layouts
├── components.css     # Component-specific styles
├── calendar.css       # Calendar component styles
├── forms.css          # Form styling
├── utilities.css      # Utility classes
└── responsive.css     # Media queries and responsive styles
```

### Design System

**CSS Custom Properties** for consistent theming:
```css
:root {
  /* Colors */
  --color-primary: #4f46e5;
  --color-secondary: #06b6d4;
  --color-success: #10b981;
  --color-warning: #f59e0b;
  --color-error: #ef4444;
  
  /* Typography */
  --font-family-base: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto;
  --font-size-base: 1rem;
  --line-height-base: 1.5;
  
  /* Spacing */
  --spacing-xs: 0.25rem;
  --spacing-sm: 0.5rem;
  --spacing-md: 1rem;
  --spacing-lg: 1.5rem;
  --spacing-xl: 2rem;
  
  /* Layout */
  --container-max-width: 1200px;
  --border-radius: 0.5rem;
  --box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}
```

### Component Styling Strategy

**BEM Methodology** for class naming:
```css
/* Block */
.game-night-card { }

/* Element */
.game-night-card__title { }
.game-night-card__description { }
.game-night-card__actions { }

/* Modifier */
.game-night-card--featured { }
.game-night-card--full { }
```

## 🔧 Build and Deployment

### Development Workflow

**No Build Process Required**:
- Direct file serving for development
- No compilation or bundling needed
- Simple local server setup

**Development Server Options**:
```bash
# Python (built-in)
python -m http.server 8000

# Node.js (if available)
npx serve . -p 8000

# VS Code Live Server extension
# Right-click index.html → "Open with Live Server"
```

### GitHub Pages Deployment

**Automatic Deployment**:
- Direct deployment from main branch
- No build step required
- Automatic SSL certificate
- Custom domain support available

**Deployment Configuration**:

Three GitHub Actions workflows handle deployment:

1. **Main Deployment** (`.github/workflows/deploy.yml`):
```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [ main ]
  workflow_dispatch:
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/configure-pages@v4
      - uses: actions/upload-pages-artifact@v3
        with:
          path: '.'
      - uses: actions/deploy-pages@v4
```

2. **PR Preview Deployment** (`.github/workflows/pr-preview.yml`):
   - Triggers when PRs are marked as "ready for review"
   - Deploys to `https://[owner].github.io/[repo]/pr-[number]/`
   - Uses environments for deployment protection
   - Automatically comments on PRs with preview links

3. **PR Cleanup** (`.github/workflows/pr-cleanup.yml`):
   - Cleans up preview deployments when PRs are closed
   - Maintains organized deployment structure

## 📱 Progressive Web App (PWA)

### Service Worker Strategy

**Cache-First Approach**:
- Static assets cached for performance
- Dynamic content with network fallback
- Offline functionality for viewing data

**Caching Strategy**:
```javascript
// Static assets - Cache First
const STATIC_CACHE = [
  '/',
  '/css/main.css',
  '/js/app.js',
  '/assets/icons/icon-192.png'
];

// API data - Network First with Cache Fallback
// (Future: when backend is added)
```

### Manifest Configuration

**Web App Manifest** (`manifest.json`):
```json
{
  "name": "Game Night Website",
  "short_name": "Game Night",
  "description": "Schedule and manage game nights with friends",
  "start_url": "/",
  "display": "standalone",
  "theme_color": "#4f46e5",
  "background_color": "#ffffff",
  "icons": [
    {
      "src": "/assets/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/assets/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🔐 Security Considerations

### Client-Side Security

**Data Validation**:
- Input sanitization for user content
- XSS prevention in dynamic content
- Date/time validation for events

**Content Security Policy** (CSP):
```html
<meta http-equiv="Content-Security-Policy" 
      content="default-src 'self'; 
               script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;
               style-src 'self' 'unsafe-inline';
               img-src 'self' data: https:;">
```

### Privacy Considerations

**Local Data Only**:
- No data transmitted to external servers
- User data remains in browser storage
- No tracking or analytics by default

## 📊 Performance Optimization

### Loading Strategy

**Critical Resource Optimization**:
- Inline critical CSS
- Defer non-critical JavaScript
- Optimize images with modern formats

**Resource Loading**:
```html
<!-- Critical CSS inlined -->
<style>/* Critical styles here */</style>

<!-- Non-critical CSS loaded asynchronously -->
<link rel="preload" href="/css/components.css" as="style" onload="this.onload=null;this.rel='stylesheet'">

<!-- JavaScript loaded with defer -->
<script defer src="/js/app.js"></script>
```

### Runtime Performance

**Efficient DOM Updates**:
- Virtual DOM patterns for complex updates
- Event delegation for dynamic content
- Throttled scroll and resize handlers

**Memory Management**:
- Event listener cleanup
- Proper component disposal
- Efficient data structures

## 🧪 Testing Strategy

### Manual Testing Checklist

**Functionality Testing**:
- [ ] Create game night events
- [ ] RSVP to events
- [ ] Cancel reservations
- [ ] View calendar in different modes
- [ ] Data persistence across sessions

**Cross-Browser Testing**:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)

**Responsive Testing**:
- [ ] Mobile (320px+)
- [ ] Tablet (768px+)
- [ ] Desktop (1024px+)

**Accessibility Testing**:
- [ ] Keyboard navigation
- [ ] Screen reader compatibility
- [ ] Color contrast compliance
- [ ] Focus management

### Future Testing Automation

**Unit Testing** (planned):
- Jest for component logic
- jsdom for DOM testing
- Test coverage reporting

**End-to-End Testing** (planned):
- Cypress for user workflows
- Visual regression testing
- Performance testing

## 🔮 Future Enhancements

### Phase 2: Backend Integration

**Optional Backend Features**:
- Real-time synchronization
- User authentication
- Email notifications
- Data backup and sync

**API Design** (future):
```javascript
// RESTful API endpoints
GET    /api/events
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
POST   /api/events/:id/rsvp
DELETE /api/events/:id/rsvp/:guestId
```

### Phase 3: Advanced Features

**Planned Enhancements**:
- Multiple calendar support
- Game library integration
- Social sharing features
- Advanced analytics

---

This architecture provides a solid foundation for the Game Night Website while maintaining simplicity and ease of deployment. The modular design allows for future enhancements while keeping the current implementation focused and maintainable.