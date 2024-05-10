let currentPlayer = 'X';
let cells = document.querySelectorAll('.cell');
let statusDisplay = document.getElementById('status');
let resetButton = document.getElementById('resetButton');

function checkWinner() {
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

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (cells[a].textContent !== '' && cells[a].textContent === cells[b].textContent && cells[a].textContent === cells[c].textContent) {
            return cells[a].textContent;
        }
    }

    if ([...cells].every(cell => cell.textContent !== '')) {
        return 'Tie';
    }

    return null;
}

function makeMove(cellIndex) {
    if (cells[cellIndex].textContent === '' && !checkWinner()) {
        cells[cellIndex].textContent = currentPlayer;
        cells[cellIndex].classList.add(currentPlayer === 'X' ? 'playerX' : 'playerO'); 
        const winner = checkWinner();
        if (winner) {
            statusDisplay.textContent = winner === 'Tie' ? "It's a Tie!" : `${winner} wins!🏆`;
            statusDisplay.classList.add('winnerText'); 
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
            statusDisplay.classList.remove('winnerText'); 
            statusDisplay.classList.remove('playerX', 'playerO'); 
            statusDisplay.classList.add(currentPlayer === 'X' ? 'playerX' : 'playerO'); 
        }
    }
}

function resetGame() {
    cells.forEach(cell => {
        cell.textContent = '';
    });
    currentPlayer = 'X';
    statusDisplay.textContent = `Player ${currentPlayer}'s turn`;
}

statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

resetButton.addEventListener('click', resetGame);
