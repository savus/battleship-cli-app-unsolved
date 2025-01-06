export const printBoard = (board, debug) => {
  const displayCellType = (cell) => {
    switch (cell.type) {
      case "large":
        return "🟠";
      case "small":
        return "🔵";
      default:
        return "❗";
    }
  };

  return board.map((row) =>
    row.map((cell) => {
      if (debug) {
        return displayCellType(cell);
      } else {
        if (!cell.hit) {
          return "--";
        } else {
          return displayCellType(cell);
        }
      }
    })
  );
};
