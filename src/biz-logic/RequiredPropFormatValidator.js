import TimeUtilities from "./TimeUtilities";

class RequiredPropFormatValidator {
  errorsWith = record => {
    const errors = [];

    if (!this.validStartTime(record)) {
      errors.push(
        `Malformed start-time field value: **${record["start-time"]}**.`
      );
    }

    if (!this.validDuration(record)) {
      errors.push(`Malformed duration field value: **${record["duration"]}**.`);
    }

    return errors;
  };

  validStartTime = record => {
    const startTimeInRecord = record["start-time"];
    return startTimeInRecord
      ? TimeUtilities.validTime(startTimeInRecord)
      : false;
  };

  validDuration = record => {
    const durationInRecord = record["duration"];
    return durationInRecord
      ? TimeUtilities.validDuration(durationInRecord)
      : false;
  };
}

export default RequiredPropFormatValidator;
