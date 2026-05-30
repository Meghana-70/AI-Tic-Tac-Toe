const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");

let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

const winPatterns = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

function checkWinner(currentBoard, player) {
    return winPatterns.some(pattern =>
        pattern.every(index => currentBoard[index] === player)
    );
}

function isBoardFull(currentBoard) {
    return currentBoard.every(cell => cell !== "");
}

function minimax(currentBoard, depth, isMaximizing) {

    if (checkWinner(currentBoard, "O")) {
        return 10 - depth;
    }

    if (checkWinner(currentBoard, "X")) {
        return depth - 10;
    }

    if (isBoardFull(currentBoard)) {
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;

        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === "") {

                currentBoard[i] = "O";

                let score = minimax(
                    currentBoard,
                    depth + 1,
                    false
                );

                currentBoard[i] = "";

                bestScore = Math.max(score, bestScore);
            }
        }

        return bestScore;
    } else {

        let bestScore = Infinity;

        for (let i = 0; i < 9; i++) {
            if (currentBoard[i] === "") {

                currentBoard[i] = "X";

                let score = minimax(
                    currentBoard,
                    depth + 1,
                    true
                );

                currentBoard[i] = "";

                bestScore = Math.min(score, bestScore);
            }
        }

        return bestScore;
    }
}

function computerMove() {

    let bestScore = -Infinity;
    let move = -1;

    for (let i = 0; i < 9; i++) {

        if (board[i] === "") {

            board[i] = "O";

            let score = minimax(
                board,
                0,
                false
            );

            board[i] = "";

            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }

    if (move !== -1) {
        board[move] = "O";
        cells[move].textContent = "O";
    }
}

cells.forEach((cell, index) => {

    cell.addEventListener("click", () => {

        if (board[index] !== "" || gameOver) {
            return;
        }

        board[index] = "X";
        cell.textContent = "X";

        if (checkWinner(board, "X")) {
            statusText.textContent = "You Win!";
            gameOver = true;
            return;
        }

        if (isBoardFull(board)) {
            statusText.textContent = "Draw!";
            gameOver = true;
            return;
        }

        computerMove();

        if (checkWinner(board, "O")) {
            statusText.textContent = "Computer Wins!";
            gameOver = true;
            return;
        }

        if (isBoardFull(board)) {
            statusText.textContent = "Draw!";
            gameOver = true;
        }
    });
});

restartBtn.addEventListener("click", () => {

    board = ["", "", "", "", "", "", "", "", ""];

    cells.forEach(cell => {
        cell.textContent = "";
    });

    gameOver = false;

    statusText.textContent = "Your Turn (X)";
});