import { beginGame } from "./game-functions";
import type { Player } from "./player-functions";
import type { CurrentPlayer, GameMode, ShipData } from "./types";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 8;
export const modeSelectMenu = ["1-player", "2-player"];
export const playerSelectMenu = ["human", "computer"];
export let debug = false;
export let currentPlayer: CurrentPlayer = 1;
export let gameMode = "1-player";
export const readlineSync = require("readline-sync");
export const shipData: ShipData[] = [
  { name: "Destroyer", id: 1, length: 2 },
  { name: "Submarine", id: 2, length: 3 },
  { name: "Cruiser", id: 3, length: 3 },
  { name: "Battleship", id: 4, length: 4 },
  { name: "Carrier", id: 5, length: 5 },
];

export const textColors = {
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  default: "\x1b[0m",
};

export const players: Player[] = [];

export const setDebug = (mode: boolean) => (debug = mode);
export const setCurrentPlayer = (int: CurrentPlayer) => (currentPlayer = int);
export const setGameMode = (mode: GameMode) => (gameMode = mode);

console.clear();
beginGame();
