import { alphabet, readlineSync } from "./game-start";
import type { Board } from "./types";

export const removeSpacesAndSpecialChars = (input: string) =>
  input.replace(/[^a-z0-9]/gi, "");

const areCharsCorrectType = (input: string) => /[a-z]{1}\d{1,2}/i.test(input);

export const separateChars = (strCoords: string): [string, number] => {
  const col = strCoords.slice(0, 1);
  const row = parseInt(strCoords.slice(1));
  return [col, row];
};

export const convertCoordsToNums = (strCoords: string) => {
  const [col, row] = separateChars(strCoords);
  return [col.charCodeAt(0) - 65, row];
};

export const convertCoordsToString = (col: number, row: number) => {
  return `${alphabet[col]}${row}`;
};

export const areCoordsWithinBoard = (board: Board, strCoords: string) => {
  const [col, row] = convertCoordsToNums(strCoords);
  return col < board.size && row < board.size;
};

export const areCoordsValid = (board: Board, strCoords: string) => {
  if (!areCharsCorrectType(strCoords)) {
    readlineSync.question("Information is invalid");
    return false;
  }

  if (!areCoordsWithinBoard(board, strCoords)) {
    readlineSync.question("Coordinates are not within board");
    return false;
  }

  return true;
};
