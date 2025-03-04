import questions from './questions.js'
const correctSound = new Audio('./assets/sounds/correct.wav')
const wrongSound = new Audio('./assets/sounds/wrong.mp3')

let currentQuestionIndex = 0
let score = 0
let timeoutId = null

// DOM elements
const $questionElement = document.querySelector('.question')
const $answersElement = document.querySelector('.answers')
const $scoreElement = document.querySelector('.score')

document.querySelector('.start-btn').addEventListener('click', startQuiz)

function startQuiz() {
  document.querySelector('.start-btn').style.display = 'none'
  document.querySelector('.quiz-container').style.display = 'block'

  loadQuestion()
}

function loadQuestion() {
  clearTimeout(timeoutId)
  const currentQuestion = questions[currentQuestionIndex]

  $questionElement.textContent = currentQuestion.question
  $answersElement.innerHTML = ''

  currentQuestion.options.forEach((option) => {
    const $button = document.createElement('button')
    $button.textContent = option
    $button.classList.add('answer-btn')

    $button.addEventListener('click', () => checkAnswer(option))
    $answersElement.appendChild($button)
  })
}

function checkAnswer(selectAnswer) {
  clearTimeout(timeoutId)
  const correctAnswer = questions[currentQuestionIndex].answer
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

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++
    timeoutId = setTimeout(loadQuestion, 600)
  } else {
    timeoutId = setTimeout(showFinalScore, 600)
  }
}

function showFinalScore() {
  clearTimeout(timeoutId)
  document.querySelector('.quiz-container').style.display = 'none'
  $scoreElement.style.display = 'none'

  const $finalScoreElement = document.querySelector('.finalScore')
  $finalScoreElement.textContent = `Your final score is ${score}`
}
