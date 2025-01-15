const shipNames = [
  "Carrier",
  "Battleship",
  "Cruiser",
  "Submarine",
  "Destroyer",
];

class Ship {
  constructor(name, type, id, hitPoints) {
    name;
    type;
    id;
    hitPoints;
    this.isDestroyed = false;
    this.locations = [];
  }
}
