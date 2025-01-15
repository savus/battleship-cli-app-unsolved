const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const testBoard1 = {
  grid: {
    A: [
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
    ],
    B: [
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
    ],
    C: [
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
    ],
  },
};

const testBoardDisplay = {
  grid: {
    A: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
    B: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
    C: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
    D: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
    E: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
    F: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
  },
};

const createBoard = (size) => {
  const board = {
    size: size,
    grid: {},
  };

  for (let i = 0; i < board.size; i++) {
    board.grid[alphabet[i]] = [];
    for (let j = 0; j < board.size; j++) {
      board.grid[alphabet[i]][j] = { type: "large", id: 1, hit: false };
    }
  }

  return board;
};

const printBoard = (board, debug) => {
  const boardDisplay = {};
};

const board1 = createBoard(3);

console.log(board1.grid["A"].map((cell) => cell.type));
