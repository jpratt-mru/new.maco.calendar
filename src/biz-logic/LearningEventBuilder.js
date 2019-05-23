import TimeUtilities from "./TimeUtilities";
/**
 *
 */

class LearningEventBuilder {
  constructor(id, csvRecord, startingMonday) {
    this.id = id;
    this.csvRecord = csvRecord;
    this.startingMonday = startingMonday;

    this.errors = [];
    this.warnings = [];

    if (!TimeUtilities.validDate(startingMonday)) {
      this.errors.push(
        `Provided startingMonday ${startingMonday} is malformed.`
      );
    } else if (!TimeUtilities.validMonday(startingMonday)) {
      this.errors.push(
        `Provided starting Monday ${startingMonday} is not a Monday.`
      );
    }

    this.canBuildDisplayableEvent = TimeUtilities.validMonday(startingMonday);
  }
}

export default LearningEventBuilder;
