import { getQuestionByIndex, getCorrectAnswer } from '../data/questions.js';
import { store } from '../store.js';
import { getElement, getElements, addListener, addClass, renderContent } from '../utils/dom.js';

const TIMEOUT_DELAY = 1500;
let answerTimeoutId = null;

const toggleAnswerClasses = (question, fieldsetEl, selectedId) => {
  const labelsEl = getElements('.question-label', fieldsetEl);
  labelsEl.forEach((label) => {
    const inputEl = getElement('input', label);
    const option = question.options.find((opt) => opt.id === inputEl.value);

    if (selectedId) {
      if (option.isCorrect) addClass(label, 'correct');
      else if (inputEl.value === selectedId) addClass(label, 'incorrect');
    }
  });
};

const handleAnswer = (questionData, selectedOptionId, targetElement, fieldsetEl) => {
  if (answerTimeoutId) clearTimeout(answerTimeoutId);

  const inputsEl = getElements('input', fieldsetEl);
  inputsEl.forEach(input => input.disabled = true);

  const correctAnswer = getCorrectAnswer(questionData.id);
  const isCorrect = selectedOptionId === correctAnswer.id;

  const optionContainer = targetElement.closest('.question-label');

  toggleAnswerClasses(questionData, fieldsetEl, selectedOptionId);

  addClass(optionContainer, isCorrect ? 'correct' : 'incorrect');

  answerTimeoutId = setTimeout(() => {
    const { answers, currentStep } = store.getState();
    const chosenOption = questionData.options.find(opt => opt.id === selectedOptionId);

    store.updateState({
      answers: {
        ...answers,
        [questionData.id]: {
          questionText: questionData.question,
          selectedOptionText: chosenOption?.text || '',
          correctOptionText: correctAnswer.text,
          isCorrect,
          selectedOptionId,
        },
      },
      currentStep: currentStep + 1,
    });

    answerTimeoutId = null;
  }, TIMEOUT_DELAY);
}

const renderTemplate = (questionData, savedAnswer) => {
  const isAnswered = !!savedAnswer;

  return `
    <div class="container">
      <div class="question-screen">
        <fieldset class="question-fieldset" ${isAnswered ? 'disabled' : ''}>
          <legend>${questionData.question}</legend>
          ${questionData.options.map(option => `
            <label class="question-label">
              <input
                type="radio"
                name="question-option"
                value="${option.id}"
                ${savedAnswer?.selectedOptionId === option.id ? 'checked' : ''}
                class="question-input" />
              ${option.text}
            </label>
          `).join('')}
        </fieldset>
        ${isAnswered ? '<button class="next-btn">Next →</button>' : ''}
      </div>  
    </div>
  `;
};

const setupEvents = (containerEl, questionData, isAnswered) => {
  const fieldsetEl = getElement('.question-fieldset', containerEl);

  addListener(fieldsetEl, 'change', (e) => {
    if (e.target.classList.contains('question-input')) {
      handleAnswer(questionData, e.target.value, e.target, fieldsetEl);
    }
  });

  if (isAnswered) {
    const nextBtnEl = getElement('.next-btn', containerEl);
    const handleNextBtnClick = () => {
      const { currentStep } = store.getState();
      store.updateState({ currentStep: currentStep + 1 });
    };
    addListener(nextBtnEl, 'click', handleNextBtnClick);
  }
};

export const renderQuestionScreen = (mainContentEl, index) => {
  if (answerTimeoutId) {
    clearTimeout(answerTimeoutId);
    answerTimeoutId = null;
  }

  const { answers } = store.getState();
  const questionData = getQuestionByIndex(index);

  if (!questionData) return;

  const savedAnswer = answers[questionData.id];

  renderContent(mainContentEl, renderTemplate(questionData, savedAnswer));

  if (savedAnswer) {
    const fieldsetEl = getElement('.question-fieldset', mainContentEl);
    toggleAnswerClasses(questionData, fieldsetEl, savedAnswer.selectedOptionId);
  }

  setupEvents(mainContentEl, questionData, !!savedAnswer);
}