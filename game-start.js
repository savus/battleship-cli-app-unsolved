import {
  createBoard,
  getCell,
  getRandomCoords,
  isCellOccupied,
  printBoard,
  setCell,
} from "./board-functions";
import { readlineSync } from "./game-functions";
import { createShips, shipData } from "./ship-functions";
import {
  areCharsCorrectType,
  areCoordsValid,
  areCoordsWithinBoard,
  removeSpacesAndSpecialChars,
  separateChars,
} from "./validations";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 8;
export let debug = false;

class Player {
  constructor(type) {
    this.type = type;
    this.board = createBoard(boardSize);
    this.ships = createShips(shipData, this.board);
    this.shipLocations = [];
  }

  addShipsToBoard() {
    this.ships.forEach((ship) => {
      ship.placePieces(this.board);
      this.shipLocations.push(...ship.locations);
    });
    console.log(this.shipLocations);
  }
}

const player1 = new Player("human");

// player1.ships.forEach((ship) => ship.placePieces(player1.board));
// player1.ships.forEach((ship) => player1.shipLocations.push(...ship.locations));

// const userInput = readlineSync.question("please enter coords\n");

// const cleanStrCopy = removeSpacesAndSpecialChars(userInput);

console.clear();
player1.addShipsToBoard();
printBoard(player1.board, true);
