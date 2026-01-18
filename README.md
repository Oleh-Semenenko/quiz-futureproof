Quiz App

A modern web application for conducting quizzes, built with vanilla JavaScript with a focus on performance, interface smoothness, and user experience.

🚀 Key Features

Progress Saving: Uses LocalStorage to allow users to resume the test from where they left off.

Smooth Transitions: A custom animation system for screen changes without content "jumps."

Data Versioning: Implements a DATA_VERSION mechanism that automatically updates the application state for users when new questions are added or data structures change.

Email Validation: Built-in input validation before submitting results.

Detailed Results: An analytical overview of answers at the end of the quiz with motivational blocks.

Progress Reset: Ability to restart the test from scratch via store.resetQuiz().

Style Optimization: Uses CSS variables and dynamic screen style loading for fast LCP (Largest Contentful Paint).

🛠 Tech Stack

Frontend: HTML5, CSS3, Vanilla JavaScript (ES6+ Modules).

State Management: Custom Store implementation (Observer pattern).

Linter & Formatter:

ESLint — for static code analysis.

Prettier — for automatic formatting.

Storage: LocalStorage API.

📦 Installation & Setup

Clone the repository:

git clone [https://github.com/Oleh-Semenenko/quiz-futureproof.git](https://github.com/Oleh-Semenenko/quiz-futureproof.git)

Install dependencies (for development):

npm install

Launch:
The project uses ES-modules, so it must be run via a local server:

Use the Live Server extension in VS Code.

Or run via npx serve .

📂 Project Structure

├── src/
│ ├── components/ # UI components (Header, ProgressBar, etc.)
│ ├── screens/ # Screens (Question, Email, Results)
│ ├── data/ # Questions and configuration (questions.js)
│ ├── store.js # Global application state
│ └── main.js # Entry point
├── styles/ # CSS styles (base.css, variables.css, screen-specific)
├── public/ # Static files (images, icons)
├── index.html # Main HTML file
├── .eslintrc.json # Linter configuration
├── .prettierrc # Formatter settings
├── package.json # Dependencies and scripts
└── README.md # Documentation

👤 Author

Created by Oleh Semenenko — GitHub

The project was created with an emphasis on Clean Code and professional file structure.
