import { getQuestionsCount } from '../data/questions.js';

export const renderProgressBar = (currentStep) => {
  const total = getQuestionsCount();
  const percentage = Math.min((currentStep / total) * 100, 100);

  return `
    <div class="progress-container">
      <div class="progress-bar" style="width: ${percentage}%"></div>
    </div>
  `;
};
