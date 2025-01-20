import { getCell, printBoard, setCell } from "./board-functions";
import { areCoordsValid, removeSpacesAndSpecialChars } from "./validations";

export const readlineSync = require("readline-sync");

export const checkAllShipLocations = (str, locationsArr) =>
  locationsArr.includes(str);

export const findShip = (shipList, str) =>
  shipList.find((ship) => ship.locations.includes(str));

export const isLocationAlreadyHit = (board, str) => getCell(board, str).hit;

export const isShipDead = (ship) => ship.lives === 0;

export const checkIfWon = (shipList) =>
  shipList.filter((ship) => ship.lives > 0) === 0;

export const shipIsSunk = (hitShip, shipList) => {
  if (isShipDead(hitShip)) {
    const remainingShips = shipList.filter((ship) => ship.lives > 0);
    readlineSync.question(`${hitShip.name} has been sunk!`);
    if (remainingShips.length === 0) {
      readlineSync.question("Congrats! You won!");
      return true;
    } else {
      readlineSync.question(`${remainingShips.length} ships remaining!`);
    }
  }
  return false;
};

export const shipIsHit = (board, shipList, str) => {
  let gameIsOver = false;
  const hitShip = findShip(shipList, str);
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

const gameMain = (board, str, shipList) => {
  let gameIsOver = false;
  if (areCoordsValid(board, str)) {
    if (isLocationAlreadyHit(board, str)) {
      readlineSync.question("This location has already been hit");
    } else {
      if (!checkShipLocations(str)) {
        setCell(board, str, { type: "empty", id: 0, hit: true });
        readlineSync.question("Sorry, you missed!");
      } else {
        gameIsOver = shipIsHit(board, shipList, str);
        if (gameIsOver) return true;
      }
    }
  }
  return false;
};

export const playTurn = (board, shipList, debug) => {
  console.clear();
  printBoard(board, debug);

  let userInput = readlineSync.question(
    `Please enter coords... \nUse format A0...B1...C3...etc\n[type "quit" to exit the game or "debug" to ${
      debug ? "exit" : "enter"
    } debug mode]\n`
  );
  const cleanStrCopy = removeSpacesAndSpecialChars(userInput).toUpperCase();

  if (cleanStrCopy.toLowerCase() === "quit") {
    return;
  } else if (cleanStrCopy.toLowerCase() === "debug") {
    debug = !debug;
    return playTurn(board, shipList, debug);
  } else {
    let gameIsOver = gameMain(board, cleanStrCopy, shipList);
    if (gameIsOver) return;
  }

  return playTurn(board, shipList, debug);
};
