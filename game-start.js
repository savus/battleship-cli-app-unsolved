import { initializeAllPlayers, playGame } from "./game-functions";
import { Player } from "./player-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 5;
export let debug = false;
export let currentPlayer = 1;
export let gameMode = "2-player";

export const textColors = {
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  default: "\x1b[0m",
};

const player1 = new Player("human", 1);
const player2 = new Player("human", 2);

export const players = [player1, player2];

export const allShipLocations = [];

initializeAllPlayers(players);

playGame(players, currentPlayer, true);
