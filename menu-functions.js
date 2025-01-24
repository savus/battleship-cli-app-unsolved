import {
  currentPlayer,
  gameMode,
  modeSelectMenu,
  players,
  readlineSync,
  textColors,
} from "./game-start";
import { Player } from "./player-functions";

const getUserSelection = (message, list) => {
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
  if (gameMode === "1-player") {
    initializeAllPlayers(players);
    return playGame(players, currentPlayer, gameMode, false);
  }
};

const shouldRunTwoPlayerGame = () => {
  if (gameMode === "2-player") {
    console.clear();
    let playerSelect = getUserSelection(
      "Who would you like to be your opponent",
      playerSelectionList
    );

    if (!playerSelect) return false;

    playerList.push(new Player(playerSelect, 2));

    initializeAllPlayers(playerList);
    return playGame(playerList, currentPlayerNum, gameMode, false);
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

  gameMode = gameModeSelection;

  players.push(new Player("human", 1));

  shouldRunOnePlayerGame();

  if (
    !shouldRunTwoPlayerGame(
      gameMode,
      playerList,
      playerSelectMenu,
      currentPlayerNum
    )
  ) {
    console.log("Goodbye!");
    return;
  }
};
