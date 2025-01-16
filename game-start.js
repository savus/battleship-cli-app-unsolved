import { createBoard, printBoard } from "./board-functions";
import {
  convertCoordsToNumbers,
  convertNumbersToCoords,
  removeSpacesAndSpecialChars,
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
printBoard(board1, true);

const userInput = readlineSync.question("Please enter coords \n");

const cleanStrCopy = removeSpacesAndSpecialChars(userInput).toUpperCase();

const separatedChars = separateChars(cleanStrCopy);

const convertedCoords = convertCoordsToNumbers(separatedChars);

const revertedCoords = convertNumbersToCoords(convertedCoords);

console.log(revertedCoords);

board1.grid[separatedChars.col][separatedChars.row] = {
  type: "large",
  id: 1,
  hit: true,
};
printBoard(board1, false);
