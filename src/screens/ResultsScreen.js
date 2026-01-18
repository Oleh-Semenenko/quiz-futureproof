import { getQuestionsCount } from '../data/questions.js';
import { store } from '../store.js';

export const renderResultsScreen = (mainContentEl) => {
  const { answers, userEmail } = store.getState();
  const totalQuestionsAmount = getQuestionsCount();
  const score = Object.values(answers)?.filter((a) => a.isCorrect)?.length || 0;
  const scorePercentage = (score * 100) / totalQuestionsAmount;
  const answersArray = Object.values(answers);

  const motivation = createMotivationText(scorePercentage);

  const answersHtml = answersArray
    .map((answer, index) => {
      const isCorrect = answer.isCorrect;

      return `
      <div class="review-item ${isCorrect ? 'correct' : 'incorrect'}">
        <div class="review-header">
          <span class="review-number">Question ${index + 1}</span>
          <span class="status-badge">${isCorrect ? 'Correct' : 'Wrong'}</span>
        </div>
        
        <p class="review-question">${answer.questionText}</p>
        
        <div class="review-details">
          <div class="answer-line ${isCorrect ? 'success' : 'error'}">
            <span class="label">Your answer:</span>
            <span class="value">${answer.selectedOptionText}</span>
          </div>
          
          ${
            !isCorrect
              ? `
            <div class="answer-line correct-hint">
              <span class="label">Correct answer:</span>
              <span class="value">${answer.correctOptionText}</span>
            </div>
          `
              : ''
          }
        </div>
      </div>
    `;
    })
    .join('');

  mainContentEl.innerHTML = `
    <div class="container">
      <div class="results-screen">
        <p class="result-score">Your score: ${score} / ${totalQuestionsAmount}</p>
        <div class="motivation-section ${motivation.className}">
          <p class="motivation-title">${motivation.title}</p>
          <p class="motivation-message">${motivation.text}</p>
        </div>
        <p class="result__user-email">
          Results have been sent to: <span class="email-address"></span>
        </p>
        <button id="reset-btn" class="restart-btn">Restart Quiz</button>
      </div>

      <div class="answers-review">
        <h3 class="review-title">Details</h3>
        <div class="review-list">
          ${answersHtml}
        </div>
      </div>
    </div>
    `;

  mainContentEl.querySelector('.email-address').textContent = userEmail;

  const resetBtn = mainContentEl.querySelector('#reset-btn');
  resetBtn.addEventListener('click', () => {
    store.resetQuiz();
  });
};

const createMotivationText = (percentage) => {
  if (percentage === 100) {
    return {
      title: 'Awesome! You are a Pro! 🏆',
      text: "Absolute perfection. You've mastered every single question!",
      className: 'perfect',
    };
  } else if (percentage >= 50) {
    return {
      title: 'Great Job! 🌟',
      text: 'You have a strong foundation. Just a few more steps to perfection!',
      className: 'good',
    };
  } else {
    return {
      title: 'Keep it up! 📚',
      text: 'Review your mistakes and try again. Practice makes perfect!',
      className: 'practice',
    };
  }
};
