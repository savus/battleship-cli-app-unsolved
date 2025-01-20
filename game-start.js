import { printBoard } from "./board-functions";
import { initializeAllPlayers, playerTurn } from "./game-functions";
import { Player } from "./player-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 8;
export let debug = false;

const player1 = new Player("human", 1);
const player2 = new Player("human", 2);

export const players = [player1, player2];

export const allShipLocations = [];

initializeAllPlayers();

console.log("Player1");
printBoard(player1.board, true);
console.log("Player2");
printBoard(player2.board, true);
