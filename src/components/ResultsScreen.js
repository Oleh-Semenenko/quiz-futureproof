import { getQuestionsCount } from '../data/questions.js';
import { store } from '../store.js';

export const renderResultsScreen = (mainContentEl) => {
  const state = store.getState();
  const totalQuestionsAmount = getQuestionsCount();
  const score =
    Object.values(state.answers)?.filter((a) => a.isCorrect)?.length || 0;

  mainContentEl.innerHTML = `
    <div class="container">
      <div class="results-screen">
        <p class="result-score">Your score: ${score} / ${totalQuestionsAmount}</p>
        <p class="result__user-email">
          Results have been sent to: <span class="email-address"></span>
        </p>
        <button id="reset-btn" class="restart-btn">Restart Quiz</button>
      </div>
    </div>
    `;

  // 2. Вставляємо тільки саму адресу в цей span
  mainContentEl.querySelector('.email-address').textContent = state.userEmail;

  const resetBtn = mainContentEl.querySelector('#reset-btn');
  resetBtn.addEventListener('click', () => {
    store.resetQuiz();
  });
};
