import { getCell, printBoard, setCell } from "./board-functions";
import { shipLocations } from "./game-start";

const readlineSync = require("readline-sync");

export const checkShipLocations = (str) => shipLocations.includes(str);

export const findShip = (shipList, str) =>
  shipList.find((ship) => ship.locations.includes(str));

export const isLocationAlreadyHit = (board, str) => getCell(board, str).hit;

export const isShipDead = (ship) => ship.lives === 0;

export const checkIfWon = (shipList) =>
  shipList.filter((ship) => ship.lives > 0) === 0;

export const playTurn = (board, shipList) => {
  printBoard(board, true);
  let userInput = readlineSync.question("Please enter coords...\n");
  if (userInput === "quit") {
    return;
  } else {
    if (isLocationAlreadyHit(board, userInput)) {
      console.log("This location has already been hit");
    } else {
      if (!checkShipLocations(userInput)) {
        setCell(board, userInput, { type: "empty", id: 0, hit: true });
        console.log("Sorry, you missed!");
      } else {
        const hitShip = findShip(shipList, userInput);
        setCell(board, userInput, {
          type: hitShip.type,
          id: hitShip.id,
          hit: true,
        });
        console.log("You made a hit!");
        hitShip.subtractLives(1);
        if (isShipDead(hitShip)) {
          const remainingShips = shipList.filter((ship) => ship.lives > 0);
          console.log(`${hitShip.name} has been sunk!`);
          if (remainingShips.length === 0) {
            console.log("Congrats! You won!");
            return;
          } else {
            console.log(`${remainingShips.length} remaining!`);
          }
        }
      }
    }
  }
  return playTurn(board, shipList);
};
