import { createBoard, getCell, printBoard, setCell } from "./board-functions";
import { createShips, shipData } from "./ship-functions";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const readlineSync = require("readline-sync");

const board1 = createBoard(8);
const ships = createShips(shipData);
const shipLocations = [];
let gameWon = false;

console.clear();

// setCell(board1, "A0", { type: "empty", id: 0, hit: false });
// setCell(board1, "A1", { type: "empty", id: 0, hit: false });
// setCell(board1, "A2", { type: "empty", id: 0, hit: false });
// setCell(board1, "A3", { type: "empty", id: 0, hit: false });
// setCell(board1, "A4", { type: "empty", id: 0, hit: false });
// setCell(board1, "B0", { type: "empty", id: 0, hit: false });
// setCell(board1, "B1", { type: "empty", id: 0, hit: false });
// setCell(board1, "B2", { type: "empty", id: 0, hit: false });
// setCell(board1, "B3", { type: "empty", id: 0, hit: false });
// setCell(board1, "B4", { type: "empty", id: 0, hit: false });
// setCell(board1, "C0", { type: "empty", id: 0, hit: false });
// setCell(board1, "C1", { type: "empty", id: 0, hit: false });
// setCell(board1, "C2", { type: "empty", id: 0, hit: false });
// setCell(board1, "C3", { type: "empty", id: 0, hit: false });
// setCell(board1, "C4", { type: "empty", id: 0, hit: false });
// setCell(board1, "D0", { type: "empty", id: 0, hit: false });
// setCell(board1, "D1", { type: "empty", id: 0, hit: false });
// setCell(board1, "D2", { type: "empty", id: 0, hit: false });
// setCell(board1, "D3", { type: "empty", id: 0, hit: false });
// setCell(board1, "D4", { type: "empty", id: 0, hit: false });

ships.forEach((ship) => ship.placePieces(board1));
ships.forEach((ship) => {
  shipLocations.push(...ship.locations);
});

console.log(shipLocations);

const checkShipLocations = (str) => shipLocations.includes(str);

const findShip = (shipList, str) =>
  shipList.find((ship) => ship.locations.includes(str));

const isLocationAlreadyHit = (board, str) => getCell(board, str).hit;

const isShipDead = (ship) => ship.lives === 0;

const checkIfWon = (shipList) =>
  shipList.filter((ship) => ship.lives > 0) === 0;

let tries = 5;

while (!gameWon) {
  printBoard(board1, true);
  let userInput = readlineSync.question("Please enter coords...\n");
  if (userInput === "quit") {
    gameWon = true;
  } else {
    if (isLocationAlreadyHit(board1, userInput)) {
      console.log("This location has already been hit");
    } else {
      if (!checkShipLocations(userInput)) {
        setCell(board1, userInput, { type: "empty", id: 0, hit: true });
        console.log("Sorry, you missed!");
      } else {
        const hitShip = findShip(ships, userInput);
        setCell(board1, userInput, {
          type: hitShip.type,
          id: hitShip.id,
          hit: true,
        });
        console.log("You made a hit!");
        hitShip.subtractLives(1);
        if (isShipDead(hitShip)) {
          const remainingShips = ships.filter((ship) => ship.lives > 0);
          console.log(`${hitShip.name} has been sunk!`);
          if (remainingShips.length === 0) {
            gameWon = true;
            console.log("Congrats! You won!");
          } else {
            console.log(`${remainingShips.length} remaining!`);
          }
        }
      }
    }
  }
}
