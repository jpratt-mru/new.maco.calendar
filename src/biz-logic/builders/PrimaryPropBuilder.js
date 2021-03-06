import LearningEvent from "../LearningEvent";

class PrimaryPropBuilder {
  /**
   *
   * @param {string} propName
   * @param {function} isValid
   */
  constructor(propName, isValid) {
    this.propName = propName;
    this.isValid = isValid;
  }

  addTo(builder) {
    this.eventInProgress = builder.eventInProgress;
    const propValue = this.eventInProgress.csvRecord[
      this.propName.toLowerCase()
    ];

    const eventInProgress = this.eventInProgress;

    if (!propValue) {
      eventInProgress.missing.push(this.propName);
      eventInProgress.isDisplayable = false;
    } else if (!this.isValid(propValue)) {
      eventInProgress.malformed.push(this.propName);
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
