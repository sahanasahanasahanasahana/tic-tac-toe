const board = document.getElementById('board');
const statusDisplay = document.getElementById('status');
const resetButton = document.getElementById('reset');

let gameActive = true;
let currentPlayer = 'X';
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function createBoard() {
    gameState.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.setAttribute('data-index', index);
        cellElement.addEventListener('click', handleCellClick);
        cellElement.innerText = cell;
        board.appendChild(cellElement);
    });
}

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const condition = winningConditions[i];
        const a = gameState[condition[0]];
        const b = gameState[condition[1]];
        const c = gameState[condition[2]];

        if (a === "" || b === "" || c === "") {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} wins!`;
        gameActive = false;
        return;
    }

    if (!gameState.includes("")) {
        statusDisplay.innerText = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
}

resetButton.addEventListener('click', resetGame);

function resetGame() {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
    board.innerHTML = "";
    createBoard();
}

createBoard();
statusDisplay.innerText = `It's ${currentPlayer}'s turn`;
