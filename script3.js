document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const message = document.getElementById('message');
    const resetButton = document.getElementById('reset-button');
    let currentPlayer = 'X';
    let board = ['', '', '', '', '', '', '', '', ''];
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

    const handleCellClick = (e) => {
        const cell = e.target;
        const index = cell.getAttribute('data-index');

        if (board[index] !== '' || !gameActive) {
            return;
        }

        board[index] = currentPlayer;
        cell.textContent = currentPlayer;

        if (checkWin()) {
            message.textContent = `Player ${currentPlayer} wins!`;
            message.style.color = 'white';
            gameActive = false;
            return;
        }

        if (board.includes('') === false) {
            message.textContent = 'Draw!';
            gameActive = false;
            return;
        }

        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    };

    const checkWin = () => {
        for (let condition of winningConditions) {
            const [a, b, c] = condition;
            if (board[a] !== '' && board[a] === board[b] && board[a] === board[c]) {
                return true;
            }
        }
        return false;
    };

    const resetGame = () => {
        board = ['', '', '', '', '', '', '', '', ''];
        cells.forEach(cell => cell.textContent = '');
        currentPlayer = 'X';
        gameActive = true;
        message.textContent = '';
    };

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);
});
