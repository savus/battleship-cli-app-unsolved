import { createBoard, printBoard } from "./board-functions";
import {
  convertCoordsToNumbers,
  convertStrToCoords,
  removeSpacesAndSpecialChars,
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

const convertedStr = convertStrToCoords(cleanStrCopy);

const convertedCoords = convertCoordsToNumbers(convertedStr);

board1.grid[convertedStr.col][convertedStr.row] = {
  type: "large",
  id: 1,
  hit: true,
};
console.log(convertedCoords[1]);
printBoard(board1, false);
