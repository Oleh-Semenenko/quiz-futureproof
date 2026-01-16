import { getQuestionsCount } from './data/questions.js';
import { store } from './store.js';
import { renderQuestionScreen } from './components/QuestionScreen.js';
import { renderEmailScreen } from './components/EmailScreen.js';
import { renderResultsScreen } from './components/ResultsScreen.js';
import { attachHeaderEvents, renderHeader } from './components/Header.js';

function renderApp() {
  const state = store.getState();
  const currentScreen = state.currentStep;
  const rootEl = document.getElementById('root');

  let headerProps = {
    title: 'Quiz',
    currentStep: currentScreen,
    showGoBackBtn: currentScreen > 0,
  };

  const totalQuestionsAmount = getQuestionsCount();

  if (currentScreen < totalQuestionsAmount) {
    headerProps.title = `Question ${currentScreen + 1} of ${totalQuestionsAmount}`;
  } else if (currentScreen === totalQuestionsAmount) {
    headerProps.title = 'Enter your email';
  } else {
    headerProps.title = 'Quiz Results';
    headerProps.showGoBackBtn = false;
  }

  rootEl.innerHTML = `
    ${renderHeader(headerProps)}
    <main id="main-content"></main>
  `;

  attachHeaderEvents();

  const mainContentEl = document.getElementById('main-content');
  mainContentEl.innerHTML = '';

  let screenType = 'question';
  if (currentScreen === totalQuestionsAmount) screenType = 'email';
  if (currentScreen > totalQuestionsAmount) screenType = 'result';

  const screensRenderFunctionsMap = {
    question: () => renderQuestionScreen(mainContentEl, currentScreen),
    email: () => renderEmailScreen(mainContentEl),
    result: () => renderResultsScreen(mainContentEl),
  };

  if (screensRenderFunctionsMap[screenType]) {
    screensRenderFunctionsMap[screenType]();
  }
}

store.subscribe(renderApp);

renderApp();
