import {
  getCell,
  getRandomCoords,
  printBoards,
  setCell,
} from "./board-functions";
import { alphabet, textColors } from "./game-start";
import { areCoordsValid, removeSpacesAndSpecialChars } from "./validations";

export const readlineSync = require("readline-sync");

export const isGameTwoPlayers = (mode) => mode === "2-player";

export const getActivePlayer = (mode, playerList, currentPlayerNum) =>
  mode === "2-player"
    ? playerList.find((player) => player.playerNum === currentPlayerNum)
    : playerList[0];

export const getOpposingPlayer = (mode, playerList, currentPlayerNum) =>
  mode === "2-player"
    ? playerList.find((player) => player.playerNum !== currentPlayerNum)
    : null;

const getComputersDecision = (board) => {
  const randomCoords = getRandomCoords(board, alphabet);
  if (isLocationAlreadyHit(board, randomCoords))
    return getComputersDecision(board);
  return randomCoords;
};

export const findShip = (shipList, str) =>
  shipList.find((ship) => ship.locations.includes(str));

export const isLocationAlreadyHit = (board, str) => getCell(board, str).hit;

export const isShipDead = (ship) => ship.lives === 0;

export const checkIfWon = (shipList) =>
  shipList.filter((ship) => ship.lives > 0) === 0;

export const shipIsSunk = (hitShip, shipList, activePlayer) => {
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
      readlineSync.question(gameMessage);
      return true;
    } else {
      readlineSync.question(
        `${textColors["cyan"]}${remainingShips} ships remaining${textColors["default"]}!`
      );
    }
  }
  return false;
};

export const shipIsHit = (board, shipList, activePlayer, str, hitShip) => {
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

export const playGame = (playerList, currentPlayerNum, gameMode, debugMode) => {
  const gameIsTwoPlayers = isGameTwoPlayers(gameMode);
  const activePlayer = getActivePlayer(gameMode, playerList, currentPlayerNum);

  const opposingPlayer = getOpposingPlayer(
    gameMode,
    playerList,
    currentPlayerNum
  );

  const userInputMessage =
    activePlayer.type === "human"
      ? `${
          gameIsTwoPlayers
            ? `${textColors["green"]}Player: ${activePlayer.playerNum} ${textColors["default"]}`
            : ""
        }Please enter coords... \nUse format A0...B1...C3...etc\n[type "quit" to exit the game or "debug" to ${
          debugMode ? "exit" : "enter"
        } debug mode]\n`
      : "Computer is thinking";

  console.clear();
  printBoards(playerList, gameMode, debugMode);

  let userInput = readlineSync.question(userInputMessage);

  const cleanStrCopy =
    activePlayer.type === "human"
      ? removeSpacesAndSpecialChars(userInput).toUpperCase()
      : getComputersDecision(opposingPlayer.board);

  if (cleanStrCopy.toLowerCase() === "quit") {
    return;
  } else if (cleanStrCopy.toLowerCase() === "debug") {
    debugMode = !debugMode;
    return playGame(playerList, currentPlayerNum, gameMode, debugMode);
  } else {
    const whichBoardToCheck = gameIsTwoPlayers
      ? opposingPlayer.board
      : activePlayer.board;

    const whichShipsToCheck = gameIsTwoPlayers
      ? opposingPlayer.ships
      : activePlayer.ships;

    if (!areCoordsValid(whichBoardToCheck, cleanStrCopy))
      return playGame(playerList, currentPlayerNum, gameMode, debugMode);

    let gameIsOver = mainGamePlay(
      whichBoardToCheck,
      whichShipsToCheck,
      activePlayer,
      cleanStrCopy
    );

    if (gameIsOver) return;
  }
  currentPlayerNum = gameIsTwoPlayers ? (currentPlayerNum === 1 ? 2 : 1) : 1;
  return playGame(playerList, currentPlayerNum, gameMode, debugMode);
};

export const initializeAllPlayers = (playerList) => {
  playerList.forEach((player) => {
    player.addShipsToBoard();
  });
};
