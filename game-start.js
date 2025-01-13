import { createBoard, printBoard } from "./board-functions";
import {
  areCoordsCorrectType,
  areCoordsValid,
  areCoordsWithinBoard,
  removeSpecialCharsAndSpaces,
  separateChars,
} from "./validations";

const readlineSync = require("readline-sync");

const ships = [
  { type: "large", id: 1, hits: 3, size: 3, isHorizontal: false },
  { type: "small", id: 2, hits: 2, size: 2, isHorizontal: true },
];

export const board = createBoard(12);
const testBoard1 = {
  A: [
    { type: "large", id: 1, hit: false }, // Represents position A0
    { type: "small", id: 2, hit: true }, // Represents position A1
    { type: "small", id: 2, hit: false }, // Represents position A2
  ],
  B: [
    { type: "large", id: 1, hit: true }, // Represents position B0
    { type: "empty", hit: false }, // Represents position B1
    { type: "empty", hit: false }, // Represents position B2
  ],
  C: [
    { type: "large", id: 1, hit: true }, // Represents position C0
    { type: "empty", hit: true }, // Represents position C1
    { type: "empty", hit: false }, // Represents position C2
  ],
};

printBoard(board, false);

board.grid["A"][0] = { type: "large", id: 1, hit: true };
board.grid["A"][1] = { type: "large", id: 1, hit: true };

printBoard(board, false);

// board.grid[userInput[0]][userInput[1]] = { type: "small", id: 1, hit: true };

const userInput = readlineSync.question("Enter coords");

const cleanStrCopy = removeSpecialCharsAndSpaces(userInput);

console.log(cleanStrCopy);

const separatedChars = separateChars(cleanStrCopy);

console.log(separatedChars);

console.log(areCoordsValid(separatedChars, board));
