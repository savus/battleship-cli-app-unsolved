import { areCoordsValid, convertInput } from "./validations";

const alphabet = "abcdefghijklmnopqrstuvwxyz";

export const createBoard = (size) => {
  const board = {
    grid: [],
    size,
  };

  for (let i = 0; i < size; i++) {
    const letter = alphabet[i].toUpperCase();
    board.grid[letter] = [];
    for (let j = 0; j < size; j++) {
      board.grid[letter][j] = { type: "empty", id: 0, hit: false };
    }
  }

  return board;
};

export const printBoard = (board, debug) => {
  const display = {};

  const displayCellType = (cell) => {
    switch (cell.type) {
      case "large":
        return "🟠";
      case "small":
        return "🔵";
      default:
        return "❗";
    }
  };

  for (const [prop, row] of Object.entries(board.grid)) {
    display[prop] = row.map((cell) => {
      if (debug) {
        return displayCellType(cell);
      } else {
        if (!cell.hit) {
          return "🔳";
        } else {
          return displayCellType(cell);
        }
      }
    });
  }
  console.clear();
  return console.table(display);
};

export const cellIsOccupied = (board, str) => {
  const convertedStr = convertInput(str);
  if (!areCoordsValid(board, str)) {
    throw new Error("Coordinates are not valid");
  }

  return board.grid[convertedStr.letter][convertedStr.number].type !== "empty";
};

export const getCell = (board, str) => {
  const convertedStr = convertInput(str);
  if (!areCoordsValid(board, str)) {
    throw new Error("Coordinates are not valid");
  }
  return board.grid[convertedStr.letter][convertedStr.number];
};

export const setCell = (board, str, cell) => {
  const convertedStr = convertInput(str);

  if (!areCoordsValid(board, str)) {
    throw new Error("Coordinates are not valid");
  }

  board.grid[convertedStr.letter][convertedStr.number] = cell;
  return;
};
