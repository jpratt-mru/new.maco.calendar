import LearningEvent from "../LearningEvent";

class SecondaryBasePropBuilder {
  constructor(propName, isValid, formattedValue) {
    this.propName = propName;
    this.isValid = isValid;
    this.formattedValue = formattedValue;
  }

  addTo(builder) {
    this.eventInProgress = builder.eventInProgress;
    const propValue = this.eventInProgress.csvRecord[this.propName];
    const eventInProgress = this.eventInProgress;

    eventInProgress.isDisplayable = true && eventInProgress.isDisplayable;
    eventInProgress[this.propName] = "???";

    if (!propValue) {
      eventInProgress.warnings.push(
        `Missing field **${this.propName}**, ??? added instead.`
      );
    } else if (!this.isValid(propValue)) {
      eventInProgress.warnings.push(
        `Malformed ${
          this.propName
        } field value: **${propValue}**, ??? added instead.`
      );
    } else {
      eventInProgress[this.propName] = this.formattedValue(propValue);
    }
    return this;
  }

  build() {
    return new LearningEvent(this.eventInProgress);
  }
}

export default SecondaryBasePropBuilder;
