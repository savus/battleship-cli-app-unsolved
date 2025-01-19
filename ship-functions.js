import { getRandomCoords, isCellOccupied, setCell } from "./board-functions";
import { convertCoordsToNums, revertCoordsToString } from "./validations";

export const shipData = [
  { name: "Destroyer", id: 1, type: "small", length: 4 },
  { name: "Cruiser", id: 2, type: "small", length: 3 },
];

const shipLocations = [];

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
    let startingPoint = getRandomCoords(board);
    let [col, row] = convertCoordsToNums(startingPoint);
    let trackedLocations = [];

    for (let i = 0; i < this.length; i++) {
      if (isCellOccupied(board, revertCoordsToString(col, row))) {
        return this.placePieces(board);
      }

      trackedLocations.push(revertCoordsToString(col, row));
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

    console.log("success");
  }
}

export const createShips = (data) => {
  return data.map((ship) => {
    const { name, id, type, length } = ship;
    const horizontal = Math.floor(Math.random() * 2) === 0 ? true : false;
    return new Ship(name, id, type, length, horizontal);
  });
};
