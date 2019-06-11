import { campusRooms } from "./campusRooms";
class Rooms {
  constructor(rooms = campusRooms) {
    this.map = new Map(rooms);
  }

  canAccommodate(learningEvent) {
    const room = learningEvent.room.toUpperCase();
    if (!this.map.has(room)) {
      return true;
    } else {
      return this.map.get(room) >= learningEvent["sectioncapacity"];
    }
  }

  capacityFor(room) {
    const key = room.toUpperCase();
    if (!this.map.has(key)) {
      return "unknown";
    } else {
      return this.map.get(key);
    }
  }
}

export default Rooms;
