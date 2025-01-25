export type CurrentPlayer = 1 | 2;
export type GameMode = "1-player" | "2-player";
export type ShipType = "first" | "second";
export type ShipData = {
  name: string;
  id: number;
  length: number;
};

export type Board = {
  size: number;
  grid: {};
};
