import { campusRooms } from "./biz-data/campusRooms";
class Rooms {
  static map = null; // set up for lazy initialization

  /**
   * If we can find the room in our campusRooms, then we
   * can accommodate the learningEvent if the room capacity
   * is >= the section capacity.
   *
   * If we can't find the room given by the learningEvent,
   * then we can't accommodate the event.
   *
   * @param {*} learningEvent
   */
  static canAccommodate(learningEvent) {
    Rooms.map = Rooms.map || new Map(campusRooms);

    const room = learningEvent.room.toUpperCase();

    return Rooms.map.has(room)
      ? Rooms.map.get(room) >= learningEvent.sectionCapacity
      : false;
  }

  static capacityFor(room) {
    Rooms.map = Rooms.map || new Map(campusRooms);

    const upcasedRoom = room.toUpperCase();

    return Rooms.map.has(upcasedRoom) ? Rooms.map.get(upcasedRoom) : 0;
  }
}

export default Rooms;
