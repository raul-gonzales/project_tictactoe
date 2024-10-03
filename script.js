function player(name) {
  if (!name) {
    throw new Error("Player name must be set");
  }

  return { name, turn: false, won: false };
}

function gameBoard() {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  return {
    set(row, col, value) {
      if (row < 0 || row > 2 || col < 0 || col > 2) {
        throw new Error("Row and column must be between 0 and 2");
      }

      if (board[row][col]) {
        throw new Error("That spot is already taken");
      }

      board[row][col] = value;
    },
    checkWin(playerMark) {
      for (let i = 0; i < 3; i++) {
        // check rows
        if (
          board[0][i] &&
          board[1][i] &&
          board[2][i] &&
          board[0][i] === playerMark &&
          board[1][i] === playerMark &&
          board[2][i] === playerMark
        ) {
          return true;
        }
        // check columns
        if (
          board[i][0] &&
          board[i][1] &&
          board[i][2] &&
          board[i][0] === playerMark &&
          board[i][1] === playerMark &&
          board[i][2] === playerMark
        ) {
          return true;
        }
      }

      // check diagonals
      if (
        board[0][0] &&
        board[1][1] &&
        board[2][2] &&
        board[0][0] === playerMark &&
        board[1][1] === playerMark &&
        board[2][2] === playerMark
      ) {
        return true;
      }
      return false;
    },
    reset() {
      board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
      ];
    },
    print() {
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
  const player1 = player("X");
  const player2 = player("O");
  const board = gameBoard();

  for (let turn = 1; turn < 10; turn++) {
    displayTurn(turn);
    board.print();

    const currentPlayer = turn % 2 === 0 ? player2 : player1;
    currentPlayer.turn = true;

    let row;
    let col;

    do {
      const rowInput = prompt(
        `It's ${currentPlayer.name}'s turn. Pick a row (0, 1, or 2). Type 'q' to quit.`
      );

      if (rowInput.toLowerCase() === "q") {
        return;
      }

      row = +rowInput;
    } while (row < 0 || row > 2 || isNaN(row));

    do {
      const colInput = prompt(
        `It's ${currentPlayer.name}'s turn. Pick a column (0, 1, or 2). Type 'q' to quit.`
      );

      if (colInput.toLowerCase() === "q") {
        return;
      }

      col = +colInput;
    } while (col < 0 || col > 2 || isNaN(col));

    try {
      board.set(row, col, currentPlayer.name);
    } catch (err) {
      alert(err.message);
      continue;
    }

    board.print();

    if (board.checkWin(currentPlayer.name)) {
      console.log(`${currentPlayer.name} won!`);
      return;
    }
  }

  console.log("It's a tie!");
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
