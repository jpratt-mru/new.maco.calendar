class Rooms {
  constructor(rooms = KNOWN_ROOMS) {
    this.map = new Map(rooms);
  }

  canAccommodate(learningEvent) {
    const room = learningEvent.room;
    if (!this.map.has(room)) {
      return true;
    } else {
      return this.map.get(room) >= learningEvent["section-capacity"];
    }
  }

  capacityFor(room) {
    if (!this.map.has(room)) {
      return "unknown";
    } else {
      return this.map.get(room);
    }
  }
}

export default Rooms;

const KNOWN_ROOMS = [
  ["b107", 25],
  ["b160", 16],
  ["b162", 29],
  ["b173", 14],
  ["b215", 24],
  ["e203", 40]
];
