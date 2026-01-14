export const questions = [
  {
    id: 1,
    question: "Що таке 'Hoisting' у JavaScript?",
    options: [
      {
        id: 'a',
        text: 'Підняття змінних та оголошень функцій вгору їх області видимості',
        isCorrect: true
      },
      { id: 'b', text: 'Метод масиву для сортування', isCorrect: false },
      { id: 'c', text: 'Видалення невикористаного коду', isCorrect: false },
      { id: 'd', text: 'Паттерн проектування', isCorrect: false }
    ]
  },
  {
    id: 2,
    question:
      "Який метод використовується для перетворення об'єкта в JSON-рядок?",
    options: [
      { id: 'a', text: 'JSON.parse()', isCorrect: false },
      { id: 'b', text: 'JSON.stringify()', isCorrect: true },
      { id: 'c', text: 'JSON.toObj()', isCorrect: false },
      { id: 'd', text: 'Object.toString()', isCorrect: false }
    ]
  }
];
