import { store } from '../store.js';
import { renderProgressBar } from './ProgressBar.js';
import { getQuestionsCount } from '../data/questions.js';

export const renderHeader = (props) => {
  const { title, currentStep, showGoBackBtn = false } = props;

  const totalQuestionsAmount = getQuestionsCount();
  const isProgressBarNeeded = currentStep <= totalQuestionsAmount;
  return `
    <header class="app-header">
      <h1 class="header-title">${title}</h1>
      ${
        showGoBackBtn
          ? '<button id="back-btn" class="back-btn">← Go Back</button>'
          : ''
      }

      ${isProgressBarNeeded ? renderProgressBar(currentStep) : ''}
    </header>
  `;
};

export const attachHeaderEvents = () => {
  const state = store.getState();
  const backBtnEl = document.getElementById('back-btn');

  if (backBtnEl) {
    backBtnEl.onclick = () => {
      store.updateState({
        currentStep: Math.max(0, state.currentStep - 1),
      });
    };
  }
};
