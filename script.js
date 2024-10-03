function player(name) {
  if (!name) {
    throw new Error("Player name must be set");
  }
  return {
    name,
    turn: false,
    won: false,
  };
}

function gameBoard() {
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  
  return {
    set: (row, col, value) => {
      if (row < 0 || row > 2 || col < 0 || col > 2) {
        return "Row and column must be between 0 and 2";
      }
      if (board[row][col]) {
        return "That spot is already taken";
      }
      board[row][col] = value;
      return null; // No error
    },
    // Check if a player has won
    checkWin: (playerMark) => {
      return (
        // Check rows
        (board[0][0] === playerMark && board[0][1] === playerMark && board[0][2] === playerMark) ||
        (board[1][0] === playerMark && board[1][1] === playerMark && board[1][2] === playerMark) ||
        (board[2][0] === playerMark && board[2][1] === playerMark && board[2][2] === playerMark) ||
        // Check columns
        (board[0][0] === playerMark && board[1][0] === playerMark && board[2][0] === playerMark) ||
        (board[0][1] === playerMark && board[1][1] === playerMark && board[2][1] === playerMark) ||
        (board[0][2] === playerMark && board[1][2] === playerMark && board[2][2] === playerMark) ||
        // Check diagonals
        (board[0][0] === playerMark && board[1][1] === playerMark && board[2][2] === playerMark) ||
        (board[0][2] === playerMark && board[1][1] === playerMark && board[2][0] === playerMark)
      );
    },
    print: () => {
      console.log(
        "    col: 0 | 1 | 2\n" +
        "       _____________\n" +
        board.map(
          (row, i) => `row: ${i} | ${row.map((cell) => cell || " ").join(" | ")}`
        ).join("\n")
      );
    },
  };
}

const player1 = player("X");
const player2 = player("O");
let board = gameBoard(); // Initialize the board
let turn = 1; // Initialize the turn

const boardElement = document.getElementById("board");
const statusElement = document.getElementById("status");
const restartButton = document.getElementById("restartButton");

function createBoard() {
  boardElement.innerHTML = ""; // Clear the board
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");
      cell.dataset.row = row;
      cell.dataset.col = col;
      cell.addEventListener("click", handleCellClick);
      boardElement.appendChild(cell);
    }
  }
}

function handleCellClick(event) {
  const row = event.target.dataset.row;
  const col = event.target.dataset.col;

  if (board.checkWin(player1.name) || board.checkWin(player2.name)) return;

  const currentPlayer = turn % 2 === 0 ? player2 : player1;

  const errorMessage = board.set(row, col, currentPlayer.name);
  if (errorMessage) {
    statusElement.textContent = errorMessage; // Update status with the error message
    return;
  }

  event.target.textContent = currentPlayer.name;

  if (board.checkWin(currentPlayer.name)) {
    statusElement.textContent = `${currentPlayer.name} wins!`;
    currentPlayer.won = true;
    return;
  }
  
  turn++;
  if (turn > 9) {
    statusElement.textContent = "It's a tie!";
  }
}

restartButton.addEventListener("click", restartGame);

function restartGame() {
  turn = 1;
  player1.won = false;
  player2.won = false;
  board = gameBoard();
  boardElement.innerHTML = "";
  statusElement.textContent = "";
  createBoard();
}

createBoard();
