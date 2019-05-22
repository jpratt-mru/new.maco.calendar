import LearningEvent from "./LearningEvent";

class LearningEventWithWarningsBuilder {
  static getClassName = () => {
    return "LearningEventWithWarningsBuilder";
  };

  constructor(record, errors, warning) {
    this.record = record;
    this.errors = errors;
    this.warning = warning;
  }

  getClassName = () => {
    return LearningEventWithWarningsBuilder.getClassName();
  };

  withCourse = () => {
    return this;
  };

  build = () => {
    return new LearningEvent(this);
  };
}

export default LearningEventWithWarningsBuilder;
