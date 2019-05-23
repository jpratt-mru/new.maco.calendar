import moment from "moment";
import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

class EndBuilder extends SecondaryCalculatedPropBuilder {
  static prerequisitesAreValid(prerequisites) {
    // as long as we've gotten this far, we'll have a valid
    // start-time and duration to work with
    const start = prerequisites[0];
    const duration = prerequisites[1];

    return start && duration;
  }

  static propCalculatedFrom(prerequisites) {
    const start = prerequisites[0];
    const duration = prerequisites[1];

    const [hours, mins] = duration.split(":");

    const endTime = moment(start)
      .add(hours, "hours")
      .add(mins, "minutes")
      .subtract(10, "minutes")
      .format("H:mm");

    let isoString = moment(start).format("YYYY-MM-DD") + " " + endTime;
    return moment(isoString, "YYYY-MM-DD HH:mm").format();
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
