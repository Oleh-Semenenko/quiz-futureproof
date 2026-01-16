import { store } from '../store.js';

export const renderEmailScreen = (mainContentEl, state) => {

  mainContentEl.innerHTML = `
  <div class="container">
    <div class="email-screen">
      <form class="email-form" id="email-form" novalidate>
        <label for="email-input">Ми надішлемо результати вам на пошту:</label>
        <input
          type="email"
          id="email-input"
          class="email-input"
          placeholder="Введіть ваш email"
          value="${state.email || ''}"
          inputmode="email"
          autocomplete="email"
          aria-describedby="email-error"
          required
        />
        <span class="error-message" role="alert" id="email-error"></span>

        <button type="submit" id="submit-email-btn" class="submit-btn">
          Надіслати
        </button>
      </form>
    </div>
  </div>
  `;


  const formEl = mainContentEl.querySelector('#email-form');
  const emailInputEl = mainContentEl.querySelector('#email-input');
  const errorMessageEl = mainContentEl.querySelector('#email-error');

  emailInputEl.oninput = () => {
    if(emailInputEl.validity.valid) {
      errorMessageEl.textContent = '';
      errorMessageEl.classList.remove('visible');
      emailInputEl.classList.remove('invalid');
    }
  };

  formEl.onsubmit = (e) => {
    e.preventDefault();
    if(emailInputEl.checkValidity()) {
      store.updateState({
        userEmail: emailInputEl.value.trim(),
        currentStep: state.currentStep + 1
      });
    } else {
      errorMessageEl.textContent = 'Будь ласка, введіть коректну електронну адресу.';
      errorMessageEl.classList.add('visible');
      emailInputEl.classList.add('invalid');
    }
  };
}
