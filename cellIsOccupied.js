import { convertInput } from "./validations";

export const cellIsOccupied = (board, str) => {
  const convertedStr = convertInput(str);
  if (!areCoordsValid(board, str)) {
    throw new Error("Coordinates are not valid");
  }

  return board.grid[convertedStr.letter][convertedStr.number].type !== "empty";
};
