import { printBoard } from "./board-functions";
import { checkAllShipLocations, readlineSync } from "./game-functions";
import { Player } from "./player-functions";
import { removeSpacesAndSpecialChars } from "./validations";

export const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
export const boardSize = 8;
export let debug = false;

const player1 = new Player("human");

const players = [player1];

const allShipLocations = [];

console.clear();
player1.addShipsToBoard();
printBoard(player1.board, true);

const userInput = readlineSync.question("please enter coords\n");

const cleanStrCopy = removeSpacesAndSpecialChars(userInput);

players.forEach((player) => allShipLocations.push(...player.shipLocations));
// console.log(allShipLocations);
