// Select all the player's choices (rock, paper, scissors)
const playerChoices = document.querySelectorAll('.rock-paper-scissors');

// Get the DOM elements for updating the computer's choice and displaying the result
const updateComputerChoice = document.getElementById('computer-choice');
const resultText = document.getElementById('result-text');
const result = document.getElementById('result');

// Array containing the computer's possible choices
const computerChoices = ['✋','✌️','✊'];

/**
 * Determines the result of the game based on the player's and computer's choices
 * @param {string} computerChoice - The computer's selected choice
 * @param {string} selectedChoice - The player's selected choice
 */

function getResults(computerChoice, selectedChoice) {
    // Check if the player and computer chose the same option (a draw)
    if (selectedChoice == computerChoice) {
        showResult("It's a draw 🤝");
    }
    // Define conditions when the player wins
    else if (selectedChoice == '✊' && computerChoice == '✌️' ||
             selectedChoice == '✋' && computerChoice == '✊' ||
             selectedChoice == '✌️' && computerChoice == '✋') {
        showResult('You won 🎉');
    }
    // If none of the above, the player loses
    else {
        showResult("You lost 🥲");
    }
};

// Event listener to hide the result message when clicked
result.addEventListener('click', () => {
    result.style.opacity = 0;
    result.style.pointerEvents = 'none';
});

/**
 * Displays the result message and makes it visible
 * @param {string} message - The result message to display
 */

function showResult(message) {
    resultText.innerHTML = message;
    result.style.opacity = 1;
    result.style.pointerEvents = 'auto';
}

// Add event listeners to each player choice (rock, paper, scissors)
playerChoices.forEach(choice => {
    choice.addEventListener('click', (event) => {
        // Get the player's selected choice (based on clicked element's inner HTML)
        const selectedChoice = event.target.innerHTML;

        // Randomly determine how many times to update the computer's choice before settling
        let totalUpdates = Math.floor(Math.random() * 15) + 10; // totalUpdates are between 10 and 25
        let count = 0;
        let computerChoice = '';
    
        // Update the computer's choice periodically until totalUpdates is reached
        const intervalId = setInterval(() => {
            // Randomly select a computer choice
            computerChoice = computerChoices[Math.floor(Math.random() * computerChoices.length)];
            updateComputerChoice.innerHTML = computerChoice;
            
            count++;
            if (count >= totalUpdates) {
                clearInterval(intervalId); // Stop updating once totalUpdates is reached
                getResults(computerChoice, selectedChoice); // Determine and show the result
            }
        }, 80); // Update interval in milliseconds
    });
});
