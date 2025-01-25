export type CurrentPlayer = 1 | 2;
export type GameMode = "1-player" | "2-player";
export type PlayerType = "human" | "computer";
export type ShipType = "first" | "second";
export type ShipData = {
  name: string;
  id: number;
  length: number;
};

export type Board = {
  size: number;
  grid: Grid;
};

export type Grid = {
  [key: string]: Row;
};

export type Row = Cell[];

export type Cell = {
  type: "first" | "second" | "empty";
  id: number;
  hit: boolean;
};

export type DisplayGrid = {
  [key: string]: string[];
};
