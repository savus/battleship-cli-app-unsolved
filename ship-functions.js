import { getRandomCoords, isCellOccupied, setCell } from "./board-functions";
import { convertCoordsToNums, revertCoordsToString } from "./validations";

export const shipData = [
  { name: "Destroyer", id: 0, type: "large", length: 4 },
  // { name: "Cruiser", id: 1, type: "large", length: 3 },
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
    let [col, row] = convertCoordsToNumss(startingPoint);

    while (isCellOccupied(board, startingPoint)) {
      startingPoint = getRandomCoords(board);
      [col, row] = convertCoordsToNums(startingPoint);
    }

    this.locations.push(revertCoordsToString(col, row));
    this.isHorizontal ? row++ : col++;

    for (let i = 0; i < this.length - 1; i++) {
      if (isCellOccupied(board, revertCoordsToString(col, row))) {
        return placePieces(board);
      }
      this.locations.push(revertCoordsToString(col, row));

      this.isHorizontal ? row++ : col++;
    }

    for (let i = 0; i < this.locations.length; i++) {
      setCell(board, this.locations[i], {
        type: this.type,
        id: this.id,
        hit: false,
      });
    }

    console.log("success");
  }
}

export const createShips = (data) => {
  return data.map((ship) => {
    const { name, id, type, length } = ship;
    const horizontal = Math.floor(Math.random() * 2) === 0 ? true : false;
    const newShip = new Ship(name, id, type, length, horizontal);
    return newShip;
  });
};
