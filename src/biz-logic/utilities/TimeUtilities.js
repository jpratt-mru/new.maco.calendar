import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

class TimeUtilities {
  static validMonday(text) {
    const momentedText = moment(text, "YYYY-MM-DD");
    return momentedText.isValid() && momentedText.day() == 1;
  }

  static validDate(text) {
    const momentedText = moment(text, "YYYY-MM-DD");
    return momentedText.isValid();
  }

  static validTime(text) {
    const validTimeRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return validTimeRegex.test(text);
  }

  static validDuration(text) {
    const validDurationRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return validDurationRegex.test(text);
  }

  static formattedTime(momentTimeObject) {
    return moment(momentTimeObject, "YYYY-MM-DD HH:mm").format();
  }

  /**
   * Returns the formatted starting date/time `moment` object (see `formattedTime()`) of
   * a class on its first class in the first full week of a semester.
   *
   * For example, if you have a class that runs on Thursdays at 9AM,
   * and the first FULL week of classes starts on Sept. 8, then this
   * function will give you a `moment` object that's YYYY-09-11 09:00.
   *
   * @param {*} startingMonday
   * @param {*} startTime
   * @param {*} dow
   */
  static startOfClassInFirstFullWeek(startingMonday, startTime, dow) {
    const targetDayOfWeekAsNumber = TimeUtilities.dayOfWeekAsNumber(dow);
    const isoString = `${startingMonday} ${startTime}`;

    let currDate = moment(isoString, "YYYY-MM-DD HH:mm");

    // keep stepping forward from the Monday until you hit
    // the given dow
    while (currDate.day() !== targetDayOfWeekAsNumber) {
      currDate.add(1, "day");
    }

    return TimeUtilities.formattedTime(currDate);
  }

  static timeConflictExistsBetween(eventOne, eventTwo) {
    const eventOneRangeStart = moment(eventOne.start);
    const eventOneRangeEnd = moment(eventOne.end);
    const eventOneRange = moment.range(eventOneRangeStart, eventOneRangeEnd);

    const eventTwoRangeStart = moment(eventTwo.start);
    const eventTwoRangeEnd = moment(eventTwo.end);
    const eventTwoRange = moment.range(eventTwoRangeStart, eventTwoRangeEnd);

    return eventOneRange.overlaps(eventTwoRange);
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
}

export default TimeUtilities;
