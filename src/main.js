import { getQuestionsCount } from './data/questions.js';
import { store } from './store.js';
import { getElement, renderContent, addClass, removeClass } from './utils/dom.js';
import { renderQuestionScreen } from './screens/QuestionScreen.js';
import { renderEmailScreen } from './screens/EmailScreen.js';
import { renderResultsScreen } from './screens/ResultsScreen.js';
import { attachHeaderEvents, renderHeader } from './components/Header.js';

export async function renderApp() {
  const { currentStep } = store.getState();
  const rootEl = getElement('#root');

  if (!getElement('.main-content', rootEl)) {
    const baseHtml = `
      <div class="header-wrapper"></div>
      <main class="main-content"></main>
    `;
    renderContent(rootEl, baseHtml);
  }

  const mainContentEl = getElement('.main-content');
  const headerWrapper = getElement('.header-wrapper');

  removeClass(mainContentEl, 'visible');

  const totalQuestionsAmount = getQuestionsCount();
  let headerProps = {
    title: 'Quiz',
    currentStep,
    showGoBackBtn: currentStep > 0,
  };

  if (currentStep < totalQuestionsAmount) {
    headerProps.title = `Question ${currentStep + 1} of ${totalQuestionsAmount}`;
  } else if (currentStep === totalQuestionsAmount) {
    headerProps.title = 'Enter your email';
  } else {
    headerProps.title = 'Quiz Results';
    headerProps.showGoBackBtn = false;
  }

  renderContent(headerWrapper, renderHeader(headerProps));
  attachHeaderEvents(headerWrapper);

  const screenConfig = {
    question: {
      render: () => renderQuestionScreen(mainContentEl, currentStep),
    },
    email: {
      render: () => renderEmailScreen(mainContentEl),
    },
    result: {
      render: () => renderResultsScreen(mainContentEl),
    },
  };

  let screenType = 'question';
  if (currentStep === totalQuestionsAmount) screenType = 'email';
  if (currentStep > totalQuestionsAmount) screenType = 'result';

  const config = screenConfig[screenType];

  if (config) {
    setTimeout(() => {
      try {
        config.render();

        requestAnimationFrame(() => {
          addClass(mainContentEl, 'visible');
        });
      } catch (e) {
        console.error('Render error:', e);
      }
    }, 100);
  }
}

store.subscribe(renderApp);

renderApp();
