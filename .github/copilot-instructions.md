# Game Night Website - GitHub Copilot Instructions

**ALWAYS follow these instructions first** and only fallback to additional search and context gathering if the information in these instructions is incomplete or found to be in error.

## 🎯 Project Overview

Game Night Website is a static HTML/CSS/JavaScript web application for scheduling and managing game nights with friends. It runs entirely in the browser using localStorage for data persistence and is designed for GitHub Pages deployment.

## 🚀 Getting Started - Essential Commands

### Bootstrap Development Environment

Run these commands in order to set up the development environment:

```bash
# Clone repository (if needed)
git clone https://github.com/KatlehoJordan/game-night-website.git
cd game-night-website

# Start development server - CHOOSE ONE OPTION:

# Option 1: Python (recommended - always available)
python3 -m http.server 8000

# Option 2: Node.js (if available)
npx serve . -p 8000
```

**Timing**: Development server starts in < 1 second. Application loads in < 1 second.

### Access Application

Open browser and navigate to: `http://localhost:8000`

**Expected Result**: You should see the Game Night Website with a calendar and "Create Game Night" button.

## ⚡ Key Development Facts

### No Build Process Required
- **Static files only** - HTML, CSS, JavaScript served directly
- **No compilation** - No webpack, rollup, or build tools
- **No package.json** - Pure vanilla JavaScript implementation
- **No dependencies** - Self-contained application

### No Test Framework
- **Manual testing required** - No Jest, Cypress, or automated tests
- **Use browser DevTools** for debugging
- **Test in multiple browsers** manually

### No Linting Configuration
- **No ESLint** or code formatting tools configured
- **Follow existing code style** in the repository
- **Use browser console** to check for JavaScript errors

### Deployment
- **GitHub Pages ready** - Direct deployment from main branch
- **No build step** - Files served as-is from repository

## 🧪 Manual Validation Requirements

**CRITICAL**: After making any changes, ALWAYS run through these complete validation scenarios:

### Core Functionality Test (Required Every Time)
1. **Start development server** (see commands above)
2. **Create a game night**:
   - Click "Create Game Night" button
   - Fill out form with title, description, your name
   - Click "Create Event"
   - Verify success message appears
3. **View calendar**:
   - Verify event appears on calendar on selected date
   - Verify event shows correct title
4. **Test RSVP**:
   - Click on the created event
   - Click "Reserve Spot" button
   - Enter guest name in prompt
   - Verify guest appears in attendees list
   - Verify guest count updates (e.g., "1/6")
5. **Test data persistence**:
   - Refresh the page (F5)
   - Verify event still appears on calendar
   - Verify RSVP data persists

### Cross-Browser Testing (For UI Changes)
Test in these browsers:
- [ ] Chrome (latest)
- [ ] Firefox (latest)  
- [ ] Safari (if available)
- [ ] Edge (if available)

### Responsive Testing (For UI Changes)
Test these viewport sizes:
- [ ] Mobile (320px+)
- [ ] Tablet (768px+)
- [ ] Desktop (1024px+)

### Accessibility Testing (For UI Changes)
- [ ] Keyboard navigation only (no mouse)
- [ ] Tab through all interactive elements
- [ ] Test screen reader compatibility if possible

## 📁 Repository Structure

```
game-night-website/
├── index.html              # Main application entry point
├── css/
│   ├── main.css            # Primary styles and design system
│   ├── calendar.css        # Calendar component styles  
│   └── components.css      # Reusable component styles
├── js/
│   ├── app.js              # Main application controller
│   ├── storage.js          # LocalStorage data layer
│   ├── components/         # Custom web components
│   │   ├── calendar.js         # Calendar component
│   │   ├── game-night-form.js  # Event creation form
│   │   ├── guest-list.js       # Guest management
│   │   └── rsvp-button.js      # RSVP functionality
│   └── utils/              # Utility functions
│       ├── date.js             # Date formatting and manipulation
│       └── validation.js       # Form validation helpers
├── assets/
│   ├── icons/              # Application icons and favicons
│   └── images/             # Game night related images
├── docs/                   # Comprehensive documentation
│   ├── ARCHITECTURE.md         # Technical design patterns
│   ├── API.md                  # Component interfaces
│   └── README.md              # Additional documentation
├── manifest.json           # Progressive Web App configuration
├── README.md              # Project overview and setup
├── CONTRIBUTING.md        # Development workflow and standards
└── COPILOT_GUIDE.md      # Existing Copilot context guide
```

