import LearningEvent from "./LearningEvent";

class PrimaryPropBuilder {
  constructor(propName, isValid) {
    this.propName = propName;
    this.isValid = isValid;
  }

  addTo(builder) {
    for (let key in builder) {
      if (key !== "propName") {
        const incomingKey = builder[key];
        if (Array.isArray(incomingKey)) {
          this[key] = [...incomingKey];
        } else if (typeof incomingKey !== "function") {
          this[key] = incomingKey;
        }
      }
    }

    const propValue = this.csvRecord[this.propName];

    if (!propValue) {
      this.errors.push(`Missing required field **${this.propName}**.`);
      this.canBuildDisplayableEvent = false;
    } else if (!this.isValid(propValue)) {
      this.errors.push(
        `Malformed ${this.propName} field value: **${propValue}**.`
      );
      this.canBuildDisplayableEvent = false;
    } else {
      this[this.propName] = propValue;
      this.canBuildDisplayableEvent = this.canBuildDisplayableEvent && true;
    }
    return this;
  }

  build() {
    return new LearningEvent(this);
  }
}

export default PrimaryPropBuilder;
