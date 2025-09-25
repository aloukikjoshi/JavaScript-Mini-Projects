const TOTAL_QUESTIONS = 10;
const TOTAL_TIME = 50;

let quote = "";
let quizQuote = "";
let missingWord = "";
let options = [];
let selected = null;
let score = 0;
let timer = TOTAL_TIME;
let questionCount = 0;
let gameOver = false;
let countdownInterval = null; // <-- added for timer management

// DOM Elements
const timerEl = document.getElementById("timer");
const scoreEl = document.getElementById("score");
const questionCountEl = document.getElementById("question-count");
const quizQuoteEl = document.getElementById("quiz-quote");
const optionsEl = document.getElementById("options");
const statusEl = document.getElementById("status");
const nextBtn = document.getElementById("next-btn");
const gameOverSection = document.getElementById("game-over");
const gameSection = document.getElementById("game-section");
const finalScoreEl = document.getElementById("final-score");
const gameOverMessageEl = document.getElementById("game-over-message");
const playAgainBtn = document.getElementById("play-again");

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
const normalize = (s) => s.toLowerCase().replace(/[^a-z]/g, "");

// Fetch a random quote and set up the question
async function fetchQuote() {
  let quoteData = null;
  let words = [];
  while (true) {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    words = data.quote.split(" ").filter((word) => word.length > 3);
    if (words.length >= 4) {
      quoteData = data;
      break;
    }
  }

  quote = quoteData.quote;
  const wordList = quote.split(" ");
  const wordToRemove = words[Math.floor(Math.random() * words.length)];
  missingWord = wordToRemove.replace(/[^a-zA-Z]/g, "");

  quizQuote = wordList
    .map((w) => (normalize(w) === normalize(wordToRemove) ? "____" : w))
    .join(" ");

  options = await generateOptions(wordToRemove);

  renderQuote();
}

// Generate answer options
async function generateOptions(correctWord) {
  const distractors = new Set();
  distractors.add(correctWord.toLowerCase());

  while (distractors.size < 4) {
    const res = await fetch("https://dummyjson.com/quotes/random");
    const data = await res.json();
    const words = data.quote.split(" ").filter((w) => w.length > 3);
    if (words.length) {
      const randomWord = words[Math.floor(Math.random() * words.length)];
      distractors.add(randomWord.toLowerCase());
    }
  }

  return Array.from(distractors)
    .map(capitalize)
    .sort(() => 0.5 - Math.random());
}

// Render question and options to the DOM
function renderQuote() {
  timerEl.textContent = timer;
  scoreEl.textContent = score;
  questionCountEl.textContent = questionCount + 1;
  quizQuoteEl.textContent = `"${quizQuote}"`;
  statusEl.textContent = "";
  statusEl.className = "status";
  nextBtn.disabled = true;
  selected = null;

  optionsEl.innerHTML = "";
  options.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.addEventListener("click", () => handleSelect(opt, btn));
    optionsEl.appendChild(btn);
  });
}

// Handle user selecting an option
function handleSelect(option, btn) {
  selected = option;
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((b) => (b.disabled = true));

  if (normalize(option) === normalize(missingWord)) {
    statusEl.textContent = "Correct!";
    statusEl.className = "status correct";
    score++;
  } else {
    statusEl.textContent = `Wrong! — Correct: ${capitalize(missingWord)}`;
    statusEl.className = "status wrong";
  }

  btn.classList.add("selected");
  nextBtn.disabled = false;
}

// Load next question or end game
function nextQuote() {
  if (questionCount + 1 >= TOTAL_QUESTIONS) {
    endGame("completed");
  } else {
    questionCount++;
    fetchQuote();
  }
}

// End the game
function endGame(reason) {
  gameOver = true;
  clearInterval(countdownInterval); // stop timer
  gameSection.classList.add("hidden");
  gameOverSection.classList.remove("hidden");

  if (reason === "timeout") {
    gameOverMessageEl.textContent = "⏱️ Time's up!";
  } else {
    gameOverMessageEl.textContent = "✅ All questions completed!";
  }

  finalScoreEl.textContent = `Final Score: ${score} / ${TOTAL_QUESTIONS}`;
}

// Reset game and restart timer
function resetGame() {
  score = 0;
  timer = TOTAL_TIME;
  questionCount = 0;
  gameOver = false;

  gameSection.classList.remove("hidden");
  gameOverSection.classList.add("hidden");

  fetchQuote();
  startTimer(); // restart timer countdown
}

// Start the countdown timer
function startTimer() {
  // clear any previous interval to avoid duplicates
  if (countdownInterval) {
    clearInterval(countdownInterval);
  }

  countdownInterval = setInterval(() => {
    if (gameOver) {
      clearInterval(countdownInterval);
    } else if (timer > 0) {
      timer--;
      timerEl.textContent = timer;
    } else {
      clearInterval(countdownInterval);
      endGame("timeout");
    }
  }, 1000);
}

// Event listeners
nextBtn.addEventListener("click", nextQuote);
playAgainBtn.addEventListener("click", resetGame);

// Start the game on page load
fetchQuote();
startTimer();

