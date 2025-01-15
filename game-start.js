import { createBoard, printBoard } from "./board-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

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

const board1 = createBoard(11);

console.clear();
printBoard(board1, true);
