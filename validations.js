export const removeSpecialCharsAndSpaces = (str) =>
  str.replace(/[^a-z0-9]/gi, "").toUpperCase();

export const convertChars = (str) => {
  return { letter: str.slice(0, 1), number: str.slice(1) };
};

export const areCoordsCorrectType = (coords) =>
  /[a-z]/i.test(coords.letter) && /\d/g.test(coords.number);

export const areCoordsWithinBoard = (board, coords) =>
  coords.number < board.size && coords.letter.charCodeAt() - 64 <= board.size;

export const areCoordsValid = (board, coords) => {
  if (!areCoordsCorrectType(coords)) {
    console.log("coordinates are not correct type");
    return false;
  }

  if (!areCoordsWithinBoard(board, coords)) {
    console.log("coordinates are not within board");
    return false;
  }

  return true;
};
