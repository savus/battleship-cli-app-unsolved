import { createBoard } from "./board-functions";
import { boardSize } from "./game-start";
import { createShips, shipData } from "./ship-functions";

export class Player {
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
  }
}
