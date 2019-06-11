import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";
import Rooms from "../Rooms";

class RoomCapacityBuilder extends SecondaryCalculatedPropBuilder {
  static prerequisitesAreValid(prerequisites) {
    const room = prerequisites[0];
    return room !== "???";
  }

  static propCalculatedFrom(prerequisites) {
    const room = prerequisites[0];
    return new Rooms().capacityFor(room);
  }

  constructor() {
    super(
      "roomcapacity",
      RoomCapacityBuilder.prerequisitesAreValid,
      RoomCapacityBuilder.propCalculatedFrom,
      "room"
    );
  }
}

export default RoomCapacityBuilder;
