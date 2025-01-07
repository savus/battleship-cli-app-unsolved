import { createBoard, getCell, printBoard } from "./board-functions";
import {
  isValidCoords,
  isWithinBoard,
  lengthIsTwo,
  removeSpacesAndSpecialChars,
} from "./validations";
const readlineSync = require("readline-sync");

const ships = [
  { type: "large", id: 1, hits: 3, size: 3, isHorizontal: false },
  { type: "small", id: 2, hits: 2, size: 2, isHorizontal: true },
];

export const board = createBoard(6);
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
let testCoords = readlineSync.question("Type in board coords");
testCoords = removeSpacesAndSpecialChars(testCoords);
console.log(isWithinBoard(board, testCoords));
