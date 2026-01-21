export const getElement = (selector, parentEl = document) => parentEl.querySelector(selector);

export const getElements = (selector, parentEl = document) => parentEl.querySelectorAll(selector);

export const addListener = (element, event, callback) => {
  if (!element) return;
  element.addEventListener(event, callback);
};

export const removeListener = (element, event, callback) => {
  if (!element) return;
  element.removeEventListener(event, callback);
};

export const renderContent = (container, html) => {
  if (!container) {
    console.warn('Mount failed: Container not found');
    return;
  }
  container.innerHTML = '';
  container.insertAdjacentHTML('afterbegin', html);
};

// Use this function to set text content of an element safely to avoid XSS attacks
export const setSafeText = (selector, text, parent = document) => {
  const el = getElement(selector, parent);
  if (el) el.textContent = text;
};

export const addClass = (element, className) => {
  if (!element) return;
  element.classList.add(className);
};

export const removeClass = (element, className) => {
  if (!element) return;
  element.classList.remove(className);
};