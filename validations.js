export const removeSpacesAndSpecialChars = (str) =>
  str.replace(/[^a-z0-9]/gi, "");

export const areCharsCorrectType = (str) => /[a-z]{1}\d{1,2}/i.test(str);

export const separateChars = (str) => {
  const col = str.slice(0, 1);
  const row = str.slice(1);
  return [col, row];
};

export const areCoordsWithinBoard = (board, str) => {
  const [col, row] = separateChars(str);
  return col.charCodeAt() - 65 < board.size && parseInt(row) < board.size;
};
