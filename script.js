let currentPlayer = 'X';
let playerXWins = parseInt(localStorage.getItem('playerXWins')) || 0;
let playerOWins = parseInt(localStorage.getItem('playerOWins')) || 0;
let timeout;

document.getElementById('playerXWins').textContent = playerXWins;
document.getElementById('playerOWins').textContent = playerOWins;


function makeMove(cell) {
    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;
        cell.classList.add('disabled');
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        document.getElementById('turn-indicator').textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWinner() {
    const cells = [
        document.getElementById('b1').innerHTML,
        document.getElementById('b2').innerHTML,
        document.getElementById('b3').innerHTML,
        document.getElementById('b4').innerHTML,
        document.getElementById('b5').innerHTML,
        document.getElementById('b6').innerHTML,
        document.getElementById('b7').innerHTML,
        document.getElementById('b8').innerHTML,
        document.getElementById('b9').innerHTML,
    ];

    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            document.getElementById('print').innerHTML = `Player ${cells[a]} won`;
            highlightWinningCells(pattern);
            disableAllCells();
            updateScores(cells[a]);
            timeout = setTimeout(resetGame, 5000);
            return;
        }

    }

    if (cells.every(cell => cell !== '')) {
        document.getElementById('print').innerHTML = 'Match Tie';
        timeout = setTimeout(resetGame, 5000);
    }
}

function highlightWinningCells(pattern) {
    for (let index of pattern) {
        document.getElementById(`b${index + 1}`).classList.add('red');
    }
}

function disableAllCells() {
    for (let i = 1; i <= 9; i++) {
        document.getElementById(`b${i}`).classList.add('disabled');
    }
}

function resetGame() {
    clearTimeout(timeout);
    for (let i = 1; i <= 9; i++) {
        let cell = document.getElementById(`b${i}`);
        cell.innerHTML = '';
        cell.classList.remove('disabled', 'red');
    }
    currentPlayer = 'X';
    document.getElementById('turn-indicator').textContent = `Player ${currentPlayer}'s Turn`;
    document.getElementById('print').innerHTML = '';
    closeResetModal();
}

function showResetModal() {
    document.getElementById('resetModal').style.display = 'block';
}

function closeResetModal() {
    document.getElementById('resetModal').style.display = 'none';
}

function updateScores(winner) {
    if (winner === 'X') {
        playerXWins++;
        localStorage.setItem('playerXWins', playerXWins);
        document.getElementById('playerXWins').textContent = playerXWins;
    }
    else {
        playerOWins++;
        localStorage.setItem('playerOWins', playerOWins);
        document.getElementById('playerOWins').textContent = playerOWins;
    }
    // highlighting the winning player 
    if (playerXWins > playerOWins) {
        document.getElementById('playerXWins').classList.add('highlight');
        document.getElementById('playerOWins').classList.remove('highlight');
        document.getElementById('XWins').classList.add('highlight');
        document.getElementById('OWins').classList.remove('highlight');
    } else if (playerOWins > playerXWins) {
        document.getElementById('playerOWins').classList.add('highlight');
        document.getElementById('playerXWins').classList.remove('highlight');
        document.getElementById('OWins').classList.add('highlight');
        document.getElementById('XWins').classList.remove('highlight');
    } else {
        document.getElementById('playerXWins').classList.remove('highlight');
        document.getElementById('playerOWins').classList.remove('highlight');
        document.getElementById('XWins').classList.remove('highlight');
        document.getElementById('OWins').classList.remove('highlight');
    }

}

function resetScores() {
    if (confirm('Are you sure you want to reset the scores?')) {
        playerXWins = 0;
        playerOWins = 0;
        localStorage.setItem('playerXWins', playerXWins);
        localStorage.setItem('playerOWins', playerOWins);
        document.getElementById('playerXWins').textContent = playerXWins;
        document.getElementById('playerOWins').textContent = playerOWins;
    }
}
