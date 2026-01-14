const APP_STORAGE_KEY = 'quiz_app_state_v1';

let state = JSON.parse(localStorage.getItem(APP_STORAGE_KEY)) || {
  currentStep: 0,
  answers: {},
  userEmail: ''
};

const listeners = [];

const notifyListeners = () => {
  listeners.forEach((listener) => listener(state));
};

export const store = {
  getState: () => ({ ...state }),

  updateState: (newStateData) => {
    state = { ...state, ...newStateData };
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(state));
    notifyListeners();
  },

  subscribe: (listener) => {
    if (listeners.includes(listener)) return;
    listeners.push(listener);

    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }
};
