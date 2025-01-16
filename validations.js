import { alphabet } from "./game-start";

export const removeSpacesAndSpecialChars = (str) =>
  str.replace(/[^a-z0-9]/gi, "");

export const areCharsCorrectType = (str) => /[a-z]{1}\d{1,2}/i.test(str);

export const separateChars = (str) => {
  return { col: str.slice(0, 1), row: str.slice(1) };
};

export const convertCoordsToNumbers = (coords) => {
  const col = coords.col;
  const row = coords.row;
  const convertedCol = col.charCodeAt() - 65;
  const convertedRow = parseInt(row);

  return { col: convertedCol, row: convertedRow };
};

export const convertNumbersToCoords = (coords) => {
  return { col: alphabet[coords.col], row: coords.row };
};
