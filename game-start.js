import { printBoard } from "./board-functions";
import {
  checkAllShipLocations,
  findShip,
  isLocationAlreadyHit,
  playerTurn,
  readlineSync,
} from "./game-functions";
import { Player } from "./player-functions";
import { removeSpacesAndSpecialChars } from "./validations";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 8;
export let debug = false;

const player1 = new Player("human");

const players = [player1];

export const allShipLocations = [];

player1.addShipsToBoard();

players.forEach((player) => allShipLocations.push(...player.shipLocations));

playerTurn(player1.board, player1.ships, false);
