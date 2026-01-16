const questions = [
  {
    id: 1,
    question: "What is 'Hoisting' in JavaScript?",
    options: [
      {
        id: 'a',
        text: 'Lifting variable and function declarations to the top of their scope',
        isCorrect: true,
      },
      { id: 'b', text: 'An array method for sorting', isCorrect: false },
      { id: 'c', text: 'Removing unused code', isCorrect: false },
      { id: 'd', text: 'A design pattern', isCorrect: false },
    ],
  },
  {
    id: 2,
    question: 'Which method is used to convert an object into a JSON string?',
    options: [
      { id: 'a', text: 'JSON.parse()', isCorrect: false },
      { id: 'b', text: 'JSON.stringify()', isCorrect: true },
      { id: 'c', text: 'JSON.toObj()', isCorrect: false },
      { id: 'd', text: 'Object.toString()', isCorrect: false },
    ],
  },
];

export const getQuestionByIndex = (index) => questions[index] || null;

// Повертає загальну кількість питань
export const getQuestionsCount = () => questions.length;

// Перевіряє, чи є це питання останнім
export const isLastQuestion = (index) => index === questions.length - 1;

// Шукає правильну відповідь для конкретного питання (корисно для логіки підрахунку)
export const getCorrectAnswer = (questionId) => {
  const question = questions.find((q) => q.id === questionId);
  return question?.options.find((opt) => opt.isCorrect);
};
