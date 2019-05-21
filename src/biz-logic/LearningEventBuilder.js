import LearningEvent from "./LearningEvent";

class LearningEventBuilder {
  withCourse = () => {};

  build = () => {
    return new LearningEvent(this);
  };
}

export default LearningEventBuilder;
