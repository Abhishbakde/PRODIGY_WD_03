const cells = document.querySelectorAll('.cell');
const board = document.getElementById('board');
const resetButton = document.getElementById('reset');
const message = document.getElementById('message');
let currentPlayer = 'X';
let gameState = Array(9).fill(null);
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const cell = event.target;
    const index = cell.getAttribute('data-index');

    if (gameState[index] !== null || !gameActive) {
        return;
    }

    gameState[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (checkWinner()) {
        message.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (gameState.every(cell => cell !== null)) {
        message.textContent = 'Draw!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWinner() {
    return winningConditions.some(condition => {
        return condition.every(index => gameState[index] === currentPlayer);
    });
}

function resetGame() {
    gameState = Array(9).fill(null);
    cells.forEach(cell => (cell.textContent = ''));
    currentPlayer = 'X';
    gameActive = true;
    message.textContent = '';
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
