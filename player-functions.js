import { createBoard } from "./board-functions";
import { shipData } from "./game-start";
import { createShips } from "./ship-functions";

export class Player {
  constructor(type, playerNum) {
    this.type = type;
    this.playerNum = playerNum;
    this.board = createBoard(boardSize);
    this.ships = createShips(shipData, playerNum === 1 ? "first" : "second");
    this.shipLocations = [];
  }

  addShipsToBoard() {
    this.ships.forEach((ship) => {
      ship.placePieces(this.board);
      this.shipLocations.push(...ship.locations);
    });
  }
}
