export const removeSpacesAndSpecialChars = (str) =>
  str.replace(/\s|[^a-z0-9]/gi, "");

export const lengthIsTwo = (str) => str.length === 2;

export const isWithinBoard = (board, coords) => {
  const y = coords[0].toLowerCase().charCodeAt() - 96;
  const x = parseInt(coords[1]);
  return x < board.size && y < board.size;
};

export const isValidCoords = (board, coords) => {
  removeSpacesAndSpecialChars(coords);

  if (!lengthIsTwo(coords)) {
    console.log("Invalid coords length");
    return false;
  }

  if (!isWithinBoard(board, coords)) {
    console.log("Coords are outside of board");
    return false;
  }
  console.log("Coords are valid");
  return true;
};
