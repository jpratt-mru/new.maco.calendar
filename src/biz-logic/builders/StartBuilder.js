import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";
import TimeUtilities from "../TimeUtilities";

/**
 * "Start" refers to the starting date-time of a given learning event.
 *
 * Actually, to be more precise, it refers to that starting time for the
 * **first** day on or after the Monday of the first full week of classes!
 * That's why startingMonday, dow, and startingTime are all involved.
 *
 * I'd have called it something a tad more precise (like LearningEventStartTime),
 * but fullcalendar just calls this property "start", so there we are.
 */
class StartBuilder extends SecondaryCalculatedPropBuilder {
  static prerequisitesAreValid(prerequisites) {
    // as long as we've gotten this far, we'll have a valid
    // startingTime and duration to work with
    const [startingMonday, dow, startTime] = prerequisites;

    return startingMonday && dow && startTime;
  }

  static propCalculatedFrom(prerequisites) {
    const startingMonday = prerequisites[0];
    const dow = prerequisites[1];
    const startTime = prerequisites[2];
    return TimeUtilities.firstDayOfClassesInFirstFullWeek(
      startingMonday,
      startTime,
      dow
    );
  }

  constructor() {
    super(
      "start",
      StartBuilder.prerequisitesAreValid,
      StartBuilder.propCalculatedFrom,
      "startingMonday",
      "dow",
      "startingTime"
    );
  }
}

export default StartBuilder;
