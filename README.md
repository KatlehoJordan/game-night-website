# Game Night Website

A simple, interactive website for scheduling and managing game nights with friends. This project allows hosts to set up game nights, manage guest lists, and provides an easy way for friends to RSVP and view upcoming events.

## 🎯 Project Purpose

This website is designed to be hosted on GitHub Pages and provides a streamlined solution for organizing game nights. Whether you're hosting board games, video games, or any other social gaming events, this tool helps you manage the logistics.

## ✨ Features

### Core Functionality
- **📅 Interactive Calendar**: Visual calendar display showing available dates and scheduled game nights
- **🎮 Game Night Configuration**: Easy setup for hosts to:
  - Select the date for hosting a game night
  - Specify maximum number of guests
  - Add event details and descriptions
- **👥 Guest Management**: 
  - Simple RSVP system for friends to reserve spots
  - Real-time updates showing current guest list
  - Display of remaining available seats
- **📱 Responsive Design**: Works seamlessly on desktop and mobile devices
- **🔄 Real-time Updates**: Calendar automatically updates to reflect reservations and availability

### Technical Features
- Static site compatible with GitHub Pages
- No backend required - uses client-side storage
- Progressive Web App (PWA) capabilities
- Offline functionality for viewing existing data

## 🛠️ Technology Stack

### Frontend
- **HTML5**: Semantic markup and structure
- **CSS3**: Modern styling with Flexbox/Grid layouts
- **Vanilla JavaScript**: Core functionality and interactivity
- **LocalStorage API**: Client-side data persistence

### Libraries & Frameworks
- **FullCalendar.js**: Calendar component for date selection and event display
- **Modern CSS**: Custom properties (CSS variables) for theming
- **Web Components**: Reusable UI components for modularity

### Hosting & Deployment
- **GitHub Pages**: Static site hosting
- **GitHub Actions**: Automated deployment pipeline

## 📁 Project Structure

```
game-night-website/
├── index.html              # Main application entry point
├── css/
│   ├── main.css            # Primary styles
│   ├── calendar.css        # Calendar-specific styles
│   └── components.css      # Reusable component styles
├── js/
│   ├── app.js              # Main application logic
│   ├── calendar.js         # Calendar functionality
│   ├── storage.js          # Data persistence layer
│   └── components/
│       ├── game-night-form.js    # Game night creation form
│       ├── guest-list.js         # Guest management component
│       └── rsvp-button.js        # RSVP functionality
├── assets/
│   ├── icons/              # Application icons and favicons
│   └── images/             # Game night related images
├── docs/                   # Documentation files
├── tests/                  # Test files (if applicable)
└── README.md              # This file
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Text editor or IDE for development
- Git for version control

### Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/KatlehoJordan/game-night-website.git
   cd game-night-website
   ```

2. **Local Development**:
   ```bash
   # Serve the files using a local server
   # Option 1: Using Python
   python -m http.server 8000
   
   # Option 2: Using Node.js (if you have it installed)
   npx serve .
   
   # Option 3: Using VS Code Live Server extension
   # Just right-click on index.html and select "Open with Live Server"
   ```

3. **Access the application**:
   Open your browser and navigate to `http://localhost:8000`

### GitHub Pages Deployment

This project is configured to deploy automatically to GitHub Pages:

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Set Source to "Deploy from a branch"
   - Select "main" branch and "/ (root)" folder
   - Save settings

2. **Access your deployed site**:
   Your site will be available at: `https://[username].github.io/game-night-website`

## 🎮 Usage Guide

### For Hosts (Setting up a Game Night)

1. **Create a Game Night**:
   - Click on any available date in the calendar
   - Fill in the game night details:
     - Event title/description
     - Maximum number of guests
     - Start time
     - Special instructions or game preferences

2. **Manage Your Event**:
   - View current RSVPs and guest list
   - Edit event details if needed
   - Cancel or reschedule if necessary

### For Guests (RSVPing to Events)

1. **View Available Game Nights**:
   - Browse the calendar to see upcoming events
   - Click on any event to see details

2. **RSVP to an Event**:
   - Click the "Reserve Spot" button
   - Enter your name and any dietary restrictions/preferences
   - Confirm your reservation

3. **Manage Your Reservations**:
   - View your upcoming game nights
   - Cancel reservations if needed

## 🔧 Development

### Code Organization

The project follows a modular architecture:

- **Separation of Concerns**: HTML structure, CSS styling, and JavaScript behavior are kept separate
- **Component-Based**: Reusable UI components for consistent behavior
- **Data Layer**: Centralized data management using localStorage
- **Event-Driven**: Uses custom events for component communication

### Key Design Decisions

1. **No Backend Required**: Uses localStorage for data persistence to keep hosting simple
2. **Progressive Enhancement**: Core functionality works without JavaScript
3. **Mobile-First**: Responsive design prioritizing mobile experience
4. **Accessibility**: WCAG 2.1 compliant for screen readers and keyboard navigation

### Browser Compatibility

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

### Performance Considerations

- Minimal external dependencies
- Lazy loading for calendar events
- Optimized images and assets
- Service worker for offline functionality

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Test thoroughly
5. Commit using conventional commits: `git commit -m "feat: add amazing feature"`
6. Push to your fork: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📋 Roadmap

### Phase 1: Core Features (Current)
- [x] Project setup and documentation
- [ ] Basic calendar implementation
- [ ] Game night creation form
- [ ] RSVP functionality
- [ ] Guest list management

### Phase 2: Enhanced Features
- [ ] Multiple game night types/categories
- [ ] Recurring events
- [ ] Email notifications (via external service)
- [ ] Export to calendar apps

### Phase 3: Advanced Features
- [ ] User authentication (optional)
- [ ] Game suggestions and voting
- [ ] Photo sharing from events
- [ ] Integration with gaming platforms

## 🐛 Issues & Feedback

If you encounter any issues or have suggestions for improvements:

1. Check the [Issues](https://github.com/KatlehoJordan/game-night-website/issues) page for existing reports
2. Create a new issue with detailed information
3. Use appropriate labels (bug, enhancement, documentation, etc.)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [FullCalendar.js](https://fullcalendar.io/) for the calendar component
- [GitHub Pages](https://pages.github.com/) for free hosting
- The gaming community for inspiration

---

**Happy Gaming! 🎲🎮**

*Made with ❤️ for game night enthusiasts*