import { createBoard } from "./board-functions";
import { playTurn } from "./game-functions";
import { createShips, shipData } from "./ship-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const board1 = createBoard(5);
export const ships = createShips(shipData);
export const shipLocations = [];
export let debug = false;

ships.forEach((ship) => ship.placePieces(board1));
ships.forEach((ship) => {
  shipLocations.push(...ship.locations);
});

playTurn(board1, ships, debug);
