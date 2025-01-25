import { createBoard } from "./board-functions";
import { boardSize, shipData } from "./game-start";
import { createShips, Ship } from "./ship-functions";
import type { Board, CurrentPlayer, PlayerType } from "./types";

export class Player {
  type: PlayerType;
  playerNum: CurrentPlayer;
  board: Board;
  ships: Ship[];
  shipLocations: string[];

  constructor(type: PlayerType, playerNum: CurrentPlayer) {
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
