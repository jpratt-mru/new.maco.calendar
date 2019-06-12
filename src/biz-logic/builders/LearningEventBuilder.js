import TimeUtilities from "../TimeUtilities";
/**
 * This is creates the seed that the LearningEvent building
 * process grows from.
 *
 * What we've got here is an inital property called "eventInProgress" -
 * which is just a plain ole JS object with the basic properties
 * needed to build an event.
 *
 * If we're not given a valid starting Monday - the day of the
 * first Monday of the first full week of classes - then we
 * can't build a displayable event, but we'll just error out
 * to console and keep going.
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
      console.error(`Provided startingMonday ${startingMonday} is malformed.`);
    } else if (!TimeUtilities.validMonday(startingMonday)) {
      console.error(
        `Provided starting Monday ${startingMonday} is not a Monday.`
      );
    }

    this.eventInProgress.isDisplayable = TimeUtilities.validMonday(
      startingMonday
    );
  }
}

export default LearningEventBuilder;
