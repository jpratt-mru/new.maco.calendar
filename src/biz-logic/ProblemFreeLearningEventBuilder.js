import LearningEvent from "./LearningEvent";

class ProblemFreeLearningEventBuilder {
  constructor(csvRecord, errors, warnings) {}

  withCourse = () => {
    this.course = "compxxxx";
    return this;
  };

  build = () => {
    return new LearningEvent(this);
  };
}

export default ProblemFreeLearningEventBuilder;
