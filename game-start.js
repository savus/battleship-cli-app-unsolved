import {
  createBoard,
  getRandomCoords,
  isCellOccupied,
  printBoard,
  setCell,
} from "./board-functions";
import {
  convertCoordsToNums,
  revertCoordsToString,
  separateChars,
} from "./validations";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const readlineSync = require("readline-sync");

// const testBoard1 = {
//   grid: {
//     A: [
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//     ],
//     B: [
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//     ],
//     C: [
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//       { type: "large", id: 1, hit: true },
//     ],
//   },
// };

// const testBoardDisplay = {
//   grid: {
//     A: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
//     B: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
//     C: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
//     D: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
//     E: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
//     F: ["🔳", "🔳", "🔳", "🔳", "🔳", "🔳"],
//   },
// };

const board1 = createBoard(11);

console.clear();

setCell(board1, "A0", { type: "empty", id: 0, hit: false });
setCell(board1, "A1", { type: "empty", id: 0, hit: false });
setCell(board1, "A2", { type: "empty", id: 0, hit: false });
setCell(board1, "A3", { type: "empty", id: 0, hit: false });
setCell(board1, "A4", { type: "empty", id: 0, hit: false });
setCell(board1, "B0", { type: "empty", id: 0, hit: false });
setCell(board1, "B1", { type: "empty", id: 0, hit: false });
setCell(board1, "B2", { type: "empty", id: 0, hit: false });
setCell(board1, "B3", { type: "empty", id: 0, hit: false });
setCell(board1, "B4", { type: "empty", id: 0, hit: false });
setCell(board1, "C0", { type: "empty", id: 0, hit: false });
setCell(board1, "C1", { type: "empty", id: 0, hit: false });
setCell(board1, "C2", { type: "empty", id: 0, hit: false });
setCell(board1, "C3", { type: "empty", id: 0, hit: false });
setCell(board1, "C4", { type: "empty", id: 0, hit: false });

printBoard(board1, false);

let length = 4;
let randomPoint = "A0";

setCell(board1, randomPoint, { type: "small", id: 0, hit: true });
let [col, row] = convertCoordsToNums(randomPoint);

while (length > 1) {
  col += 0;
  row += 1;

  setCell(board1, revertCoordsToString(col, row), {
    type: "small",
    id: 0,
    hit: true,
  });
  length--;
}

console.clear();
printBoard(board1, false);
