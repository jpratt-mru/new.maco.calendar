import LearningEvent from "./LearningEvent";

class SecondaryBasePropBuilder {
  constructor(propName, isValid, formattedValue) {
    this.propName = propName;
    this.isValid = isValid;
    this.formattedValue = formattedValue;
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

    this.canBuildDisplayableEvent = true && this.canBuildDisplayableEvent;
    const propValue = this.csvRecord[this.propName];
    this[this.propName] = "???";

    if (!propValue) {
      this.warnings.push(
        `Missing field **${this.propName}**, ??? added instead.`
      );
    } else if (!this.isValid(propValue)) {
      this.warnings.push(
        `Malformed ${
          this.propName
        } field value: **${propValue}**, ??? added instead.`
      );
    } else {
      this[this.propName] = this.formattedValue(propValue);
    }
    return this;
  }

  build() {
    return new LearningEvent(this);
  }
}

export default SecondaryBasePropBuilder;
