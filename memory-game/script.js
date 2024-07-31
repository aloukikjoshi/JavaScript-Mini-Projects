const cardsArray = [
    { name: 'A', id: 1 },
    { name: 'B', id: 2 },
    { name: 'C', id: 3 },
    { name: 'D', id: 4 },
    { name: 'E', id: 5 },
    { name: 'F', id: 6 },
    { name: 'G', id: 7 },
    { name: 'H', id: 8 },
    { name: 'A', id: 9 },
    { name: 'B', id: 10 },
    { name: 'C', id: 11 },
    { name: 'D', id: 12 },
    { name: 'E', id: 13 },
    { name: 'F', id: 14 },
    { name: 'G', id: 15 },
    { name: 'H', id: 16 }
];

const gameBoard = document.getElementById('gameBoard');
const message = document.getElementById('message');
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchesFound = 0;

function shuffle(array) {
    array.sort(() => Math.random() - 0.5);
}

function createBoard() {
    shuffle(cardsArray);
    cardsArray.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.name = item.name;
        card.innerText = item.name;
        card.addEventListener('click', flipCard);
        gameBoard.appendChild(card);
    });
}

function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flipped');

    if (!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    checkForMatch();
}

function checkForMatch() {
    let isMatch = firstCard.dataset.name === secondCard.dataset.name;

    if (isMatch) {
        disableCards();
        matchesFound++;
        if (matchesFound === cardsArray.length / 2) {
            displayMessage("Congratulations! You've matched all pairs!");
        }
    } else {
        displayMessage("Incorrect match. Try again.");
        unflipCards();
    }
}

function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    firstCard.classList.add('matched');
    secondCard.classList.add('matched');

    resetBoard();
}

function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flipped');
        secondCard.classList.remove('flipped');

        resetBoard();
    }, 1000);
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function displayMessage(msg) {
    message.textContent = msg;
    setTimeout(() => {
        message.textContent = '';
    }, 2000);
}

createBoard();
