import CsvRecordToLearningEventBuilderMapper from "./CsvRecordToLearningEventBuilderMapper";
import RequiredPropPresenceValidator from "../biz-logic/RequiredPropPresenceValidator";
import RequiredPropFormatValidator from "../biz-logic/RequiredPropFormatValidator";

class LearningEvents {
  learningEvents = [];

  constructor(csvRecords, firstMondayOfSemester) {
    const mapper = new CsvRecordToLearningEventBuilderMapper(
      firstMondayOfSemester,
      new RequiredPropPresenceValidator(),
      new RequiredPropFormatValidator()
    );
    console.log("mapper: ", mapper);
    csvRecords.forEach((record, index) => {
      const id = index + 2;
      const builder = mapper.mapToBuilder(record, id);
      console.log("builder: ", builder);
      const builtLearningEvent = builder.withCourse().build();
      console.log("builtEvent: ", builtLearningEvent);
      this.learningEvents.push(builtLearningEvent);
    });
  }

  events = () => {
    return [...this.learningEvents];
  };
}

export default LearningEvents;
