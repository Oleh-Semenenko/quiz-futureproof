import { store } from '../store.js';
import { renderProgressBar } from './ProgressBar.js';
import { getQuestionsCount } from '../data/questions.js';
import { getElement, addListener } from '../utils/dom.js';

export const renderHeader = (props) => {
  const { title, currentStep, showGoBackBtn = false } = props;

  const totalQuestionsAmount = getQuestionsCount();
  const isProgressBarNeeded = currentStep <= totalQuestionsAmount;
  return `
    <header class="app-header">
      <h1 class="header-title">${title}</h1>
      ${showGoBackBtn
      ? '<button id="back-btn" class="back-btn">← Go Back</button>'
      : ''
    }

      ${isProgressBarNeeded ? renderProgressBar(currentStep) : ''}
    </header>
  `;
};

export const attachHeaderEvents = (headerWrapperEl) => {
  const backBtnEl = getElement('.back-btn', headerWrapperEl);

  const handleBackBtnClick = () => {
    const { currentStep } = store.getState();
    store.updateState({
      currentStep: Math.max(0, currentStep - 1),
    });
  };

  addListener(backBtnEl, 'click', handleBackBtnClick);
};
