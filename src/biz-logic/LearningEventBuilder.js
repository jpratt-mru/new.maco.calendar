import TimeUtilities from "./TimeUtilities";
/**
 *
 */

class LearningEventBuilder {
  constructor(id, csvRecord, startingMonday) {
    this.eventInProgress = {
      id,
      csvRecord,
      startingMonday,
      errors: [],
      warnings: [],
      isDisplayable: true
    };

    if (!TimeUtilities.validDate(startingMonday)) {
      this.eventInProgress.errors.push(
        `Provided startingMonday ${startingMonday} is malformed.`
      );
    } else if (!TimeUtilities.validMonday(startingMonday)) {
      this.eventInProgress.errors.push(
        `Provided starting Monday ${startingMonday} is not a Monday.`
      );
    }

    this.eventInProgress.isDisplayable = TimeUtilities.validMonday(
      startingMonday
    );
  }
}

export default LearningEventBuilder;
