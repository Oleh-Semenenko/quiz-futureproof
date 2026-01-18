const questions = [
  {
    id: 'q1',
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
    id: 'q2',
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

export const getQuestionsCount = () => questions.length;

export const getCorrectAnswer = (questionId) => {
  const question = questions.find((q) => q.id === questionId);
  return question?.options.find((opt) => opt.isCorrect);
};
