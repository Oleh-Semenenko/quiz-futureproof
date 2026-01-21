import { store } from '../store.js';
import { isValidEmail } from '../utils/validation.js';
import { getElement, addListener, renderContent, addClass, removeClass } from '../utils/dom.js';

const renderTemplate = (userEmail) => `
  <div class="container">
    <div class="email-screen">
      <form class="email-form" novalidate>
        <label for="email-input">We will send the results to your email:</label>
        <input
          type="email"
          id="email-input"
          class="email-input"
          placeholder="Enter your email"
          value="${userEmail || ''}"
          inputmode="email"
          autocomplete="email"
          aria-describedby="email-error"
          required
        />
        <span class="error-message" role="alert"></span>

        <button type="submit" id="submit-email-btn" class="submit-btn">
          Submit
        </button>
      </form>
    </div>
  </div>
  `;

const setupEvents = (containerEl) => {
  const formEl = getElement('.email-form', containerEl);
  const inputEl = getElement('.email-input', containerEl);
  const errorEl = getElement('.error-message', containerEl);

  const handleInputEvent = () => {
    removeClass(inputEl, 'invalid');
    removeClass(errorEl, 'visible');
    errorEl.textContent = '';
  }
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    const emailValue = inputEl.value.trim();

    if (isValidEmail(emailValue)) {
      store.updateState({
        userEmail: emailValue,
        currentStep: store.getState().currentStep + 1
      });
    } else {
      addClass(inputEl, 'invalid');
      addClass(errorEl, 'visible');
      errorEl.textContent = 'Please enter a valid email address.';
    }
  }

  addListener(inputEl, 'input', handleInputEvent);
  addListener(formEl, 'submit', handleSubmitEvent);
};

export const renderEmailScreen = (mainContentEl) => {
  const { userEmail } = store.getState();

  renderContent(mainContentEl, renderTemplate(userEmail));
  setupEvents(mainContentEl);
}