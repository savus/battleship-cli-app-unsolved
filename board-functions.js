import { isGameTwoPlayers } from "./game-functions";
import { alphabet, gameMode } from "./game-start";
import { separateChars } from "./validations";

export const createBoard = (size) => {
  const board = {
    size: size,
    grid: {},
  };

  for (let i = 0; i < board.size; i++) {
    board.grid[alphabet[i]] = [];
    for (let j = 0; j < board.size; j++) {
      board.grid[alphabet[i]][j] = { type: "empty", id: 0, hit: false };
    }
  }

  return board;
};

export const printBoard = (board, debug = false) => {
  const gridDisplay = {};

  const displayCellType = (cell) => {
    const images = {
      second: () => (debug ? "🟠" : cell.hit ? "🟠" : "🔳"),
      first: () => (debug ? "🔵" : cell.hit ? "🔵" : "🔳"),
      empty: () => (debug ? (cell.hit ? "❗" : "🔳") : cell.hit ? "❗" : "🔳"),
    };
    return images[cell.type]();
  };

  for (const [col, row] of Object.entries(board.grid)) {
    gridDisplay[col] = row.map((cell) => displayCellType(cell));
  }

  return console.table(gridDisplay);
};

export const printBoards = (playerList, mode, debugMode = false) => {
  playerList.forEach((player) => {
    if (isGameTwoPlayers(mode)) console.log(`Player: ${player.playerNum}`);

    if (debugMode) console.log(`Player Ships: ${player.shipLocations}`);

    printBoard(player.board, debugMode);
  });
};

export const getCell = (board, strCoords) => {
  const [col, row] = separateChars(strCoords);
  return board.grid[col][row];
};

export const isCellOccupied = (board, str) => {
  const [col, row] = separateChars(str);
  return board.grid[col][row].type !== "empty";
};

export const setCell = (board, strCoords, cell) => {
  const [col, row] = separateChars(strCoords);
  return (board.grid[col][row] = cell);
};

export const getRandomCoords = (board, letters) => {
  let yCoord = letters[Math.floor(Math.random() * board.size)];
  let xCoord = Math.floor(Math.random() * board.size);
  return `${yCoord}${xCoord}`;
};
