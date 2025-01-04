// Word list
const words = ["javascript", "programming", "developer", "frontend", "backend", "scramble", "challenge"];

let originalWord = "";
let scrambledWord = "";

// DOM elements
const scrambledWordDisplay = document.getElementById("scrambled-word");
const userInput = document.getElementById("user-input");
const checkButton = document.getElementById("check-btn");
const newWordButton = document.getElementById("new-word-btn");
const resultMessage = document.getElementById("result-message");

// Function to scramble the word
function scrambleWord(word) {
  const wordArray = word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  return wordArray.join("");
}

// Function to set a new word
function setNewWord() {
  resultMessage.textContent = "";
  userInput.value = "";
  originalWord = words[Math.floor(Math.random() * words.length)];
  scrambledWord = scrambleWord(originalWord);
  scrambledWordDisplay.textContent = scrambledWord;
}

// Function to check the user's guess
function checkAnswer() {
  const userGuess = userInput.value.trim().toLowerCase();
  if (userGuess === originalWord) {
    resultMessage.textContent = "🎉 Correct! Well done!";
    resultMessage.style.color = "green";
  } else {
    resultMessage.textContent = "❌ Incorrect! Try again.";
    resultMessage.style.color = "red";
  }
}

// Event listeners
checkButton.addEventListener("click", checkAnswer);
newWordButton.addEventListener("click", setNewWord);
userInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      checkAnswer();
    }
  });
  userInput.addEventListener("keypress", function (event) {
    if (event.key === " ") {
        setNewWord();
    }
  });

// Initialize the game
setNewWord();
