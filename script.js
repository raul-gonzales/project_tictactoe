function Player(name) {
  if (!name) {
    throw new Error("Player name must be set");
  }

  return {
    name,
    turn: false,
    won: false,
  };
}

function GameBoard() {
  let board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  return {
    set: (row, col, value) => {
      if (row < 0 || row > 2 || col < 0 || col > 2) {
        throw new Error("Row and column must be between 0 and 2");
      }

      if (board[row][col]) {
        throw new Error("That spot is already taken");
      }

      board[row][col] = value;
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
  const player1 = Player("X");
  const player2 = Player("O");
  const board = GameBoard();
  let turn = 1;
  board.print();

  if (!player1 || !player2 || !board) {
    throw new Error("Player 1, Player 2, and Game Board must be set");
  }

  while (turn < 10 && !(player1.won || player2.won)) {
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
