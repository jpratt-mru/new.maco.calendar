import moment from "moment";

const UNKNOWN_VALUE_MARKER = "???";
const START_PROP_NAME = "start";
const START_TIME_PROP_NAME = "start-time";

class StartCleaner {
  constructor(startingMonday) {
    this.startingMonday = startingMonday;
  }

  firstDayOfClassesInFirstFullWeek = (startTime, dow) => {
    const targetDayOfWeekAsNumber = this.dayOfWeekAsNumber(dow);
    const isoString = `${this.startingMonday} ${startTime}`;
    let currDate = moment(isoString, "YYYY-MM-DD HH:mm");

    while (currDate.day() !== targetDayOfWeekAsNumber) {
      currDate.add(1, "day");
    }
    return currDate.format();
  };

  dayOfWeekAsNumber = dow => {
    switch (dow) {
      case "Monday":
      case "M":
        return 1;
      case "Tuesday":
      case "T":
        return 2;
      case "Wednesday":
      case "W":
        return 3;
      case "Thursday":
      case "R":
        return 4;
      case "Friday":
      case "F":
        return 5;
      case "Saturday":
        return 6;
      default:
        return 0;
    }
  };

  colonSplit = time => {
    return /^\d{1,2}:\d{1,2}$/.test(time);
  };

  calculatedStart = (startTime, dow) => {
    if (this.colonSplit(startTime) && this.startingMonday) {
      return this.firstDayOfClassesInFirstFullWeek(startTime, dow);
    } else {
      return UNKNOWN_VALUE_MARKER;
    }
  };

  clean = obj => {
    if (!obj.hasOwnProperty(START_TIME_PROP_NAME)) {
      obj = Object.defineProperty(obj, START_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER,
        enumerable: true
      });
    } else {
      obj = Object.defineProperty(obj, START_PROP_NAME, {
        value: this.calculatedStart(obj[START_TIME_PROP_NAME], obj["dow"]),
        enumerable: true
      });
    }
    return obj;
  };
}

export default StartCleaner;
