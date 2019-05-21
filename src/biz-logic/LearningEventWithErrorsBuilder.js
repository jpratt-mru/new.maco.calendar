import LearningEvent from "./LearningEvent";

class LearningEventWithErrorsBuilder {
  static getClassName = () => {
    return "LearningEventWithErrorsBuilder";
  };

  constructor(record, errors, warning) {
    this.record = record;
    this.errors = errors;
    this.warning = warning;
  }

  getClassName = () => {
    return LearningEventWithErrorsBuilder.getClassName();
  };

  withCourse = () => {
    return this;
  };

  build = () => {
    return new LearningEvent(this);
  };
}

export default LearningEventWithErrorsBuilder;
