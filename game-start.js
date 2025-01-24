import { beginGame } from "./game-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 3;
export const modeSelectMenu = ["1-player", "2-player"];
export const playerSelectMenu = ["human", "computer"];
export let debug = false;
export let currentPlayer = 1;
export let gameMode = "";
export const readlineSync = require("readline-sync");
export const shipData = [
  { name: "Destroyer", id: 1, length: 2 },
  { name: "Submarine", id: 2, length: 3 },
  // { name: "Cruiser", id: 3, length: 3 },
  // { name: "Battleship", id: 4, length: 4 },
  // { name: "Carrier", id: 5, length: 5 },
];

export const textColors = {
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  default: "\x1b[0m",
};

export const players = [];

console.clear();
beginGame();
