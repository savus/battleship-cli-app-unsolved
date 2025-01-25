import { getCell, getRandomCoords, setCell } from "./board-functions";
import {
  currentPlayer,
  debug,
  gameMode,
  players,
  readlineSync,
  textColors,
} from "./game-start";
import { runSelectionMenus } from "./menu-functions";
import { areCoordsValid, removeSpacesAndSpecialChars } from "./validations";

export const isGameTwoPlayers = () => gameMode === "2-player";

const getActivePlayer = () =>
  isGameTwoPlayers()
    ? players.find((player) => player.playerNum === currentPlayer)
    : players[0];

const getOpposingPlayer = () =>
  isGameTwoPlayers()
    ? players.find((player) => player.playerNum !== currentPlayer)
    : null;

const getComputersDecision = (board) => {
  const randomCoords = getRandomCoords(board);
  if (isLocationAlreadyHit(board, randomCoords))
    return getComputersDecision(board);
  return randomCoords;
};

const findShip = (shipList, str) =>
  shipList.find((ship) => ship.locations.includes(str));

const isLocationAlreadyHit = (board, str) => getCell(board, str).hit;

const isShipDead = (ship) => ship.lives === 0;

const checkIfWon = (shipList) =>
  shipList.filter((ship) => ship.lives > 0) === 0;

const displayEndGameMessage = (gameMessage) => {
  console.clear();
  console.log("=".repeat(100));
  console.log("💠".repeat(6), gameMessage, "💠".repeat(6));
  console.log("=".repeat(100));
};

const shipIsSunk = (hitShip, shipList, activePlayer) => {
  if (isShipDead(hitShip)) {
    const remainingShips = shipList.filter((ship) => ship.lives > 0).length;
    readlineSync.question(
      `${textColors["cyan"]}${hitShip.name} has been sunk!${textColors["default"]}`
    );
    if (remainingShips === 0) {
      const gameMessage =
        activePlayer.type === "human"
          ? `${textColors["green"]}Congrats! You won!${textColors["default"]}`
          : `${textColors["red"]}Too bad! The computer won!${textColors["default"]}`;

      displayEndGameMessage(gameMessage);
      return true;
    } else {
      readlineSync.question(
        `${textColors["cyan"]}${remainingShips} ships remaining${textColors["default"]}!`
      );
    }
  }
  return false;
};

const shipIsHit = (board, shipList, activePlayer, str, hitShip) => {
  let gameIsOver = false;
  setCell(board, str, {
    type: hitShip.type,
    id: hitShip.id,
    hit: true,
  });

  const gameMessage =
    activePlayer.type === "human"
      ? `${textColors["green"]}You made a hit!${textColors["default"]}`
      : `${textColors["red"]}${str}\nThe computer scored a hit!${textColors["default"]}`;

  readlineSync.question(gameMessage);
  hitShip.subtractLives(1);
  gameIsOver = shipIsSunk(hitShip, shipList, activePlayer);
  if (gameIsOver) return true;
  return false;
};

const mainGamePlay = (board, shipList, activePlayer, str) => {
  let gameIsOver = false;
  if (isLocationAlreadyHit(board, str)) {
    readlineSync.question(
      `${textColors["cyan"]}This location has already been hit${textColors["default"]}`
    );
  } else {
    const hitShip = findShip(shipList, str);
    if (!hitShip) {
      const gameMessage =
        activePlayer.type == "human"
          ? `${textColors["red"]}Sorry, you missed!${textColors["default"]}`
          : `${textColors["cyan"]}${str}\nThe computer missed${textColors["default"]}`;

      setCell(board, str, { type: "empty", id: 0, hit: true });
      readlineSync.question(gameMessage);
    } else {
      gameIsOver = shipIsHit(board, shipList, activePlayer, str, hitShip);
      if (gameIsOver) return true;
    }
  }

  return false;
};

const playGame = () => {
  const gameIsTwoPlayers = isGameTwoPlayers(gameMode);
  const activePlayer = getActivePlayer();

  const opposingPlayer = getOpposingPlayer();

  const userInputMessage =
    activePlayer.type === "human"
      ? `${
          gameIsTwoPlayers
            ? `${textColors["green"]}Player: ${activePlayer.playerNum} ${textColors["default"]}`
            : ""
        }Please enter coords... \nUse format A0...B1...C3...etc\n[type "quit" to exit the game or "debug" to ${
          debug ? "exit" : "enter"
        } debug mode]\n`
      : "Computer is thinking";

  console.clear();
  printBoards();

  let userInput = readlineSync.question(userInputMessage);

  const cleanStrCopy =
    activePlayer.type === "human"
      ? removeSpacesAndSpecialChars(userInput).toUpperCase()
      : getComputersDecision(opposingPlayer.board);

  if (cleanStrCopy.toLowerCase() === "quit") {
    return;
  } else if (cleanStrCopy.toLowerCase() === "debug") {
    debug = !debug;
    return playGame();
  } else {
    const whichBoardToCheck = gameIsTwoPlayers
      ? opposingPlayer.board
      : activePlayer.board;

    const whichShipsToCheck = gameIsTwoPlayers
      ? opposingPlayer.ships
      : activePlayer.ships;

    if (!areCoordsValid(whichBoardToCheck, cleanStrCopy)) return playGame();

    let gameIsOver = mainGamePlay(
      whichBoardToCheck,
      whichShipsToCheck,
      activePlayer,
      cleanStrCopy
    );

    if (gameIsOver) return;
  }
  currentPlayer = gameIsTwoPlayers ? (currentPlayer === 1 ? 2 : 1) : 1;
  return playGame();
};

export const initializeAllPlayers = () => {
  players.forEach((player) => {
    player.addShipsToBoard();
  });
};

export const beginGame = () => {
  console.log("=".repeat(100), "\n");
  console.log(
    `${textColors["cyan"]}Hello! Welcome to my mini-battleship game! ${textColors["default"]}\n`
  );
  console.log("=".repeat(100), "\n");

  readlineSync.question("Press any key to continue ...");
  runSelectionMenus();
};
