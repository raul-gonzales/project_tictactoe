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
    // Set a value in the board
    set: (row, col, value) => {
      // Validate inputs (selection can only be within the 3x3 grid)
      if (row < 0 || row > 2 || col < 0 || col > 2) {
        throw new Error("Row and column must be between 0 and 2");
      }
      if (board[row][col]) {
        throw new Error("That spot is already taken");
      }
      // Selection passes validation, set the value in the board
      board[row][col] = value;
    },
    // Check if a player has won
    checkWin: (playerMark) => {
      if (
        // check rows
        (board[0][0] === playerMark &&
          board[0][1] === playerMark &&
          board[0][2] === playerMark) ||
        (board[1][0] === playerMark &&
          board[1][1] === playerMark &&
          board[1][2] === playerMark) ||
        (board[2][0] === playerMark &&
          board[2][1] === playerMark &&
          board[2][2] === playerMark) ||
        // check columns
        (board[0][0] === playerMark &&
          board[1][0] === playerMark &&
          board[2][0] === playerMark) ||
        (board[0][1] === playerMark &&
          board[1][1] === playerMark &&
          board[2][1] === playerMark) ||
        (board[0][2] === playerMark &&
          board[1][2] === playerMark &&
          board[2][2] === playerMark) ||
        // check diagonals
        (board[0][0] === playerMark &&
          board[1][1] === playerMark &&
          board[2][2] === playerMark) ||
        (board[0][2] === playerMark &&
          board[1][1] === playerMark &&
          board[2][0] === playerMark)
      ) {
        return true;
      }
    },
    print: () => {
      if (!board) {
        throw new Error("Game board must be set");
      }
      console.log(
        "    col: 0 | 1 | 2\n" +
          "       _____________\n" +
          board
            .map(
              (row, i) =>
                `row: ${i} | ${row.map((cell) => cell || " ").join(" | ")}`
            )
            .join("\n")
      );
    },
  };
}

function startGame() {
  // Initialize board
  const player1 = player("X");
  const player2 = player("O");
  const board = gameBoard();
  let turn = 1;
  if (!player1 || !player2 || !board) {
    throw new Error("Player 1, Player 2, and Game Board must be set");
  }
  // Start game if tic tac toe
  while (turn < 10 && !(player1.won || player2.won)) {
    displayTurn(turn);
    board.print();
    const currentPlayer = turn % 2 === 0 ? player2 : player1;
    currentPlayer.turn = true;
    let row;
    let col;
    // Get player row input
    do {
      const rowInput = prompt(
        `It's ${currentPlayer.name}'s turn. Pick a row (0, 1, or 2). Type 'q' to quit.`
      );
      if (rowInput.toLowerCase() === "q") {
        return;
      }
      row = +rowInput;
    } while (row < 0 || row > 2 || isNaN(row));
    // Get player column input
    do {
      const colInput = prompt(
        `It's ${currentPlayer.name}'s turn. Pick a column (0, 1, or 2). Type 'q' to quit.`
      );
      if (colInput.toLowerCase() === "q") {
        return;
      }
      col = +colInput;
    } while (col < 0 || col > 2 || isNaN(col));
    // Set player move
    try {
      board.set(row, col, currentPlayer.name);
    } catch (err) {
      alert(err.message);
      continue;
    }
    board.print();
    // Check if player won
    if (board.checkWin(currentPlayer.name)) {
      console.log(`${currentPlayer.name} won!`);
      return;
    }
    turn++;
  }
}

function playGame() {
  try {
    startGame();
  } catch (err) {
    console.error(err);
  }
}

function displayTurn(turn) {
  console.log(`Turn ${turn}`);
}
