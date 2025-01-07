export const removeSpacesAndSpecialChars = (str) =>
  str.replace(/[^a-z0-9]/gi, "");

export const lengthIsTwo = (str) => str.length === 2;

export const isWithinBoard = (board, coords) => {
  const y = coords[0].toLowerCase().charCodeAt() - 96;
  const x = parseInt(coords[1]);
  const size = Object.keys(board).length;
  return x > 0 && x < size && y > 0 && y < size;
};

export const isValidCoords = (board, coords) => {
  const adjustedCoords = removeSpacesAndSpecialChars(coords);

  if (!lengthIsTwo(adjustedCoords)) {
    console.log("Invalid coords length");
    return false;
  }

  if (!isWithinBoard(board, adjustedCoords)) {
    console.log("Coords are outside of board");
    return false;
  }
  console.log("Coords are valid");
  return true;
};
