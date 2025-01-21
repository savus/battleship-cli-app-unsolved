import {
  initializeAllPlayers,
  isGameTwoPlayers,
  playGame,
  readlineSync,
} from "./game-functions";
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

export const allShipLocations = [];

const runSelectionMenus = (gameMode) => {
  let modeSelect = readlineSync.keyInSelect(
    modeSelectMenu,
    "Which game mode would you like to play?"
  );

  if (modeSelect === -1) {
    console.log("Goodbye!");
    return;
  } else {
    gameMode = modeSelectMenu[modeSelect];
  }

  if (modeSelectMenu[modeSelect] === "1-player") {
    players[0] = new Player("human");
    initializeAllPlayers(players);
    playGame(players, currentPlayer, false);
  }

  if (modeSelectMenu[modeSelect] === "2-player") {
    console.clear();
    let playerSelect = readlineSync.keyInSelect(
      playerSelectMenu,
      "Who would you like to be your opponent?"
    );

    if (playerSelect === -1) {
      return runSelectionMenus(gameMode);
    }

    players.push(new Player("human", 1));
    players.push(new Player(playerSelectMenu[playerSelect], 2));
    initializeAllPlayers(players);
    playGame(players, currentPlayer, gameMode, false);
  }
};

const beginGame = (mode) => {
  console.log("=".repeat(100), "\n");
  console.log(
    `${textColors["cyan"]}Hello! Welcome to my mini-battleship game! ${textColors["default"]}\n`
  );
  console.log("=".repeat(100), "\n");

  runSelectionMenus(mode);
};

console.clear();
beginGame(gameMode);
// initializeAllPlayers(players);

// playGame(players, currentPlayer, true);
