const questions = [
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

  // {
  //   id: 'q6',
  //   question: 'Що означає абревіатура API?',
  //   options: [
  //     {
  //       id: 'opt1',
  //       text: 'Advanced Programming Integration',
  //       isCorrect: false,
  //     },
  //     {
  //       id: 'opt2',
  //       text: 'Application Programming Interface',
  //       isCorrect: true,
  //     },
  //     { id: 'opt3', text: 'Automated Process Interaction', isCorrect: false },
  //     { id: 'opt4', text: 'Applied Protocol Instruction', isCorrect: false },
  //   ],
  // },
  // {
  //   id: 'q7',
  //   question: 'Який HTTP статус-код означає, що ресурс не знайдено?',
  //   options: [
  //     { id: 'opt1', text: '200 OK', isCorrect: false },
  //     { id: 'opt2', text: '500 Internal Server Error', isCorrect: false },
  //     { id: 'opt3', text: '403 Forbidden', isCorrect: false },
  //     { id: 'opt4', text: '404 Not Found', isCorrect: true },
  //   ],
  // },
  // {
  //   id: 'q8',
  //   question: 'Яка мова програмування є основною для розробки під iOS?',
  //   options: [
  //     { id: 'opt1', text: 'Kotlin', isCorrect: false },
  //     { id: 'opt2', text: 'Swift', isCorrect: true },
  //     { id: 'opt3', text: 'Java', isCorrect: false },
  //     { id: 'opt4', text: 'C#', isCorrect: false },
  //   ],
  // },
  // {
  //   id: 'q9',
  //   question: "Що таке 'DOM' у веб-розробці?",
  //   options: [
  //     { id: 'opt1', text: 'Document Object Model', isCorrect: true },
  //     { id: 'opt2', text: 'Data Object Management', isCorrect: false },
  //     { id: 'opt3', text: 'Digital Ordinary Matrix', isCorrect: false },
  //     { id: 'opt4', text: 'Direct Output Method', isCorrect: false },
  //   ],
  // },
  // {
  //   id: 'q10',
  //   question: 'Який сервіс використовується для контролю версій коду?',
  //   options: [
  //     { id: 'opt1', text: 'Docker', isCorrect: false },
  //     { id: 'opt2', text: 'PostgreSQL', isCorrect: false },
  //     { id: 'opt3', text: 'GitHub', isCorrect: true },
  //     { id: 'opt4', text: 'Nginx', isCorrect: false },
  //   ],
  // },
];

export const getQuestionByIndex = (index) => questions[index] || null;

export const getQuestionsCount = () => questions.length;

export const getCorrectAnswer = (questionId) => {
  const question = questions.find((q) => q.id === questionId);
  return question?.options.find((opt) => opt.isCorrect);
};
