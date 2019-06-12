import moment from "moment";
import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";
import TimeUtilities from "../TimeUtilities";

/**
 * "End" refers to the ending date-time of a given learning event.
 *
 * I'd have called it something a tad more precise (like LearningEventEndTime),
 * but fullcalendar just calls this property "end", so there we are.
 */
class EndBuilder extends SecondaryCalculatedPropBuilder {
  static prerequisitesAreValid(prerequisites) {
    // as long as we've gotten this far, we'll have a valid
    // startingtime and duration to work with
    const [start, duration] = prerequisites;

    return start && duration;
  }

  static propCalculatedFrom(prerequisites) {
    const [start, duration] = prerequisites;
    const [hours, mins] = duration.split(":");

    // we take off 10 minutes because the original
    // spreadsheets the CSVs are created from
    // don't use the "real" times of 50 minutes,
    // 80 minutes
    const endTime = moment(start)
      .add(hours, "hours")
      .add(mins, "minutes")
      .subtract(10, "minutes");

    return TimeUtilities.formattedTime(endTime);
  }

  constructor() {
    super(
      "end",
      EndBuilder.prerequisitesAreValid,
      EndBuilder.propCalculatedFrom,
      "start",
      "duration"
    );
  }
}

export default EndBuilder;
