import {
  getCell,
  getRandomCoords,
  isCellOccupied,
  printBoards,
  setCell,
} from "./board-functions";
import { allShipLocations, alphabet, gameMode } from "./game-start";
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

export const checkAllShipLocations = (locationsArr, str) =>
  locationsArr.includes(str);

export const findShip = (shipList, str) =>
  shipList.find((ship) => ship.locations.includes(str));

export const isLocationAlreadyHit = (board, str) => getCell(board, str).hit;

export const isShipDead = (ship) => ship.lives === 0;

export const checkIfWon = (shipList) =>
  shipList.filter((ship) => ship.lives > 0) === 0;

export const shipIsSunk = (hitShip, shipList, activePlayer) => {
  if (isShipDead(hitShip)) {
    const remainingShips = shipList.filter((ship) => ship.lives > 0).length;
    readlineSync.question(`${hitShip.name} has been sunk!`);
    if (remainingShips === 0) {
      const gameMessage =
        activePlayer.type === "human"
          ? "Congrats! You won!"
          : "Too bad! The computer won!";
      readlineSync.question(gameMessage);
      return true;
    } else {
      readlineSync.question(`${remainingShips} ships remaining!`);
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
      ? "You made a hit!"
      : "The computer scored a hit!";

  readlineSync.question(gameMessage);
  hitShip.subtractLives(1);
  gameIsOver = shipIsSunk(hitShip, shipList, activePlayer);
  if (gameIsOver) return true;
  return false;
};

const mainGamePlay = (board, shipList, activePlayer, str) => {
  let gameIsOver = false;
  if (isLocationAlreadyHit(board, str)) {
    readlineSync.question("This location has already been hit");
  } else {
    const hitShip = findShip(shipList, str);
    if (!hitShip) {
      const gameMessage =
        activePlayer.type == "human"
          ? "Sorry, you missed!"
          : "The computer missed";

      setCell(board, str, { type: "empty", id: 0, hit: true });
      readlineSync.question(gameMessage);
    } else {
      gameIsOver = shipIsHit(board, shipList, activePlayer, str, hitShip);
      if (gameIsOver) return true;
    }
  }

  return false;
};

export const playGame = (playerList, currentPlayerNum, debugMode) => {
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
          gameIsTwoPlayers ? `Player: ${activePlayer.playerNum} ` : ""
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
    return playGame(playerList, currentPlayerNum, debugMode);
  } else {
    const whichBoardToCheck = gameIsTwoPlayers
      ? opposingPlayer.board
      : activePlayer.board;

    const whichShipsToCheck = gameIsTwoPlayers
      ? opposingPlayer.ships
      : activePlayer.ships;

    if (!areCoordsValid(whichBoardToCheck, cleanStrCopy))
      return playGame(playerList, currentPlayerNum, debugMode);

    let gameIsOver = mainGamePlay(
      whichBoardToCheck,
      whichShipsToCheck,
      activePlayer,
      cleanStrCopy
    );

    if (gameIsOver) return;
  }
  currentPlayerNum = gameIsTwoPlayers ? (currentPlayerNum === 1 ? 2 : 1) : 1;
  return playGame(playerList, currentPlayerNum, debugMode);
};

export const initializeAllPlayers = (playerList) => {
  playerList.forEach((player) => {
    player.addShipsToBoard();
    allShipLocations.push(...player.shipLocations);
  });
};
