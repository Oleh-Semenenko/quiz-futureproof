import { store } from "../store.js";

export const renderHeader = (props) => {
  const { title, showGoBackBtn = false } = props;

  return `
    <header class="app-header">
      <h1 class="header-title">${title}</h1>
      ${showGoBackBtn ? 
        '<button id="back-btn" class="back-btn">← Назад</button>' 
        : 
        ''}
    </header>
  `;
}

export const attachHeaderEvents = () => {
  const state = store.getState();
  const backBtnEl = document.getElementById('back-btn');

  if (backBtnEl) {
    backBtnEl.onclick = () => {
      store.updateState({
        currentStep: Math.max(0, state.currentStep - 1)
      });
    };
  }
}