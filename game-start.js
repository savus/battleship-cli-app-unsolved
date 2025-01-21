import { initializeAllPlayers, playGame } from "./game-functions";
import { Player } from "./player-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 5;
export let debug = false;
export let currentPlayer = 1;
export let gameMode = "2-player";
const modeSelectList = ["1-player", "2-player"];

const player1 = new Player("human", 1);
const player2 = new Player("human", 2);

export const players = [player1, player2];

export const allShipLocations = [];

initializeAllPlayers(players);

playGame(players, currentPlayer, true);
