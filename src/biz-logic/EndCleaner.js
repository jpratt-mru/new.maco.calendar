import moment from "moment";

const UNKNOWN_VALUE_MARKER = "???";
const END_PROP_NAME = "end";
const END_TIME_PROP_NAME = "end-time";
const START_PROP_NAME = "start";

class EndCleaner {
  colonSplit = time => {
    return /^\d{1,2}:\d{1,2}$/.test(time);
  };

  calculatedEnd = (start, endTime) => {
    if (this.colonSplit(endTime)) {
      let isoString = moment(start).format("YYYY-MM-DD") + " " + endTime;
      return moment(isoString, "YYYY-MM-DD HH:mm").format();
    } else {
      return UNKNOWN_VALUE_MARKER;
    }
  };

  clean = obj => {
    if (
      !obj.hasOwnProperty(START_PROP_NAME) ||
      !obj.hasOwnProperty(END_TIME_PROP_NAME)
    ) {
      obj = Object.defineProperty(obj, END_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER,
        enumerable: true
      });
    } else {
      obj = Object.defineProperty(obj, END_PROP_NAME, {
        value: this.calculatedEnd(
          obj[START_PROP_NAME],
          obj[END_TIME_PROP_NAME]
        ),
        enumerable: true
      });
    }
    return obj;
  };
}

export default EndCleaner;
