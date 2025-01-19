import { createBoard, printBoard, setCell } from "./board-functions";
import { createShips, shipData } from "./ship-functions";
import { convertCoordsToNums, revertCoordsToString } from "./validations";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const readlineSync = require("readline-sync");

const board1 = createBoard(11);
const ships = createShips(shipData);

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

ships[0].placePieces(board1);
printBoard(board1, true);
