import { questions } from '../data/questions.js';
import { store } from '../store.js';

export function renderQuestionScreen(index, state) {
  const questionData = questions[index];
  const rootElement = document.getElementById('root');

  const selectedAnswerId = state.answers[questionData.id];

  rootElement.innerHTML = `
  <div class="question-screen">
    <div class="question-header">
      <h2>Питання ${index + 1} з ${questions.length}</h2>
      <button class="question-back-button">Повернутись назад</button>
    </div>
    <fieldset class="question-fieldset">
      <legend>${questionData.question}</legend>
      ${questionData.options
        .map(
          (option) => `
        <label class="question-label">
          <input
            type="radio"
            name="question-option"
            value="${option.id}"
            ${selectedAnswerId === option.id ? 'checked' : ''}
            class="question-input" />
          ${option.text}
        </label>
      `
        )
        .join('')}
    </fieldset>
  </div>  
  `;

  const fieldsetEl = rootElement.querySelector('.question-fieldset');
  const question = questions.find((q) => q.id === questionData.id);
  const currentSelectedOptionId = state.answers[questionData.id];
  console.log('Current selected option ID:', currentSelectedOptionId);
  toggleAnswerClasses(question, fieldsetEl, currentSelectedOptionId);

  if (fieldsetEl) {
    fieldsetEl.onchange = (e) => {
      if (e.target.classList.contains('question-input')) {
        const selectedAnswerId = e.target.value;
        handleAnswer(questionData.id, selectedAnswerId, e.target, fieldsetEl);
      }
    };
  }

  rootElement.querySelector('.question-back-button').onclick = () => {
    const currentState = store.getState();
    store.updateState({
      currentStep: Math.max(0, currentState.currentStep - 1)
    });
  };
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
      [questionId]: selectedOptionId
    };

    store.updateState({
      answers: updatedAnswers,
      currentStep: latestState.currentStep + 1
    });
  }, 2000);
}

const toggleAnswerClasses = (question, fieldsetEl, selectedOptionId) => {
  console.log('Toggling answer classes for option ID:', selectedOptionId);
  const labels = fieldsetEl.querySelectorAll('label');
  labels.forEach((label) => {
    const input = label.querySelector('input');
    const option = question.options.find((opt) => opt.id === input.value);

    if (option.isCorrect && selectedOptionId) {
      label.classList.add('correct'); // Правильна завжди зелена
    } else if (input.value === selectedOptionId) {
      label.classList.add('incorrect'); // Якщо юзер обрав цю і вона не правильна — червона
    }
  });
};
