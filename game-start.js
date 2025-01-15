import {
  alphabet,
  cellIsOccupied,
  createBoard,
  getCell,
  printBoard,
  setCell,
} from "./board-functions";
import { convertInput } from "./validations";

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

// board.grid["A"][0] = { type: "large", id: 1, hit: true };
// board.grid["A"][1] = { type: "large", id: 1, hit: true };
// board.grid["J"][1] = { type: "small", id: 1, hit: true };

// const userInput = readlineSync.question("Enter coords \n");

const isHorizontal = true;
const shipLength = 5;

const getRandomCoords = () => {
  let randomCoords = `${alphabet[
    Math.floor(Math.random() * board.size)
  ].toUpperCase()}${Math.floor(Math.random() * board.size)}`;
  return randomCoords;
};

const setRandomCell = (board) => {
  setCell(board, randomCoords, { type: "large", id: 1, hit: true });
};

const setFirstPiece = (board, cellType) => {
  let randomCoords = getRandomCoords();

  while (cellIsOccupied(board, randomCoords)) {
    randomCoords = getRandomCoords();
  }

  setCell(board, randomCoords, { type: cellType, id: 1, hit: true });
  return randomCoords;
};

// while (cellIsOccupied(board, randomCoords)) {
//   randomCoords = getRandomCoords();
// }

const setShipPieces = (board, numOfPieces, isHorizontal) => {
  let startingPoint = setFirstPiece(board, "large");
  const locations = [startingPoint];

  console.log(startingPoint);
};

setShipPieces(board, 0, true);
printBoard(board, false);
