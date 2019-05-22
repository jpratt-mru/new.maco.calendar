class OptionalBasePropFormatValidator {
  warningsWith = record => {
    const warnings = ["thats poopy"];
    if (!this.hasValidCourse(record)) {
      warnings.push(
        `Malformed start-time field value: **${record["start-time"]}**.`
      );
    }
    return warnings;
  };
}

export default OptionalBasePropFormatValidator;
