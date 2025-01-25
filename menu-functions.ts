import {
  initializeAllPlayers,
  isGameTwoPlayers,
  playGame,
} from "./game-functions";
import {
  modeSelectMenu,
  players,
  playerSelectMenu,
  readlineSync,
  setGameMode,
  textColors,
} from "./game-start";
import { Player } from "./player-functions";
import type { PlayerType } from "./types";

const getUserSelection = (message: string, list: string[]) => {
  console.clear();
  console.log(list.map((item, index) => `[${index + 1}] ${item}`));
  const userInput = readlineSync.question(
    `${message}...  Press [${textColors["cyan"]}${list.map(
      (_item, index) => index + 1
    )}${textColors["default"]}] or type "quit" to exit.\n`
  );
  if (userInput === "quit") return false;

  if (/^\d+$/gi.test(userInput) && list[userInput - 1])
    return list[userInput - 1];

  console.log("Invalid choice");
  return getUserSelection(message, list);
};

const shouldRunOnePlayerGame = () => {
  if (!isGameTwoPlayers()) {
    initializeAllPlayers();
    return playGame();
  }
};

const shouldRunTwoPlayerGame = () => {
  if (isGameTwoPlayers()) {
    console.clear();
    let playerSelect = getUserSelection(
      "Who would you like to be your opponent",
      playerSelectMenu
    );

    if (!playerSelect) return false;

    players.push(new Player(playerSelect, 2));

    initializeAllPlayers();
    return playGame();
  }
};

export const runSelectionMenus = () => {
  let gameModeSelection = getUserSelection(
    "Choose what game mode you would like to play",
    modeSelectMenu
  );

  if (!gameModeSelection) {
    console.log("Goodbye!");
    return;
  }

  setGameMode(gameModeSelection);

  players.push(new Player("human", 1));

  shouldRunOnePlayerGame();

  if (!shouldRunTwoPlayerGame()) {
    console.log("Goodbye!");
    return;
  }
};
