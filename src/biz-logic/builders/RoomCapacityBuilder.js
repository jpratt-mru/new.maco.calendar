import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";
import Rooms from "../Rooms";

/**
 * Room capacities are calculated from the room (there's a lookup
 * going on behind the scenes in `Rooms.js` and its
 * associated `biz-data/campusRooms.js` data file if you want to
 * see where the room capacities actually come from).
 */
class RoomCapacityBuilder extends SecondaryCalculatedPropBuilder {
  /**
   * The prerequisite for a room capacity is a room.
   *
   * @param {*} propValue
   */
  static prerequisitesAreValid(prerequisites) {
    const room = prerequisites[0];
    return room !== "???";
  }

  /**
   * Just as Rooms() what the capacity is...it will be 0 if the room isn't found.
   *
   * @param {*} prerequisites
   */
  static propCalculatedFrom(prerequisites) {
    const room = prerequisites[0];
    return Rooms.capacityFor(room);
  }

  constructor() {
    super(
      "roomCapacity",
      RoomCapacityBuilder.prerequisitesAreValid,
      RoomCapacityBuilder.propCalculatedFrom,
      "room"
    );
  }
}

export default RoomCapacityBuilder;
