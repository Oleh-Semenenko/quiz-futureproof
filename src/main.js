import { questions } from './data/questions.js';
import { store } from './store.js';
import { renderQuestionScreen } from './components/QuestionScreen.js';
import { renderEmailScreen } from './components/EmailScreen.js';
import { renderResultsScreen } from './components/ResultsScreen.js';

function renderApp() {
  const state = store.getState();
  const currentScreen = state.currentStep;

  if (currentScreen < questions.length) {
    renderQuestionScreen(currentScreen, state);
  } else if (currentScreen === questions.length) {
    renderEmailScreen(state);
  } else {
    renderResultsScreen(state);
  }
}

store.subscribe(renderApp);

renderApp();
