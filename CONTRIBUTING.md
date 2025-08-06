# Contributing to Game Night Website

Thank you for your interest in contributing to the Game Night Website! This document provides guidelines and information for contributors.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Testing Guidelines](#testing-guidelines)
- [Pull Request Process](#pull-request-process)
- [Issue Guidelines](#issue-guidelines)

## 📜 Code of Conduct

This project adheres to a code of conduct that promotes a welcoming and inclusive environment:

- **Be respectful**: Treat all contributors with respect and kindness
- **Be collaborative**: Work together to improve the project
- **Be constructive**: Provide helpful feedback and suggestions
- **Be patient**: Remember that everyone has different skill levels and backgrounds

## 🚀 Getting Started

### Prerequisites

- Git installed on your system
- Modern web browser for testing
- Text editor or IDE (VS Code recommended)
- Basic understanding of HTML, CSS, and JavaScript

### Setup Development Environment

1. **Fork the repository** on GitHub
2. **Clone your fork**:
   ```bash
   git clone https://github.com/[your-username]/game-night-website.git
   cd game-night-website
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/KatlehoJordan/game-night-website.git
   ```
4. **Set up local development server**:
   ```bash
   # Option 1: Python
   python -m http.server 8000
   
   # Option 2: Node.js
   npx serve .
   ```

## 🔄 Development Workflow

### Branching Strategy

We use a simplified Git workflow:

- `main`: Production-ready code
- `feature/[feature-name]`: New features
- `bugfix/[issue-number]`: Bug fixes
- `docs/[update-type]`: Documentation updates

### Workflow Steps

1. **Sync with upstream**:
   ```bash
   git checkout main
   git pull upstream main
   ```

2. **Create feature branch**:
   ```bash
   git checkout -b feature/calendar-integration
   ```

3. **Make your changes**:
   - Write clean, readable code
   - Test your changes thoroughly
   - Update documentation if needed

4. **Commit your changes**:
   ```bash
   git add .
   git commit -m "feat: add calendar integration component"
   ```

5. **Push to your fork**:
   ```bash
   git push origin feature/calendar-integration
   ```

6. **Create Pull Request** on GitHub

## 📝 Coding Standards

### HTML Guidelines

- Use semantic HTML5 elements
- Include proper ARIA labels for accessibility
- Validate markup using W3C validator
- Use meaningful class names following BEM methodology

```html
<!-- Good -->
<section class="game-night-list">
  <article class="game-night-card">
    <h3 class="game-night-card__title">Friday Night Games</h3>
    <p class="game-night-card__description">Board games and fun!</p>
  </article>
</section>

<!-- Avoid -->
<div class="list">
  <div class="card">
    <div class="title">Friday Night Games</div>
    <div class="desc">Board games and fun!</div>
  </div>
</div>
```

### CSS Guidelines

- Use CSS custom properties for theming
- Follow mobile-first responsive design
- Use Flexbox and Grid for layouts
- Keep specificity low and avoid `!important`

```css
/* Good */
.game-night-card {
  --card-padding: 1rem;
  --card-border-radius: 0.5rem;
  
  padding: var(--card-padding);
  border-radius: var(--card-border-radius);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

@media (min-width: 768px) {
  .game-night-card {
    --card-padding: 1.5rem;
  }
}
```

### JavaScript Guidelines

- Use modern ES6+ features
- Follow functional programming principles when possible
- Use meaningful variable and function names
- Include JSDoc comments for functions

```javascript
/**
 * Creates a new game night event
 * @param {Object} eventData - The event information
 * @param {string} eventData.title - Event title
 * @param {Date} eventData.date - Event date
 * @param {number} eventData.maxGuests - Maximum number of guests
 * @returns {Object} The created event object
 */
function createGameNight({ title, date, maxGuests }) {
  const event = {
    id: generateEventId(),
    title,
    date,
    maxGuests,
    guests: [],
    createdAt: new Date()
  };
  
  saveEventToStorage(event);
  return event;
}
```

### File Organization

- Keep files focused on single responsibilities
- Use descriptive file names
- Group related files in appropriate directories
- Maintain consistent file structure

## 🧪 Testing Guidelines

### Manual Testing

Since this is a client-side application, manual testing is essential:

1. **Browser Compatibility**:
   - Test in Chrome, Firefox, Safari, and Edge
   - Test on mobile devices

2. **Functionality Testing**:
   - Create game nights
   - RSVP to events
   - Cancel reservations
   - Navigate the calendar

3. **Accessibility Testing**:
   - Use keyboard navigation only
   - Test with screen readers
   - Verify color contrast ratios

### Automated Testing (Future)

We plan to add automated testing with:
- Jest for unit tests
- Cypress for end-to-end tests
- Lighthouse for performance testing

## 🔀 Pull Request Process

### Before Submitting

1. **Test thoroughly**:
   - Manually test all changed functionality
   - Verify responsive design works
   - Check browser compatibility

2. **Code quality**:
   - Run any linters/formatters
   - Check for console errors
   - Ensure code follows style guidelines

3. **Documentation**:
   - Update README if needed
   - Add inline comments for complex logic
   - Update this CONTRIBUTING file if workflow changes

### PR Checklist

- [ ] Changes are focused and related to a single feature/fix
- [ ] Code follows the established style guidelines
- [ ] All functionality has been manually tested
- [ ] Documentation has been updated if necessary
- [ ] Commit messages follow conventional commit format
- [ ] PR description clearly explains the changes

### PR Template

```markdown
## Description
Brief description of what this PR does

## Type of Change
- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing Done
- [ ] Manual testing in multiple browsers
- [ ] Mobile responsiveness verified
- [ ] Accessibility checked

## Screenshots
(if applicable)

## Additional Notes
Any additional information reviewers should know
```

## 🐛 Issue Guidelines

### Reporting Bugs

When reporting bugs, include:

1. **Environment information**:
   - Browser and version
   - Operating system
   - Device (if mobile)

2. **Steps to reproduce**:
   - Clear, numbered steps
   - Expected vs actual behavior
   - Screenshots if helpful

3. **Additional context**:
   - Console errors
   - Network tab information
   - Any relevant browser extensions

### Feature Requests

For new features, provide:

1. **Problem statement**: What problem does this solve?
2. **Proposed solution**: How should it work?
3. **Alternatives considered**: Other approaches you thought about
4. **Additional context**: Screenshots, mockups, or examples

### Issue Labels

We use these labels to categorize issues:

- `bug`: Something isn't working
- `enhancement`: New feature or request
- `documentation`: Improvements or additions to docs
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention is needed
- `priority:high`: Critical issues
- `priority:low`: Nice to have features

## 💡 Development Tips

### Local Development

1. **Use browser dev tools**:
   - Check console for errors
   - Use responsive design mode
   - Monitor network requests

2. **Test localStorage**:
   - Use Application tab in dev tools
   - Clear storage when testing
   - Verify data persistence

3. **Performance**:
   - Use Lighthouse for performance audits
   - Optimize images before committing
   - Monitor bundle size

### Common Patterns

#### Event Handling
```javascript
// Use event delegation for dynamic content
document.addEventListener('click', (event) => {
  if (event.target.matches('.rsvp-button')) {
    handleRSVP(event.target);
  }
});
```

#### Data Management
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

## 🎯 Project Goals

Keep these goals in mind when contributing:

1. **Simplicity**: Keep the interface clean and intuitive
2. **Accessibility**: Ensure everyone can use the application
3. **Performance**: Maintain fast load times and smooth interactions
4. **Mobile-first**: Prioritize mobile user experience
5. **No dependencies**: Minimize external libraries when possible

## 📞 Getting Help

If you need help:

1. Check existing issues and documentation
2. Ask questions in issue comments
3. Reach out to maintainers
4. Join community discussions

## 🙏 Recognition

Contributors are recognized in several ways:

- Listed in README acknowledgments
- GitHub contributor statistics
- Special recognition for significant contributions
- Invited to be project maintainers for ongoing contributors

---

Thank you for contributing to the Game Night Website! Every contribution, no matter how small, helps make this project better for everyone. 🎮✨