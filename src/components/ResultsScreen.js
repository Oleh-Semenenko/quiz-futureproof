import { questions } from '../data/questions.js';

export const renderResultsScreen = (mainContentEl, state) => {
  const score = Object.values(state.answers)?.filter(a => a.isCorrect)?.length || 0;

  mainContentEl.innerHTML = `
  <div class="container">
    <div class="results-screen">
      <p>Ваш результат: ${score} / ${questions.length}</p>
      <p class="result__user-email"></p>
    </div>
  </div>
  `;

  mainContentEl.querySelector('.result__user-email').textContent = `Результати надіслано на пошту: ${state.userEmail}`;
};
