import { alphabet } from "./game-start";

export const createBoard = (size) => {
  const board = {
    size: size,
    grid: {},
  };

  for (let i = 0; i < board.size; i++) {
    board.grid[alphabet[i]] = [];
    for (let j = 0; j < board.size; j++) {
      board.grid[alphabet[i]][j] = { type: "empty", id: 1, hit: false };
    }
  }

  return board;
};

export const printBoard = (board, debug) => {
  const gridDisplay = {};

  const displayCellType = (cell) => {
    const images = {
      large: () => (debug ? "🟠" : cell.hit ? "🟠" : "🔳"),
      small: () => (debug ? "🔵" : cell.hit ? "🔵" : "🔳"),
      empty: () => (debug ? "❗" : cell.hit ? "❗" : "🔳"),
    };
    return images[cell.type]();
  };

  for (const [col, row] of Object.entries(board.grid)) {
    gridDisplay[col] = row.map((cell) => displayCellType(cell));
  }

  return console.table(gridDisplay);
};

export const getCell = (board, strCoords) => {
  const [col, row] = separateChars(strCoords);
  return board.grid[col][row];
};

export const setCell = (board, strCoords, cell) => {
  const [col, row] = separateChars(strCoords);
  return (board.grid[col][row] = cell);
};
