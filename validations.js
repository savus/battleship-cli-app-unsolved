import { alphabet } from "./game-start";

export const removeSpacesAndSpecialChars = (str) =>
  str.replace(/[^a-z0-9]/gi, "");

export const areCharsCorrectType = (str) => /[a-z]{1}\d{1,2}/i.test(str);

export const separateChars = (str) => {
  const col = str.slice(0, 1);
  const row = str.slice(1);
  return [col, row];
};

export const convertCoordsToNums = (str) => {
  const [col, row] = separateChars(str);
  return [col.charCodeAt() - 65, parseInt(row)];
};

export const revertCoordsToString = (col, row) => {
  return `${alphabet[col]}${row}`;
};

export const areCoordsWithinBoard = (board, str) => {
  const [col, row] = convertCoordsToNums(str);
  return col < board.size && row < board.size;
};

export const areCoordsValid = (board, str) => {
  if (!areCharsCorrectType(str)) {
    console.log("Coordinates are not correct type");
    return false;
  }

  if (!areCoordsWithinBoard(board, str)) {
    console.log("Coordinates are not within board");
    return false;
  }

  console.log("Coordinates are valid");
  return true;
};
