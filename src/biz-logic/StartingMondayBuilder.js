import TimeUtilities from "./TimeUtilities";
import PrimaryPropBuilder from "./PrimaryPropBuilder";
/**
 * Every Learning Event needs a start time; otherwise, it can't be displayed on
 * a calendar. (Well, I guess it could be an all day event, but screw those guys).
 *
 * So what we'll do here is make sure that:
 *   1) there actually *is* a start-time property to access, and
 *   2) if so, it is a valid 24-hour time.
 */
class StartTimeBuilder {
  static create = () => {
    return new PrimaryPropBuilder("start-time", TimeUtilities.validTime);
  };
}

export default StartTimeBuilder;
