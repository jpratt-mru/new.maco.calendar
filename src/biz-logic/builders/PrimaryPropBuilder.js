import LearningEvent from "../LearningEvent";

class PrimaryPropBuilder {
  constructor(propName, isValid) {
    this.propName = propName;
    this.isValid = isValid;
  }

  addTo(builder) {
    this.eventInProgress = builder.eventInProgress;
    const propValue = this.eventInProgress.csvRecord[this.propName];
    const eventInProgress = this.eventInProgress;

    if (!propValue) {
      eventInProgress.errors.push(
        `Missing required field **${this.propName}**.`
      );
      eventInProgress.isDisplayable = false;
    } else if (!this.isValid(propValue)) {
      eventInProgress.errors.push(
        `Malformed ${this.propName} field value: **${propValue}**.`
      );
      eventInProgress.isDisplayable = false;
    } else {
      eventInProgress[this.propName] = propValue;
      eventInProgress.isDisplayable = eventInProgress.isDisplayable && true;
    }
    return this;
  }

  build() {
    return new LearningEvent(this.eventInProgress);
  }
}

export default PrimaryPropBuilder;
