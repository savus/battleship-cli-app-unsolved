import { getRandomCoords, isCellOccupied } from "./board-functions";
import { alphabet } from "./game-start";
import {
  areCoordsWithinBoard,
  convertCoordsToNums,
  convertCoordsToString,
} from "./validations";

class Ship {
  constructor(name, id, type, length, isHorizontal) {
    this.name = name;
    this.id = id;
    this.type = type;
    this.length = length;
    this.isHorizontal = isHorizontal;
    this.lives = length;
    this.locations = [];
  }

  placePieces(board) {
    let startingPoint = getRandomCoords(board, alphabet);
    let [col, row] = convertCoordsToNums(startingPoint);
    let trackedLocations = [];

    for (let i = 0; i < this.length; i++) {
      const string = convertCoordsToString(col, row, alphabet);
      if (
        !areCoordsWithinBoard(board, string) ||
        isCellOccupied(board, string)
      ) {
        return this.placePieces(board);
      }

      trackedLocations.push(string);
      this.isHorizontal ? row++ : col++;
    }

    for (let i = 0; i < trackedLocations.length; i++) {
      setCell(board, trackedLocations[i], {
        type: this.type,
        id: this.id,
        hit: false,
      });
    }

    this.locations.push(...trackedLocations);
  }

  subtractLives(num) {
    this.lives -= num;
  }
}

export const createShips = (data, type) => {
  return data.map((ship) => {
    const { name, id, length } = ship;
    const horizontal = Math.floor(Math.random() * 2) === 0 ? true : false;
    return new Ship(name, id, type, length, horizontal);
  });
};
