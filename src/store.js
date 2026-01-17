const DATA_VERSION = '1.1';
const APP_STORAGE_KEY = 'quiz_app_state';

const defaultState = {
  currentStep: 0,
  answers: {},
  userEmail: '',
  version: DATA_VERSION,
};

const getInitialState = () => {
  try {
    const savedData = localStorage.getItem(APP_STORAGE_KEY);
    if (!savedData) return defaultState;

    const parsedData = JSON.parse(savedData);

    if (parsedData.version !== DATA_VERSION) {
      return defaultState;
    }

    return parsedData;
  } catch (e) {
    return defaultState;
  }
};

let state = getInitialState();
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

  resetQuiz: () => {
    store.updateState(defaultState);
  },

  subscribe: (listener) => {
    if (!listeners.includes(listener)) {
      listeners.push(listener);
    }
    return () => {
      const index = listeners.indexOf(listener);
      if (index > -1) listeners.splice(index, 1);
    };
  },
};
