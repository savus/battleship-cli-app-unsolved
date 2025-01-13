export const removeSpacesAndSpecialChars = (str) => {
  return str.replace(/[^a-z0-9]/gi, "");
};

export const isLengthTwo = (str) => str.length === 2;

export const areCoordsCorrectType = (coords) => {
  const isYValid = /[a-z]/i.test(coords[0]);
  const isXValid = /\d/.test(coords[1]);
  return isYValid && isXValid;
};

export const isWithinBoard = (board, coords) => {
  const y = coords[0].toLowerCase().charCodeAt() - 96;
  const x = coords[1];
  const isYValid = y <= board.size && y > 0;
  const isXValid = x < board.size && x > -1;
  return isYValid && isXValid;
};

export const areCoordsValid = (board, coords) => {
  const adjustedCoords = removeSpacesAndSpecialChars(coords).toUpperCase();

  if (!isLengthTwo(adjustedCoords)) {
    console.log("Invalid coords length");
    return false;
  }

  if (!areCoordsCorrectType(adjustedCoords)) {
    console.log("Coords are invalid type");
    return false;
  }

  if (!isWithinBoard(board, adjustedCoords)) {
    console.log("Coords are outside of board");
    return false;
  }

  console.log("Coords are valid", adjustedCoords);
  return true;
};
