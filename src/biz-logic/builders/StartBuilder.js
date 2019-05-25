import moment from "moment";
import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

class StartBuilder extends SecondaryCalculatedPropBuilder {
  static firstDayOfClassesInFirstFullWeek(startingMonday, startTime, dow) {
    const targetDayOfWeekAsNumber = StartBuilder.dayOfWeekAsNumber(dow);
    const isoString = `${startingMonday} ${startTime}`;

    let currDate = moment(isoString, "YYYY-MM-DD HH:mm");

    while (currDate.day() !== targetDayOfWeekAsNumber) {
      currDate.add(1, "day");
    }

    return currDate.format();
  }

  static dayOfWeekAsNumber(dow) {
    switch (dow) {
      case "monday":
      case "m":
        return 1;
      case "tuesday":
      case "t":
        return 2;
      case "wednesday":
      case "w":
        return 3;
      case "thursday":
      case "r":
        return 4;
      case "friday":
      case "f":
        return 5;
      case "saturday":
        return 6;
      default:
        return 0;
    }
  }

  static prerequisitesAreValid(prerequisites) {
    // as long as we've gotten this far, we'll have a valid
    // start-time and duration to work with
    const startingMonday = prerequisites[0];
    const dow = prerequisites[1];
    const startTime = prerequisites[2];
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
