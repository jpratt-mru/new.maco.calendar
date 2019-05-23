import LearningEvent from "./LearningEvent";

class SecondaryCalculatedPropBuilder {
  constructor(
    propName,
    prerequisitesAreValid,
    propCalculatedFrom,
    ...prerequisitePropNames
  ) {
    console.log("making propName", propName);
    console.log("incoming to constructor", prerequisitePropNames);
    this.propName = propName;
    this.prerequisitePropNames = prerequisitePropNames;
    this.prerequisitesAreValid = prerequisitesAreValid;
    this.propCalculatedFrom = propCalculatedFrom;
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

    this[this.propName] = "???";
    let prerequisiteProps = [];
    this.prerequisitePropNames.forEach(prereqName => {
      console.log("pushing", prereqName);
      prerequisiteProps.push(this[prereqName]);
      console.log("after push", prerequisiteProps);
    });

    if (prerequisiteProps.length == 0) {
      this.warnings.push(
        `Missing prerequisite properties needed to build **${
          this.propName
        }**, ??? added instead.`
      );
    } else if (!this.prerequisitesAreValid(prerequisiteProps)) {
      this.warnings.push(
        `Unable to build **${this.propName} from ${
          this.prerequisitePropNames
        }, ??? added instead.`
      );
    } else {
      this[this.propName] = this.propCalculatedFrom(prerequisiteProps);
    }
    return this;
  }

  build() {
    return new LearningEvent(this);
  }
}

export default SecondaryCalculatedPropBuilder;
