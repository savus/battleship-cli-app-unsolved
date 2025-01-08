const alphabet = "abcdefghijklmnopqrstuvwxyz";
import { lengthIsTwo, removeSpacesAndSpecialChars } from "./validations";

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

export const printBoard = ({ grid }, debug) => {
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

  for (const [prop, row] of Object.entries(grid)) {
    display[prop] = row.map((cell) => {
      if (debug) {
        return displayCellType(cell);
      } else {
        if (!cell.hit) {
          return "-";
        } else {
          return displayCellType(cell);
        }
      }
    });
  }
  console.clear();
  return console.table(display);
};

export const getCell = (board, coords) => {
  const cleanStr = removeSpacesAndSpecialChars(coords);
  if (!lengthIsTwo(cleanStr)) return console.log("Invalid input length");

  return cleanStr;
};
