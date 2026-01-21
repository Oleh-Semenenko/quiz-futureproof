# Quiz App

A modern, lightweight web application for conducting quizzes, built with **vanilla JavaScript** and focused on performance, smooth UI transitions, and an excellent user experience.

🔗 **Live Demo:** https://oleh-semenenko.github.io/quiz-futureproof/  
📦 **Repository:** https://github.com/Oleh-Semenenko/quiz-futureproof

---

## 🚀 Features

- **Progress Saving**  
  Saves quiz progress in `LocalStorage`, allowing users to resume where they left off.

- **Smooth Screen Transitions**  
  Custom animation system prevents layout jumps during screen changes.

- **Data Versioning**  
  `DATA_VERSION` mechanism automatically migrates stored state when questions or data structures change.

- **Email Validation**  
  Custom client-side validation with regex pattern matching. Validates email format, prevents dots at the start/end of local and domain parts, and ensures minimum TLD length.

- **Detailed Results Analysis**  
  End-of-quiz analytics with structured feedback and motivational blocks.

- **Progress Reset**  
  Ability to restart the quiz at any time via `store.resetQuiz()`.

- **Unified Code Architecture**  
  Consistent approach to DOM manipulation and event handling through centralized utility functions.

- **Style & Performance Optimization**  
  Critical styles loaded in HTML `<head>` for faster **LCP (Largest Contentful Paint)**. Screen-specific styles are organized in separate CSS files.

---

## 🛠 Tech Stack

**Frontend**

- HTML5
- CSS3 (CSS Variables)
- Vanilla JavaScript (ES6+ Modules)

**State Management**

- Custom Store implementation (Observer pattern)

**Architecture**

- Unified DOM utilities (`src/utils/dom.js`) for consistent element selection and event handling
- Centralized validation utilities (`src/utils/validation.js`)
- Component-based screen architecture with clear separation of concerns

**Tooling**

- ESLint — static code analysis
- Prettier — code formatting

**Storage**

- LocalStorage API

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/Oleh-Semenenko/quiz-futureproof.git
```

### 2. Install dependencies (for development):

```bash
npm install
```

### 3. Launch:

The project uses ES-modules, so it must be run via a local server:

Use the **Live Server** extension in **VS Code.**

Or run via `npx serve` .

---

### 📂 Project Structure

```
├── src/
│   ├── components/          # UI components (Header, ProgressBar)
│   ├── screens/             # Screens (Question, Email, Results)
│   ├── data/                # Quiz data & API
│   ├── utils/               # Utility functions
│   │   ├── dom.js          # Unified DOM manipulation utilities
│   │   └── validation.js   # Email validation utilities
│   ├── store.js             # Global application state
│   └── main.js              # Application entry point
├── styles/                  # Global & screen-specific styles
│   ├── screens/             # Styles for the screens
│   ├── base.css             # Common styles
│   ├── header.css           # Styles for the Header component
│   ├── reset.css            # Reset default browser's styles
│   └── variables.css        # Common css variables
├── public/                  # Static assets
├── index.html               # Main HTML file (includes all critical styles)
├── .eslintrc.json           # ESLint configuration
├── .prettierrc              # Prettier configuration
├── package.json             # Scripts & dependencies
├── .gitignore               # Gitignore file
└── README.md                # Project documentation
```

## 🏗 Architecture Highlights

### Unified DOM Utilities

All DOM operations use centralized utilities from `src/utils/dom.js`:
- `getElement(selector, parent)` - unified element selection
- `getElements(selector, parent)` - unified collection selection
- `addListener(element, event, callback)` - unified event handling
- `removeListener(element, event, callback)` - unified event unsubscribing
- `renderContent(container, html)` - unified content rendering
- `setSafeText(selector, text, parent)` - safe text content setting (XSS protection)

### Screen Architecture

All screens follow a consistent pattern:
1. `renderTemplate()` - returns HTML string
2. `setupEvents()` - configures event listeners
3. `render*Screen()` - main render function

### Style Organization

- **Critical styles** (reset, variables, base, header) are loaded in HTML `<head>` for optimal performance
- **Screen-specific styles** are organized in separate CSS files for maintainability

### Email Validation

Custom validation in `src/utils/validation.js` ensures:
- Valid email format with @ symbol
- No dots at the start/end of local part
- No dots at the start/end of domain part
- Minimum 2 characters in TLD
- No whitespace characters

### 👤 Author

Created by **Oleh Semenenko** — [GitHub](https://github.com/Oleh-Semenenko)

The project was created with an emphasis on Clean Code, unified architecture patterns, and professional file structure.
