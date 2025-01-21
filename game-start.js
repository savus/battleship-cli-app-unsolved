import { initializeAllPlayers, playGame, readlineSync } from "./game-functions";
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

const getUserSelection = (message, list) => {
  console.log(list);
  const userInput = readlineSync.question(message);
  if (userInput === "quit") return false;

  if (/^\d+$/gi.test(userInput) && list[userInput]) return list[userInput];

  console.log("Invalid choice");
  return getUserSelection(message, list);
};

const shouldRunOnePlayerGame = (gameMode, playerList, currentPlayerNum) => {
  if (gameMode === "1-player") {
    initializeAllPlayers(playerList);
    playGame(playerList, currentPlayerNum, false);
  }
};

const shouldRunTwoPlayerGame = (gameMode, playerList, playerSelectionList) => {
  if (gameMode === "2-player") {
    console.clear();
    let playerSelect = getUserSelection(
      "Who would you like to be your opponent\n",
      playerSelectionList
    );

    if (playerSelect === "quit") return false;

    playerList.push(new Player(playerSelect, 2));

    initializeAllPlayers(players);
    playGame(players, currentPlayer, gameMode, false);
  }
};

const runSelectionMenus = (gameMode) => {
  let gameModeSelection = getUserSelection(
    "Please choose what game mode you would like to play\n",
    modeSelectMenu
  );

  if (!gameModeSelection) {
    console.log("Goodbye!");
    return;
  }

  gameMode = gameModeSelection;

  players.push(new Player("human", 1));

  shouldRunOnePlayerGame(gameMode, players, currentPlayer);

  if (!shouldRunTwoPlayerGame(gameMode, players, playerSelectMenu)) {
    console.log("Goodbye!");
    return;
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
// beginGame(gameMode);

runSelectionMenus(gameMode);

// initializeAllPlayers(players);

// playGame(players, currentPlayer, true);
