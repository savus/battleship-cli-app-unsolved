import {
  createBoard,
  getCell,
  getRandomCoords,
  isCellOccupied,
  printBoard,
  setCell,
} from "./board-functions";
import { createShips, shipData } from "./ship-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 8;
export let debug = false;

class Player {
  constructor(type) {
    this.type = type;
    this.board = createBoard(boardSize);
    this.ships = createShips(shipData);
    this.shipLocations = [];
  }
}

const player1 = new Player("human");

player1.ships.forEach((ship) => ship.placePieces(player1.board));

printBoard(player1.board, true);
