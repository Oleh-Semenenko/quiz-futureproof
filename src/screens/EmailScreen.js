import { store } from '../store.js';

export const renderEmailScreen = (mainContentEl) => {
  const state = store.getState();

  mainContentEl.innerHTML = `
  <div class="container">
    <div class="email-screen">
      <form class="email-form" id="email-form" novalidate>
        <label for="email-input">We will send the results to your email:</label>
        <input
          type="email"
          id="email-input"
          class="email-input"
          placeholder="Enter your email"
          value="${state.userEmail || ''}"
          inputmode="email"
          autocomplete="email"
          aria-describedby="email-error"
          required
        />
        <span class="error-message" role="alert" id="email-error"></span>

        <button type="submit" id="submit-email-btn" class="submit-btn">
          Submit
        </button>
      </form>
    </div>
  </div>
  `;

  const formEl = mainContentEl.querySelector('#email-form');
  const emailInputEl = mainContentEl.querySelector('#email-input');
  const errorMessageEl = mainContentEl.querySelector('#email-error');

  emailInputEl.oninput = () => {
    if (emailInputEl.validity.valid) {
      errorMessageEl.textContent = '';
      errorMessageEl.classList.remove('visible');
      emailInputEl.classList.remove('invalid');
    }
  };

  formEl.onsubmit = (e) => {
    e.preventDefault();
    if (emailInputEl.checkValidity()) {
      store.updateState({
        userEmail: emailInputEl.value.trim(),
        currentStep: state.currentStep + 1,
      });
    } else {
      errorMessageEl.textContent = 'Please enter a valid email address.';
      errorMessageEl.classList.add('visible');
      emailInputEl.classList.add('invalid');
    }
  };
};
