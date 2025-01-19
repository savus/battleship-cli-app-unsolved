import { getCell, printBoard, setCell } from "./board-functions";
import { shipLocations } from "./game-start";
import { areCoordsValid, removeSpacesAndSpecialChars } from "./validations";

export const readlineSync = require("readline-sync");

export const checkShipLocations = (str) => shipLocations.includes(str);

export const findShip = (shipList, str) =>
  shipList.find((ship) => ship.locations.includes(str));

export const isLocationAlreadyHit = (board, str) => getCell(board, str).hit;

export const isShipDead = (ship) => ship.lives === 0;

export const checkIfWon = (shipList) =>
  shipList.filter((ship) => ship.lives > 0) === 0;

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
    if (areCoordsValid(board, cleanStrCopy)) {
      if (isLocationAlreadyHit(board, cleanStrCopy)) {
        readlineSync.question("This location has already been hit");
      } else {
        if (!checkShipLocations(cleanStrCopy)) {
          setCell(board, cleanStrCopy, { type: "empty", id: 0, hit: true });
          readlineSync.question("Sorry, you missed!");
        } else {
          const hitShip = findShip(shipList, cleanStrCopy);
          setCell(board, cleanStrCopy, {
            type: hitShip.type,
            id: hitShip.id,
            hit: true,
          });
          readlineSync.question("You made a hit!");
          hitShip.subtractLives(1);
          if (isShipDead(hitShip)) {
            const remainingShips = shipList.filter((ship) => ship.lives > 0);
            readlineSync.question(`${hitShip.name} has been sunk!`);
            if (remainingShips.length === 0) {
              readlineSync.question("Congrats! You won!");
              return;
            } else {
              readlineSync.question(`${remainingShips.length} remaining!`);
            }
          }
        }
      }
    }
  }
  return playTurn(board, shipList, debug);
};
