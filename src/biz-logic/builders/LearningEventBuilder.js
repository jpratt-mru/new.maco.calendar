import TimeUtilities from "../TimeUtilities";
/**
 *
 */

class LearningEventBuilder {
  constructor(id, csvRecord, startingMonday) {
    this.eventInProgress = {
      id,
      csvRecord,
      startingMonday,
      missing: [],
      malformed: [],
      isDisplayable: true
    };

    if (!TimeUtilities.validDate(startingMonday)) {
      throw `Provided startingMonday ${startingMonday} is malformed.`;
    } else if (!TimeUtilities.validMonday(startingMonday)) {
      throw `Provided starting Monday ${startingMonday} is not a Monday.`;
    }

    this.eventInProgress.isDisplayable = TimeUtilities.validMonday(
      startingMonday
    );
  }
}

export default LearningEventBuilder;
