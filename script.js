import questions from './questions'

let currentQuestionIndex = 0
let score = 0

// DOM elements
const $questionElement = document.querySelector('.question')
const $answersElement = document.querySelector('.answers')
const $scoreElement = document.querySelector('.score')
const $nextButton = document.querySelector('.next-btn')

document.querySelector('.start-btn').addEventListener('click', startQuiz)

function startQuiz() {
  document.querySelector('start-btn').style.display = 'none'
  document.querySelector('.quiz-container').style.display = 'block'

  loadQuestion() // Todo
}
