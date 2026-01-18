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
  Built-in client-side validation before submitting results.

- **Detailed Results Analysis**  
  End-of-quiz analytics with structured feedback and motivational blocks.

- **Progress Reset**  
  Ability to restart the quiz at any time via `store.resetQuiz()`.

- **Style & Performance Optimization**  
  Uses CSS variables and dynamic screen-level styles for faster **LCP (Largest Contentful Paint)**.

---

## 🛠 Tech Stack

**Frontend**

- HTML5
- CSS3 (CSS Variables)
- Vanilla JavaScript (ES6+ Modules)

**State Management**

- Custom Store implementation (Observer pattern)

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
│   ├── components/       # UI components (Header, ProgressBar)
│   ├── screens/          # Screens (Question, Email, Results)
│   ├── data/             # Quiz data & API
│   ├── store.js          # Global application state
│   └── main.js           # Application entry point
├── styles/               # Global & screen-specific styles
│   ├── screens/          # Styles for the screens
│   ├── base.css          # Common styles
│   ├── header.css        # Styles for the Header component
│   ├── reset.css         # Reset default browser's styles
│   └── variables.css     # Common css variables
├── public/               # Static assets
├── index.html            # Main HTML file
├── .eslintrc.json        # ESLint configuration
├── .prettierrc           # Prettier configuration
├── package.json          # Scripts & dependencies
├── .gitignore            # Gitignore file
└── README.md             # Project documentation
```

### 👤 Author

Created by **Oleh Semenenko** — [GitHub](https://github.com/Oleh-Semenenko)

The project was created with an emphasis on Clean Code and professional file structure.
