import { questions } from '../data/questions.js';
import { store } from '../store.js';

export function renderQuestionScreen(mainContentEl, index, state) {
  const questionData = questions[index];

  const savedAnswer = state.answers[questionData.id];
  const isAnswered = !!savedAnswer;

  mainContentEl.innerHTML = `
  <div class="container">
    <div class="question-screen">
      <fieldset class="question-fieldset" ${isAnswered ? 'disabled' : ''}>
        <legend>${questionData.question}</legend>
        ${questionData.options
          .map(
            (option) => `
          <label class="question-label">
            <input
              type="radio"
              name="question-option"
              value="${option.id}"
              ${savedAnswer?.selectedOptionId === option.id ? 'checked' : ''}
              class="question-input" />
            ${option.text}
          </label>
        `
          )
          .join('')}
      </fieldset>

      ${isAnswered ? '<button id="next-btn" class="next-btn">Далі →</button>' : ''}
    </div>  
  </div>
  `;

  if (isAnswered) {
  mainContentEl.querySelector('#next-btn').onclick = () => {
    store.updateState({ currentStep: state.currentStep + 1 });
  };
}

  const fieldsetEl = mainContentEl.querySelector('.question-fieldset');

  if (savedAnswer) {
    toggleAnswerClasses(questionData, fieldsetEl, savedAnswer.selectedOptionId);
  }

  if (fieldsetEl) {
    fieldsetEl.onchange = (e) => {
      if (e.target.classList.contains('question-input')) {
        const selectedAnswerId = e.target.value;
        handleAnswer(questionData.id, selectedAnswerId, e.target, fieldsetEl);
      }
    };
  }
}

function handleAnswer(questionId, selectedOptionId, targetElement, fieldsetEl) {
  const inputs = fieldsetEl.querySelectorAll('input');
  inputs.forEach((input) => (input.disabled = true));

  const question = questions.find((q) => q.id === questionId);
  const chosenOption = question.options.find(
    (opt) => opt.id === selectedOptionId
  );

  toggleAnswerClasses(question, fieldsetEl, selectedOptionId);

  if (chosenOption.isCorrect) {
    targetElement.parentElement.classList.add('correct');
  } else {
    targetElement.parentElement.classList.add('incorrect');
  }

  setTimeout(() => {
    const latestState = store.getState();
    const updatedAnswers = {
      ...latestState.answers,
      [questionId]: {
        selectedOptionId,
        isCorrect: chosenOption.isCorrect
      }
    };

    store.updateState({
      answers: updatedAnswers,
      currentStep: latestState.currentStep + 1
    });
  }, 2000);
}

const toggleAnswerClasses = (question, fieldsetEl, selectedId) => {
  const labels = fieldsetEl.querySelectorAll('label');
  labels.forEach((label) => {
    const input = label.querySelector('input');
    const option = question.options.find((opt) => opt.id === input.value);

    if (selectedId) {
      if (option.isCorrect) {
        label.classList.add('correct');
      } else if (input.value === selectedId) {
        label.classList.add('incorrect');
      }
    }
  });
};
