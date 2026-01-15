import { questions } from './data/questions.js';
import { store } from './store.js';
import { renderQuestionScreen } from './components/QuestionScreen.js';
import { renderEmailScreen } from './components/EmailScreen.js';
import { renderResultsScreen } from './components/ResultsScreen.js';
import { attachHeaderEvents, renderHeader } from './components/Header.js';

function renderApp() {
  const state = store.getState();
  const currentScreen = state.currentStep;
  const rootEl = document.getElementById('root');

  let headerProps = { title: 'Квіз', showGoBackBtn: currentScreen > 0 };

  if (currentScreen < questions.length) {
    headerProps.title = `Питання ${currentScreen + 1} з ${questions.length}`;
  } else if (currentScreen === questions.length) {
    headerProps.title = 'Введіть вашу пошту';
  } else {
    headerProps.title = 'Результати тесту';
    headerProps.showGoBackBtn = false;
  }

  rootEl.innerHTML = `
    ${renderHeader(headerProps)}
    <main id="main-content"></main>
  `;

  attachHeaderEvents();

  const mainContentEl = document.getElementById('main-content');
  mainContentEl.innerHTML = '';


  if (currentScreen < questions.length) {
    renderQuestionScreen(mainContentEl, currentScreen, state);
  } else if (currentScreen === questions.length) {
    renderEmailScreen(mainContentEl, state);
  } else {
    renderResultsScreen(mainContentEl, state);
  }
}

store.subscribe(renderApp);

renderApp();
