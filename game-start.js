const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const testBoard1 = {
  grid: {
    A: [
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
    ],
    B: [
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
    ],
    C: [
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
      { type: "large", id: 1, hit: true },
    ],
  },
};

console.table(testBoard1.grid);
