import { createBoard, printBoard } from "./board-functions";
const board = createBoard(3);
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
