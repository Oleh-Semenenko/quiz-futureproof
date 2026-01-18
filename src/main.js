import { getQuestionsCount } from './data/questions.js';
import { store } from './store.js';
import { renderQuestionScreen } from './screens/QuestionScreen.js';
import { renderEmailScreen } from './screens/EmailScreen.js';
import { renderResultsScreen } from './screens/ResultsScreen.js';
import { attachHeaderEvents, renderHeader } from './components/Header.js';

const loadedStyles = new Set();

async function injectCriticalStyle(stylePath) {
  const normalizedPath = stylePath.startsWith('../')
    ? stylePath.replace('../', './')
    : stylePath;
  if (loadedStyles.has(`inline-${normalizedPath}`)) return;

  try {
    const response = await fetch(normalizedPath);
    if (!response.ok) throw new Error(`Style not found: ${normalizedPath}`);
    const cssText = await response.text();

    const style = document.createElement('style');
    style.id = `critical-${normalizedPath.replace(/[^a-z0-9]/gi, '-')}`;
    style.textContent = cssText;
    document.head.appendChild(style);

    loadedStyles.add(`inline-${normalizedPath}`);
  } catch (err) {
    console.error('Critical style failed:', err);
  }
}

function loadExternalStyle(href) {
  const normalizedHref = href.startsWith('../')
    ? href.replace('../', './')
    : href;
  if (loadedStyles.has(`link-${normalizedHref}`)) return Promise.resolve();

  return new Promise((resolve, reject) => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = normalizedHref;
    link.onload = () => {
      loadedStyles.add(`link-${normalizedHref}`);
      resolve();
    };
    link.onerror = () =>
      reject(new Error(`Style load error: ${normalizedHref}`));
    document.head.appendChild(link);
  });
}

export async function renderApp() {
  await Promise.allSettled([
    injectCriticalStyle('styles/reset.css'),
    injectCriticalStyle('styles/variables.css'),
    injectCriticalStyle('styles/base.css'),
    injectCriticalStyle('styles/header.css'),
  ]);

  const state = store.getState();
  const currentScreen = state.currentStep;
  const rootEl = document.getElementById('root');

  if (!document.getElementById('main-content')) {
    rootEl.innerHTML = `
      <div id="header-wrapper"></div>
      <main id="main-content"></main>
    `;
  }

  const mainContentEl = document.getElementById('main-content');
  const headerWrapper = document.getElementById('header-wrapper');

  mainContentEl.classList.remove('visible');

  const totalQuestionsAmount = getQuestionsCount();
  let headerProps = {
    title: 'Quiz',
    currentStep: currentScreen,
    showGoBackBtn: currentScreen > 0,
  };

  if (currentScreen < totalQuestionsAmount) {
    headerProps.title = `Question ${currentScreen + 1} of ${totalQuestionsAmount}`;
  } else if (currentScreen === totalQuestionsAmount) {
    headerProps.title = 'Enter your email';
  } else {
    headerProps.title = 'Quiz Results';
    headerProps.showGoBackBtn = false;
  }

  headerWrapper.innerHTML = renderHeader(headerProps);
  attachHeaderEvents();

  const screenConfig = {
    question: {
      style: '../styles/screens/questions.css',
      render: () => renderQuestionScreen(mainContentEl, currentScreen),
    },
    email: {
      style: '../styles/screens/email.css',
      render: () => renderEmailScreen(mainContentEl),
    },
    result: {
      style: '../styles/screens/results.css',
      render: () => renderResultsScreen(mainContentEl),
    },
  };

  let screenType = 'question';
  if (currentScreen === totalQuestionsAmount) screenType = 'email';
  if (currentScreen > totalQuestionsAmount) screenType = 'result';

  const config = screenConfig[screenType];

  if (config) {
    try {
      await loadExternalStyle(config.style);

      setTimeout(() => {
        mainContentEl.innerHTML = '';
        config.render();

        requestAnimationFrame(() => {
          mainContentEl.classList.add('visible');
        });
      }, 100);
    } catch (e) {
      console.error(e);
      // Render fallback
      config.render();
    }
  }
}

store.subscribe(renderApp);

renderApp();
