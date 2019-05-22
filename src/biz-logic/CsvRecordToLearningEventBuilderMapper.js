import LearningEventWithErrorsBuilder from "./LearningEventWithErrorsBuilder";
import LearningEventWithWarningsBuilder from "./LearningEventWithWarningsBuilder";
import ProblemFreeLearningEventBuilder from "./ProblemFreeLearningEventBuilder";
import TimeUtilities from "./TimeUtilities";

class CsvRecordToLearningEventBuilderMapper {
  constructor(
    firstMondayOfSemester,
    requiredPropPresenceValidator,
    requiredPropFormatValidator,
    optionalBasePropFormatValidator,
    optionalCalculatedPropFormatValidator
  ) {
    this.firstMondayOfSemester = firstMondayOfSemester;
    this.requiredPropPresenceValidator = requiredPropPresenceValidator;
    this.requiredPropFormatValidator = requiredPropFormatValidator;
    this.optionalBasePropFormatValidator = optionalBasePropFormatValidator;
    this.optionalCalculatedPropFormatValidator = optionalCalculatedPropFormatValidator;
    this.validFirstMondayPresent = TimeUtilities.validMonday(
      firstMondayOfSemester
    );
  }
  mapToBuilder = (record, id) => {
    const recordWithLowercaseProps = Object.fromEntries(
      Object.entries(record).map(([k, v]) => [k.toLowerCase(), v])
    );

    const recordWithId = Object.defineProperty(recordWithLowercaseProps, "id", {
      value: id,
      enumerable: true
    });

    const errors = this.errorsIn(recordWithId);
    const warnings = this.warningsIn(recordWithId);

    if (errors.length > 0) {
      return new LearningEventWithErrorsBuilder(recordWithId, errors, warnings);
    }
    if (warnings.length > 0) {
      return new LearningEventWithWarningsBuilder(
        recordWithId,
        errors,
        warnings
      );
    }
    return new ProblemFreeLearningEventBuilder(recordWithId, errors, warnings);
  };

  errorsIn = record => {
    let errors = [];
    if (!this.validFirstMondayPresent) {
      errors.push(
        `Invalid first Monday of semester found: ${this.firstMondayOfSemester}`
      );
    }

    const missingPropErrors = this.requiredPropPresenceValidator.errorsWith(
      record
    );

    if (missingPropErrors.length > 0) {
      return errors.concat(...missingPropErrors);
    }

    const malformedPropErrors = this.requiredPropFormatValidator.errorsWith(
      record
    );

    if (malformedPropErrors.length > 0) {
      return errors.concat(...malformedPropErrors);
    }

    return errors;
  };

  warningsIn = record => {
    let warnings = [];

    const optionalBasePropWarnings = this.optionalBasePropFormatValidator.warningsWith(
      record
    );
    const optionalCalculatedPropWarnings = this.optionalCalculatedPropFormatValidator.warningsWith(
      record
    );

    if (optionalBasePropWarnings.length > 0) {
      return warnings.concat(...optionalBasePropWarnings);
    }

    if (optionalCalculatedPropWarnings.length > 0) {
      return warnings.concat(...optionalCalculatedPropWarnings);
    }

    return warnings;
  };
}

export default CsvRecordToLearningEventBuilderMapper;
