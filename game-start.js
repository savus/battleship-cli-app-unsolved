import {
  createBoard,
  getRandomCoords,
  isCellOccupied,
  printBoard,
  setCell,
} from "./board-functions";
import { convertCoordsToNums, revertCoordsToString } from "./validations";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const readlineSync = require("readline-sync");

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
setCell(board1, "D0", { type: "empty", id: 0, hit: false });
setCell(board1, "D1", { type: "empty", id: 0, hit: false });
setCell(board1, "D2", { type: "empty", id: 0, hit: false });
setCell(board1, "D3", { type: "empty", id: 0, hit: false });
setCell(board1, "D4", { type: "empty", id: 0, hit: false });

printBoard(board1, false);

const placeShips = (board, isHorizontal) => {
  let length = 4;
  let startingPoint = getRandomCoords(board);
  let [col, row] = convertCoordsToNums(startingPoint);
  const locations = [];

  while (isCellOccupied(board, startingPoint)) {
    startingPoint = getRandomCoords(board);
    [col, row] = convertCoordsToNums(startingPoint);
  }

  locations.push(revertCoordsToString(col, row));
  isHorizontal ? row++ : col++;

  for (let i = 0; i < length - 1; i++) {
    if (isCellOccupied(board, revertCoordsToString(col, row))) {
      return placeShips(board, isHorizontal);
    }
    locations.push(revertCoordsToString(col, row));

    isHorizontal ? row++ : col++;
  }

  for (let i = 0; i < locations.length; i++) {
    setCell(board, locations[i], { type: "small", id: 0, hit: true });
  }

  console.log("success");
};

console.clear();
placeShips(board1, false);
printBoard(board1, false);
