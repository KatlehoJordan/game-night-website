# GitHub Copilot Quick Start Guide

This document provides GitHub Copilot with essential context to rapidly understand and contribute to the Game Night Website project.

## 🎯 Project Summary

**Game Night Website** is a static web application for scheduling and managing game nights with friends. It's designed to be hosted on GitHub Pages with no backend requirements.

### Core Requirements ✅
- 📅 Calendar interface for viewing/creating game nights
- 🎮 Host configuration (date, guest limit, event details)
- 👥 Guest RSVP and management system
- 🔄 Real-time updates of guest lists and available spots
- 📱 GitHub Pages deployment ready

## 🏗️ Architecture Overview

```
Client-Side SPA
├── HTML5 Structure (index.html)
├── CSS3 Styling (design system + components)
├── Vanilla JavaScript (ES6+ components)
├── LocalStorage (data persistence)
└── PWA Capabilities (manifest.json)
```

### Key Components
1. **GameNightCalendar** - Calendar display and navigation
2. **GameNightForm** - Event creation/editing forms  
3. **GuestList** - Guest management and display
4. **RSVPButton** - Guest reservation functionality
5. **Storage** - Data persistence layer
6. **App** - Application controller and coordinator

## 🛠️ Implementation Status

### ✅ Completed
- Project structure and organization
- Comprehensive documentation (README, API, Architecture)
- Component interfaces and APIs defined
- Data models and storage schema
- Development guidelines and patterns
- HTML structure with semantic markup
- CSS design system foundation
- JavaScript component scaffolding
- PWA manifest configuration

### 🚧 Ready for Implementation
All files contain detailed TODO comments and complete specifications for implementation:

1. **CSS Styling**: Complete the design system, responsive layouts, and component styles
2. **JavaScript Logic**: Implement component functionality, event handling, and data management
3. **Calendar Integration**: Build custom calendar or integrate FullCalendar.js
4. **Form Validation**: Complete client-side validation and error handling
5. **Storage Implementation**: LocalStorage operations and data persistence
6. **PWA Features**: Service worker and offline functionality

## 🔧 Development Patterns

### Web Components Architecture
```javascript
class GameNightCalendar extends HTMLElement {
  // Custom element with encapsulated functionality
  // Event-driven communication between components
  // Reactive updates based on data changes
}
```

### Data Management
```javascript
// Centralized storage with validation
Storage.createEvent(eventData)  // CRUD operations
Storage.addGuest(eventId, guest)  // Guest management
ValidationUtils.validateEventData(data)  // Input validation
```

### Event System
```javascript
// Custom events for component communication
component.dispatchEvent(new CustomEvent('eventName', { detail: data }))
App.on('gameNightCreated', handler)  // Global event handling
```

## 📋 Implementation Priorities

1. **Storage Layer** (`js/storage.js`)
   - LocalStorage CRUD operations
   - Data validation and sanitization
   - Error handling and data migration

2. **Calendar Component** (`js/components/calendar.js`)
   - Month/week/day views
   - Event rendering and interaction
   - Date navigation and selection

3. **Form Components** (`js/components/game-night-form.js`)
   - Create/edit event forms
   - Validation and error display
   - Date/time selection widgets

4. **RSVP System** (`js/components/rsvp-button.js`, `js/components/guest-list.js`)
   - Guest registration workflow
   - Spot availability tracking
   - Real-time list updates

5. **Styling** (`css/*.css`)
   - Responsive design implementation
   - Component styling and theming
   - Mobile-first approach

## 🎨 Design System

### CSS Custom Properties
```css
:root {
  --color-primary: #4f46e5;    /* Brand blue */
  --color-secondary: #06b6d4;  /* Accent cyan */
  --spacing-md: 1rem;          /* Base spacing unit */
  --border-radius: 0.5rem;     /* Consistent rounding */
}
```

### Component Classes
```css
.game-night-card { }           /* BEM methodology */
.game-night-card__title { }    /* Element */
.game-night-card--featured { } /* Modifier */
```

## 📊 Data Models

### Event Structure
```javascript
{
  id: "unique-id",
  title: "Friday Night Games",
  date: Date,
  maxGuests: 6,
  guests: [{ id, name, email, rsvpDate }],
  settings: { allowWaitlist, requireApproval }
}
```

### Expected User Flows
1. **Host**: Create event → Share link → Manage guests
2. **Guest**: View calendar → Click event → RSVP → Confirm
3. **Update**: Real-time guest list updates across all views

## 🚀 Getting Started

1. **Local Development**: `python -m http.server 8000` or VS Code Live Server
2. **File Organization**: Follow established structure in `/js`, `/css`, `/docs`
3. **Component Development**: Extend existing component classes with TODO implementations
4. **Testing**: Manual testing in multiple browsers, responsive design validation
5. **Documentation**: Update README and API docs as features are implemented

## 💡 Key Considerations

- **No Backend**: All data stored in LocalStorage
- **Progressive Enhancement**: Works without JavaScript for core features
- **Mobile First**: Touch-friendly, responsive design
- **Accessibility**: WCAG compliant, keyboard navigation
- **Performance**: Minimal dependencies, optimized loading

## 📚 Documentation Reference

- **README.md**: Complete project overview and setup
- **CONTRIBUTING.md**: Development workflow and standards  
- **docs/ARCHITECTURE.md**: Technical design and patterns
- **docs/API.md**: Component interfaces and utilities

---

**Ready for GitHub Copilot to implement features following the established patterns and specifications!** 🎮✨