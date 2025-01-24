const removeSpacesAndSpecialChars = (str) => str.replace(/[^a-z0-9]/gi, "");

const areCharsCorrectType = (str) => /[a-z]{1}\d{1,2}/i.test(str);

const separateChars = (str) => {
  const col = str.slice(0, 1);
  const row = str.slice(1);
  return [col, row];
};

const convertCoordsToNums = (str) => {
  const [col, row] = separateChars(str);
  return [col.charCodeAt() - 65, parseInt(row)];
};

const convertCoordsToString = (col, row, letters) => {
  return `${letters[col]}${row}`;
};

const areCoordsWithinBoard = (board, str) => {
  const [col, row] = convertCoordsToNums(str);
  return col < board.size && row < board.size;
};

const areCoordsValid = (board, str) => {
  if (!areCharsCorrectType(str)) {
    readlineSync.question("Information is invalid");
    return false;
  }

  if (!areCoordsWithinBoard(board, str)) {
    readlineSync.question("Coordinates are not within board");
    return false;
  }

  return true;
};
