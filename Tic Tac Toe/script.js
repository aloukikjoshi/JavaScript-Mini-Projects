// Get references to the DOM elements
const board = document.getElementById('board');
const cells = document.querySelectorAll('.cell');
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');

// Initialize game state variables
let currentPlayer = 'X'; // Current player (X or O)
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Array representing the game board
let isGameOver = false; // Flag to track if the game is over

// Add click event listeners to each cell
cells.forEach(cell => {
    cell.addEventListener('click', handleCellClick);
});

// Add click event listener to the reset button
resetButton.addEventListener('click', resetGame);

// Function to handle cell click event
function handleCellClick(e) {
    const index = e.target.getAttribute('data-index'); // Get the index of the clicked cell

    // If the cell is already filled or the game is over, do nothing
    if (gameBoard[index] !== '' || isGameOver) {
        return;
    }

    // Update the game state
    gameBoard[index] = currentPlayer; // Set the cell to the current player's symbol
    e.target.textContent = currentPlayer; // Update the cell's text content

    // Check for a winner or a tie
    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`; // Display the winner message
        isGameOver = true; // Set the game over flag
    } else if (gameBoard.every(cell => cell !== '')) {
        message.textContent = `It's a tie!`; // Display the tie message
        isGameOver = true; // Set the game over flag
    } else {
        // Switch to the next player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`; // Display the current player's turn message
    }
}

// Function to check if there is a winner
function checkWinner() {
    // Array of winning combinations (indices of cells that form a winning line)
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    // Check if any winning combination is met
    return winningCombinations.some(combination => {
        const [a, b, c] = combination;
        return gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c];
    });
}

// Function to reset the game
function resetGame() {
    // Reset game state variables
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => {
        cell.textContent = ''; // Clear the cell's text content
    });
    currentPlayer = 'X'; // Set the current player to X
    message.textContent = `Player ${currentPlayer}'s turn`; // Display the current player's turn message
    isGameOver = false; // Reset the game over flag
}
