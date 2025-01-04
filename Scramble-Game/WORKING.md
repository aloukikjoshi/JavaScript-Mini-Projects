## WORKING.md

### Explanation of the Code:

#### **HTML**
The HTML file provides the structure of the Word Scramble Game. It includes:
- A container to hold the game title, scrambled word display, input field, buttons, and result message.
- Elements with unique IDs (e.g., `scrambled-word`, `user-input`, `check-btn`) for DOM manipulation in JavaScript.

#### **CSS**
The CSS file styles the game to make it visually appealing:
- A clean, centered layout with a container box.
- Buttons styled with hover effects.
- Dynamic feedback for correct or incorrect guesses using different text colors.

#### **JavaScript**
The JavaScript file implements the game logic and interactivity:

1. **Word List:**
   ```javascript
   const words = ["javascript", "programming", "developer", "frontend", "backend", "scramble", "challenge"];
   ```
   This array holds the words that the game will use for scrambling.

2. **Scramble Function:**
   ```javascript
   function scrambleWord(word) {
     const wordArray = word.split("");
     for (let i = wordArray.length - 1; i > 0; i--) {
       const j = Math.floor(Math.random() * (i + 1));
       [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
     }
     return wordArray.join("");
   }
   ```
   This function takes a word, splits it into an array of characters, and shuffles the characters randomly using the Fisher-Yates algorithm.

3. **Set New Word:**
   ```javascript
   function setNewWord() {
     resultMessage.textContent = "";
     userInput.value = "";
     originalWord = words[Math.floor(Math.random() * words.length)];
     scrambledWord = scrambleWord(originalWord);
     scrambledWordDisplay.textContent = scrambledWord;
   }
   ```
   This function selects a random word from the `words` array, scrambles it, and updates the DOM to display the scrambled word.

4. **Check Answer:**
   ```javascript
   function checkAnswer() {
     const userGuess = userInput.value.trim().toLowerCase();
     if (userGuess === originalWord) {
       resultMessage.textContent = "\ud83c\udf89 Correct! Well done!";
       resultMessage.style.color = "green";
     } else {
       resultMessage.textContent = "\u274c Incorrect! Try again.";
       resultMessage.style.color = "red";
     }
   }
   ```
   This function compares the user’s input with the original word and updates the result message accordingly.

5. **Event Listeners:**
   ```javascript
   checkButton.addEventListener("click", checkAnswer);
   newWordButton.addEventListener("click", setNewWord);

   userInput.addEventListener("keypress", function (event) {
     if (event.key === "Enter") {
       checkAnswer();
     }
   });
   ```
   These event listeners trigger the respective functions when the buttons are clicked or when the **Enter** key is pressed while typing in the input field.

6. **Initialization:**
   ```javascript
   setNewWord();
   ```
   This ensures a scrambled word is displayed when the game starts.

---

### How It Works:
1. When the page loads, the `setNewWord()` function selects a random word from the array, scrambles it, and displays it.
2. The player types their guess into the input field and presses the **Enter** key or clicks the **Check Answer** button.
3. The `checkAnswer()` function checks if the input matches the original word and updates the result message.
4. The player can click the **New Word** button to get another scrambled word and continue playing.

This code is modular and easy to expand, allowing for additional features such as difficulty levels or a timer.

Enjoy the game!