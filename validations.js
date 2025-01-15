export const removeSpecialCharsAndSpaces = (str) =>
  str.replace(/[^a-z0-9]/gi, "").toUpperCase();

export const areCoordsCorrectType = (str) => /^[a-z]{1}\d{1,2}$/gi.test(str);

export const separateChars = (str) => {
  return { letter: str.slice(0, 1), number: str.slice(1) };
};

export const revertToString = (coords) => `${coords.letter}${coords.number}`;

export const areCoordsWithinBoard = (board, coords) =>
  coords.number < board.size && coords.letter.charCodeAt() - 64 <= board.size;

export const areCoordsValid = (board, str) => {
  const cleanCopyStr = removeSpecialCharsAndSpaces(str);

  if (cleanCopyStr.length === 0) {
    console.log("Coordinates cannot be empty");
    return false;
  }

  if (!areCoordsCorrectType(str)) {
    console.log("coordinates are not correct type");
    return false;
  }

  const separatedChars = separateChars(cleanCopyStr);

  if (!areCoordsWithinBoard(board, separatedChars)) {
    console.log("coordinates are not within board");
    return false;
  }

  return true;
};

export const convertInput = (str) => {
  const cleanCopyStr = removeSpecialCharsAndSpaces(str);
  return separateChars(cleanCopyStr);
};
