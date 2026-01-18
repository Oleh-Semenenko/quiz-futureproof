import { getQuestionByIndex, getCorrectAnswer } from '../data/questions.js';
import { store } from '../store.js';

const TIMEOUT_DELAY = 1500;
let answerTimeoutId = null;

export function renderQuestionScreen(mainContentEl, index) {
  const state = store.getState();
  const questionData = getQuestionByIndex(index);

  if (!questionData) return;

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

      ${isAnswered ? '<button id="next-btn" class="next-btn">Next →</button>' : ''}
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
        handleAnswer(questionData, selectedAnswerId, e.target, fieldsetEl);
      }
    };
  }
}

function handleAnswer(
  questionData,
  selectedOptionId,
  targetElement,
  fieldsetEl
) {
  if (answerTimeoutId) {
    clearTimeout(answerTimeoutId);
  }

  const inputs = fieldsetEl.querySelectorAll('input');
  inputs.forEach((input) => (input.disabled = true));

  const correctAnswer = getCorrectAnswer(questionData.id);
  const isCorrect = selectedOptionId === correctAnswer.id;
  const chosenOption = questionData.options.find(
    (opt) => opt.id === selectedOptionId
  );

  toggleAnswerClasses(questionData, fieldsetEl, selectedOptionId);

  if (isCorrect) {
    targetElement.parentElement.classList.add('correct');
  } else {
    targetElement.parentElement.classList.add('incorrect');
  }

  answerTimeoutId = setTimeout(() => {
    const latestState = store.getState();
    const updatedAnswers = {
      ...latestState.answers,
      [questionData.id]: {
        questionText: questionData.question,
        selectedOptionText: chosenOption ? chosenOption.text : '',
        correctOptionText: correctAnswer.text,
        isCorrect: isCorrect,
        selectedOptionId,
      },
    };

    store.updateState({
      answers: updatedAnswers,
      currentStep: latestState.currentStep + 1,
    });

    answerTimeoutId = null;
  }, TIMEOUT_DELAY);
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
