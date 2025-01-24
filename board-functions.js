import { debug } from "./game-start";

const createBoard = (size) => {
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

export const printBoard = () => {
  const gridDisplay = {};

  const displayCellType = (cell) => {
    const images = {
      first: () => (cell.hit ? "🔴" : debug ? "🔵" : "🔳"),
      second: () => (cell.hit ? "🔴" : debug ? "🟢" : "🔳"),
      empty: () => (cell.hit ? "❗" : debug ? "🔳" : "🔳"),
    };

    return images[cell.type]();
  };

  for (const [col, row] of Object.entries(board.grid)) {
    gridDisplay[col] = row.map((cell) => displayCellType(cell));
  }

  return console.table(gridDisplay);
};

const printBoards = (playerList, mode, debugMode = false) => {
  console.log("=".repeat(100));
  console.log(
    `${textColors["cyan"]}${mode.toUpperCase()} Mode!${textColors["default"]}`
  );
  console.log("=".repeat(100));
  playerList.forEach((player) => {
    if (isGameTwoPlayers(mode)) {
      const isPlayerOne = player.playerNum === 1;
      const boardMessage = `${
        isPlayerOne ? textColors["green"] : textColors["cyan"]
      }Player: ${player.playerNum} ${
        isPlayerOne ? textColors["green"] : textColors["cyan"]
      }${textColors["default"]}`;
      console.log(boardMessage);
    }

    if (debugMode)
      console.log(
        `Player Ships: ${textColors["magenta"]}${JSON.stringify(
          player.shipLocations
        )}${textColors["default"]}\n`
      );

    printBoard(player.board, debugMode);
  });
};

const getCell = (board, strCoords) => {
  const [col, row] = separateChars(strCoords);
  return board.grid[col][row];
};

const isCellOccupied = (board, str) => {
  const [col, row] = separateChars(str);
  return board.grid[col][row].type !== "empty";
};

const setCell = (board, strCoords, cell) => {
  const [col, row] = separateChars(strCoords);
  return (board.grid[col][row] = cell);
};

const getRandomCoords = (board, letters) => {
  let yCoord = letters[Math.floor(Math.random() * board.size)];
  let xCoord = Math.floor(Math.random() * board.size);
  return `${yCoord}${xCoord}`;
};
