const testBoard1 = [
  [
    { type: "large", id: 1, hit: true }, // Represents position A0
    { type: "small", id: 2, hit: true }, // Represents position A1
    { type: "small", id: 2, hit: false }, // Represents position A2
  ],
  [
    { type: "large", id: 1, hit: true }, // Represents position B0
    { type: "empty", hit: false }, // Represents position B1
    { type: "empty", hit: true }, // Represents position B2
  ],
  [
    { type: "large", id: 1, hit: true }, // Represents position C0
    { type: "empty", hit: false }, // Represents position C1
    { type: "empty", hit: false }, // Represents position C2
  ],
];

const display = testBoard1.map((row) =>
  row.map((cell) => {
    if (cell.type === "empty") {
      return cell.hit ? "❗" : "--";
    } else {
      if (cell.type === "large") {
        return cell.hit ? "🟠" : "--";
      } else {
        return cell.hit ? "🔵" : "--";
      }
    }
  })
);

console.table(display);
