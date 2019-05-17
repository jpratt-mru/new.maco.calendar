import moment from "moment";

const UNKNOWN_VALUE_MARKER = "???";
const END_TIME_PROP_NAME = "end-time";
const START_TIME_PROP_NAME = "start-time";
const DURATION_PROP_NAME = "duration";

class EndTimeCleaner {
  colonSplit = time => {
    return /^\d{1,2}:\d{1,2}$/.test(time);
  };

  calculatedEndTime = (startTime, duration) => {
    if (this.colonSplit(startTime) && this.colonSplit(duration)) {
      const [hours, mins] = duration.split(":");

      return moment(startTime, "HH:mm")
        .add(hours, "hours")
        .add(mins, "minutes")
        .subtract(10, "minutes")
        .format("H:mm");
    } else {
      return UNKNOWN_VALUE_MARKER;
    }
  };

  clean = obj => {
    if (
      !obj.hasOwnProperty(START_TIME_PROP_NAME) ||
      !obj.hasOwnProperty(DURATION_PROP_NAME)
    ) {
      obj = Object.defineProperty(obj, END_TIME_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER,
        enumerable: true
      });
    } else {
      obj = Object.defineProperty(obj, END_TIME_PROP_NAME, {
        value: this.calculatedEndTime(
          obj[START_TIME_PROP_NAME],
          obj[DURATION_PROP_NAME]
        ),
        enumerable: true
      });
    }
    return obj;
  };
}

export default EndTimeCleaner;
