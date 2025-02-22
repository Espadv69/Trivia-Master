import questions from './questions.js'
const correctSound = new Audio('./assets/sounds/correct.wav')
const wrongSound = new Audio('./assets/sounds/wrong.mp3')

let currentQuestionIndex = 0
let score = 0
let timeoutId = null
let selectedCategory = null

// DOM elements
const $questionElement = document.querySelector('.question')
const $answersElement = document.querySelector('.answers')
const $scoreElement = document.querySelector('.score')
const $quizContainer = document.querySelector('.quiz-container')
const $startButton = document.querySelector('.start-btn')
const $wheel = document.querySelector('.wheel')
const $spinButton = document.querySelector('.spin-btn')
const $wheelContainer = document.querySelector('.wheel-container')

$startButton.addEventListener('click', () => {
  $startButton.style.display = 'none'
  $wheelContainer.style.display = 'block'
})

$spinButton.addEventListener('click', spinWheel)

function spinWheel() {
  const categories = [
    'Geography',
    'History',
    'Science',
    'Entertainment',
    'Sports',
  ]
  const randomIndex = Math.floor(Math.random() * categories.length)
  selectedCategory = categories[randomIndex]

  const degrees = 3600 + randomIndex * (360 / categories.length)
  $wheel.style.transition = 'transform 3s ease-out'
  $wheel.style.transform = `rotate(${degrees}deg)`

  setTimeout(() => {
    $wheelContainer.style.display = 'none'
    $quizContainer.style.display = 'block'
    loadQuestion()
  }, 3500)
}

function loadQuestion() {
  clearTimeout(timeoutId)

  const categoryQuestions = questions.filter(
    (q) => q.category === selectedCategory,
  )
  const randomQuestionIndex = Math.floor(
    Math.random() * categoryQuestions.length,
  )
  const currentQuestion = categoryQuestions[randomQuestionIndex]

  if (!currentQuestion) {
    showFinalScore()
    return
  }

  $questionElement.textContent = currentQuestion.question
  $answersElement.innerHTML = ''

  currentQuestion.options.forEach((option) => {
    const $button = document.createElement('button')
    $button.textContent = option
    $button.classList.add('answer-btn')

    $button.addEventListener('click', () =>
      checkAnswer(option, currentQuestion.answer),
    )
    $answersElement.appendChild($button)
  })
}

function checkAnswer(selectAnswer, correctAnswer) {
  clearTimeout(timeoutId)
  const $buttons = document.querySelectorAll('.answer-btn')

  $buttons.forEach((btn) => {
    if (btn.textContent === correctAnswer) {
      btn.style.backgroundColor = 'green'
      btn.style.color = 'white'
    } else if (btn.textContent === selectAnswer) {
      btn.style.backgroundColor = 'red'
      btn.style.color = 'white'
    }
    btn.disabled = true
  })

  if (selectAnswer === correctAnswer) {
    correctSound.play()
    score++
  } else {
    wrongSound.play()
  }

  $scoreElement.textContent = `Score: ${score}`

  timeoutId = setTimeout(loadQuestion, 600)
}

function showFinalScore() {
  clearTimeout(timeoutId)
  $quizContainer.style.display = 'none'
  $scoreElement.style.display = 'none'

  const $finalScoreElement = document.querySelector('.finalScore')
  $finalScoreElement.textContent = `Your final score is ${score}`
}
