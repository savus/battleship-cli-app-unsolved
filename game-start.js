import { printBoard, printBoards } from "./board-functions";
import { initializeAllPlayers, playerTurn } from "./game-functions";
import { Player } from "./player-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 8;
export let debug = false;
export let currentPlayer = 1;
export let gameMode = "1-player";

const player1 = new Player("human", 1);
// const player2 = new Player("human", 2);

export const players = [player1];

export const allShipLocations = [];

initializeAllPlayers();

playerTurn(players, true);
