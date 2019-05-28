import moment from "moment";
import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";
import TimeUtilities from "../TimeUtilities";

class StartBuilder extends SecondaryCalculatedPropBuilder {
  static firstDayOfClassesInFirstFullWeek(startingMonday, startTime, dow) {
    const targetDayOfWeekAsNumber = TimeUtilities.dayOfWeekAsNumber(dow);
    const isoString = `${startingMonday} ${startTime}`;

    let currDate = moment(isoString, "YYYY-MM-DD HH:mm");

    while (currDate.day() !== targetDayOfWeekAsNumber) {
      currDate.add(1, "day");
    }

    return TimeUtilities.formattedTime(currDate);
  }

  static prerequisitesAreValid(prerequisites) {
    // as long as we've gotten this far, we'll have a valid
    // start-time and duration to work with
    const [startingMonday, dow, startTime] = prerequisites;

    return startingMonday && dow && startTime;
  }

  static propCalculatedFrom(prerequisites) {
    const startingMonday = prerequisites[0];
    const dow = prerequisites[1];
    const startTime = prerequisites[2];
    return StartBuilder.firstDayOfClassesInFirstFullWeek(
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
      "start-time"
    );
  }
}

export default StartBuilder;
