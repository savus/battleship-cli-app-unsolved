import { initializeAllPlayers, playGame, readlineSync } from "./game-functions";
import { runSelectionMenus } from "./menu-functions";
import { Player } from "./player-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 3;
const modeSelectMenu = ["1-player", "2-player"];
const playerSelectMenu = ["human", "computer"];
export let debug = false;
export let currentPlayer = 1;
export let gameMode = "";

export const textColors = {
  red: "\x1b[31m",
  cyan: "\x1b[36m",
  green: "\x1b[32m",
  magenta: "\x1b[35m",
  default: "\x1b[0m",
};

export const players = [];

const beginGame = (mode) => {
  console.log("=".repeat(100), "\n");
  console.log(
    `${textColors["cyan"]}Hello! Welcome to my mini-battleship game! ${textColors["default"]}\n`
  );
  console.log("=".repeat(100), "\n");

  runSelectionMenus(
    mode,
    players,
    currentPlayer,
    modeSelectMenu,
    playerSelectMenu
  );
};

console.clear();
// beginGame(gameMode);

runSelectionMenus(
  gameMode,
  players,
  currentPlayer,
  modeSelectMenu,
  playerSelectMenu
);

// initializeAllPlayers(players);

// playGame(players, currentPlayer, true);
