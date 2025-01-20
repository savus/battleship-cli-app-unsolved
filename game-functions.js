import { getCell, printBoard, printBoards, setCell } from "./board-functions";
import {
  allShipLocations,
  currentPlayer,
  gameMode,
  players,
} from "./game-start";
import { areCoordsValid, removeSpacesAndSpecialChars } from "./validations";

export const readlineSync = require("readline-sync");

export const isGameTwoPlayers = () => gameMode === "2-player";

export const getActivePlayer = () =>
  isGameTwoPlayers()
    ? players.find((player) => player.playerNum === currentPlayer)
    : players[0];

export const checkAllShipLocations = (locationsArr, str) =>
  locationsArr.includes(str);

export const findShip = (shipList, str) =>
  shipList.find((ship) => ship.locations.includes(str));

export const isLocationAlreadyHit = (board, str) => getCell(board, str).hit;

export const isShipDead = (ship) => ship.lives === 0;

export const checkIfWon = (shipList) =>
  shipList.filter((ship) => ship.lives > 0) === 0;

export const shipIsSunk = (hitShip, shipList) => {
  if (isShipDead(hitShip)) {
    const remainingShips = shipList.filter((ship) => ship.lives > 0).length;
    readlineSync.question(`${hitShip.name} has been sunk!`);
    if (remainingShips === 0) {
      readlineSync.question("Congrats! You won!");
      return true;
    } else {
      readlineSync.question(`${remainingShips} ships remaining!`);
    }
  }
  return false;
};

export const shipIsHit = (board, shipList, str, hitShip) => {
  let gameIsOver = false;
  setCell(board, str, {
    type: hitShip.type,
    id: hitShip.id,
    hit: true,
  });
  readlineSync.question("You made a hit!");
  hitShip.subtractLives(1);
  gameIsOver = shipIsSunk(hitShip, shipList);
  if (gameIsOver) return true;
  return false;
};

const mainGamePlay = (board, shipList, str) => {
  let gameIsOver = false;
  if (areCoordsValid(board, str)) {
    if (isLocationAlreadyHit(board, str)) {
      readlineSync.question("This location has already been hit");
    } else {
      const hitShip = findShip(shipList, str);
      if (!hitShip) {
        setCell(board, str, { type: "empty", id: 0, hit: true });
        readlineSync.question("Sorry, you missed!");
      } else {
        gameIsOver = shipIsHit(board, shipList, str, hitShip);
        if (gameIsOver) return true;
      }
    }
  }
  return false;
};

export const playerTurn = (players, currentPlayer, debug) => {
  const gameIsTwoPlayers = isGameTwoPlayers();

  const activePlayer =
    gameMode === "1-player"
      ? players[0]
      : players.find((player) => player.playerNum === currentPlayer);

  const enemyPlayer =
    gameMode === "1-player"
      ? null
      : players.find((player) => player.playerNum !== currentPlayer);

  const userInputMessage =
    activePlayer.type === "human"
      ? `${
          gameIsTwoPlayers ? `Player: ${activePlayer.playerNum} ` : ""
        }Please enter coords... \nUse format A0...B1...C3...etc\n[type "quit" to exit the game or "debug" to ${
          debug ? "exit" : "enter"
        } debug mode]\n`
      : "";

  console.clear();
  printBoards(players, debug);

  let userInput = readlineSync.question(userInputMessage);

  const cleanStrCopy = removeSpacesAndSpecialChars(userInput).toUpperCase();

  if (cleanStrCopy.toLowerCase() === "quit") {
    return;
  } else if (cleanStrCopy.toLowerCase() === "debug") {
    debug = !debug;
    return playerTurn(players, currentPlayer, debug);
  } else {
    const whichBoardToCheck = gameIsTwoPlayers
      ? enemyPlayer.board
      : activePlayer.board;

    const whichShipsToCheck = gameIsTwoPlayers
      ? enemyPlayer.ships
      : activePlayer.ships;

    let gameIsOver = mainGamePlay(
      whichBoardToCheck,
      whichShipsToCheck,
      cleanStrCopy
    );
    if (gameIsOver) return;
  }
  currentPlayer = gameIsTwoPlayers ? (currentPlayer === 1 ? 2 : 1) : 1;
  return playerTurn(players, currentPlayer, debug);
};

export const initializeAllPlayers = () => {
  players.forEach((player) => {
    player.addShipsToBoard();
    allShipLocations.push(...player.shipLocations);
  });
};