## 🔧 Common Development Tasks

### Adding New Features
1. **Follow existing patterns** in `/js/components/` for new components
2. **Use Web Components API** for reusable UI elements
3. **Update documentation** in `/docs/` if adding major features
4. **Test thoroughly** using validation scenarios above

### Modifying Styles
1. **Edit CSS files** in `/css/` directory
2. **Follow BEM methodology** for CSS class naming
3. **Use CSS custom properties** defined in `main.css` for theming
4. **Test responsive behavior** across all viewport sizes

### Debugging Issues
1. **Check browser console** for JavaScript errors
2. **Inspect localStorage** in DevTools → Application tab
3. **Use Network tab** to verify all resources load correctly
4. **Test with browser cache disabled** for CSS/JS changes

### Working with Data
1. **All data stored in localStorage** - no backend API
2. **Storage layer in `/js/storage.js`** handles data operations
3. **Use Storage Keys constants** defined in storage.js
4. **Test data persistence** after page refresh

## 🚨 Critical Warnings

### NEVER Cancel Operations
- **Development server startup**: Always completes in < 1 second
- **Application loading**: Always completes in < 1 second  
- **Manual testing**: May take 2-5 minutes for full validation
- **DO NOT** cancel any operation - they complete quickly

### Data Safety
- **LocalStorage only** - clearing browser data loses everything
- **No backup mechanism** - warn users about data loss risks
- **Test data persistence** after every change

### Browser Compatibility
- **Modern browsers only** - uses ES6+ features
- **No polyfills** - features may not work in older browsers
- **Progressive enhancement** - basic functionality should work without JavaScript

## 📖 Documentation References

**Always check these for detailed information**:
- **README.md**: Complete project overview and setup instructions  
- **CONTRIBUTING.md**: Development workflow and coding standards
- **docs/ARCHITECTURE.md**: Technical design and patterns
- **docs/API.md**: Component interfaces and utility functions
- **COPILOT_GUIDE.md**: Additional context for GitHub Copilot

## 🎯 Common Code Patterns

### Event Handling
```javascript
// Use event delegation for dynamic content
document.addEventListener('click', (event) => {
  if (event.target.matches('.rsvp-button')) {
    handleRSVP(event.target);
  }
});
```

### Data Management
```javascript
// Use consistent storage patterns
const StorageKeys = {
  GAME_NIGHTS: 'gameNights',
  USER_PREFERENCES: 'userPreferences'
};

function saveGameNight(gameNight) {
  const gameNights = getGameNights();
  gameNights.push(gameNight);
  localStorage.setItem(StorageKeys.GAME_NIGHTS, JSON.stringify(gameNights));
}
```

### Component Communication
```javascript
// Use custom events between components
this.dispatchEvent(new CustomEvent('formSubmit', {
  detail: { eventData: formData },
  bubbles: true
}));
```

## 🔍 Troubleshooting

### Application Won't Load
1. Check browser console for errors
2. Verify development server is running on correct port
3. Clear browser cache and localStorage
4. Test in incognito/private browsing mode

### Changes Not Visible
1. Hard refresh browser (Ctrl+F5 or Cmd+Shift+R)
2. Check if files are being served from correct directory
3. Verify file paths in HTML are correct
4. Clear browser cache

### Events Not Working
1. Check localStorage in DevTools → Application tab
2. Verify JavaScript console for errors
3. Test event creation and RSVP flows manually
4. Clear localStorage and test with fresh data

## 💡 Development Tips

### Code Quality
- **Follow existing patterns** instead of creating new approaches
- **Use browser DevTools** extensively for debugging
- **Test edge cases** like full events, empty states
- **Validate forms** before submission

### Performance
- **Minimal external dependencies** keeps loading fast
- **Optimize images** before adding to `/assets/`
- **Use efficient DOM updates** for calendar rendering
- **Throttle event handlers** for scroll/resize events

---

**Ready for development! Always validate changes using the manual testing scenarios above before considering any change complete.** 🎮✨