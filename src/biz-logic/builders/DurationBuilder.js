import TimeUtilities from "../TimeUtilities";
import PrimaryPropBuilder from "./PrimaryPropBuilder";
/**
 * Every Learning Event needs a duration; otherwise, it can't be displayed on
 * a calendar. (Well, I guess it could be an all day event, but screw those guys).
 *
 * So what we'll do here is make sure that:
 *   1) there actually *is* a duration property to access, and
 *   2) if so, it is a valid duration.
 */
class DurationBuilder extends PrimaryPropBuilder {
  constructor() {
    super("duration", TimeUtilities.validDuration);
  }
}

export default DurationBuilder;
