import LearningEvent from "./LearningEvent";

class SecondaryCalculatedPropBuilder {
  constructor(
    propName,
    prerequisitesAreValid,
    propCalculatedFrom,
    ...prerequisitePropNames
  ) {
    this.propName = propName;
    this.prerequisitePropNames = prerequisitePropNames;
    this.prerequisitesAreValid = prerequisitesAreValid;
    this.propCalculatedFrom = propCalculatedFrom;
  }

  addTo(builder) {
    this.eventInProgress = builder.eventInProgress;
    const eventInProgress = this.eventInProgress;

    eventInProgress.isDisplayable = true && eventInProgress.isDisplayable;
    eventInProgress[this.propName] = "???";

    let prerequisiteProps = [];
    this.prerequisitePropNames.forEach(prereqName => {
      prerequisiteProps.push(eventInProgress[prereqName]);
    });

    if (prerequisiteProps.length == 0) {
      eventInProgress.warnings.push(
        `Missing prerequisite properties needed to build **${
          this.propName
        }**, ??? added instead.`
      );
    } else if (!this.prerequisitesAreValid(prerequisiteProps)) {
      eventInProgress.warnings.push(
        `Unable to build **${this.propName} from ${
          this.prerequisitePropNames
        }, ??? added instead.`
      );
    } else {
      eventInProgress[this.propName] = this.propCalculatedFrom(
        prerequisiteProps
      );
    }
    return this;
  }

  build() {
    return new LearningEvent(this.eventInProgress);
  }
}

export default SecondaryCalculatedPropBuilder;
