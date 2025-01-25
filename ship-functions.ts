import { getRandomCoords, isCellOccupied, setCell } from "./board-functions";
import { alphabet } from "./game-start";
import type { Board, ShipData, ShipType } from "./types";
import {
  areCoordsWithinBoard,
  convertCoordsToNums,
  convertCoordsToString,
} from "./validations";

class Ship {
  name: string;
  id: number;
  type: ShipType;
  length: number;
  isHorizontal: boolean;
  lives: number;
  locations: string[];

  constructor(
    name: string,
    id: number,
    type: ShipType,
    length: number,
    isHorizontal: boolean
  ) {
    this.name = name;
    this.id = id;
    this.type = type;
    this.length = length;
    this.isHorizontal = isHorizontal;
    this.lives = length;
    this.locations = [];
  }

  placePieces(board: Board): undefined {
    let startingPoint = getRandomCoords(board);
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
    return;
  }

  subtractLives(num: number) {
    this.lives -= num;
  }
}

export const createShips = (shipData: ShipData[], type: ShipType) => {
  return shipData.map((ship) => {
    const { name, id, length } = ship;
    const horizontal = Math.floor(Math.random() * 2) === 0 ? true : false;
    return new Ship(name, id, type, length, horizontal);
  });
};
