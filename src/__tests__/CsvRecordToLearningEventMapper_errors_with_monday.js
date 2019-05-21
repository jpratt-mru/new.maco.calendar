import CsvRecordToLearningEventBuilderMapper from "../biz-logic/CsvRecordToLearningEventBuilderMapper";
import RequiredPropPresenceValidator from "../biz-logic/RequiredPropPresenceValidator";
import RequiredPropFormatValidator from "../biz-logic/RequiredPropFormatValidator";

const requiredPropPresenceValidator = new RequiredPropPresenceValidator();
const requiredPropFormatValidator = new RequiredPropFormatValidator();

describe("a mapper will return a LearningEventWithErrorsBuilder when there are errors the first Monday date provided", () => {
  test("given firstMondayOfSemester is not a recognized date format", () => {
    const mapper = new CsvRecordToLearningEventBuilderMapper(
      "blorb",
      requiredPropPresenceValidator,
      requiredPropFormatValidator
    );
    const builder = mapper.mapToBuilder({}, 1);
    expect(builder.getClassName()).toEqual("LearningEventWithErrorsBuilder");
  });

  test("given firstMondayOfSemester is not a Monday", () => {
    const mapper = new CsvRecordToLearningEventBuilderMapper(
      "2019-05-21",
      requiredPropPresenceValidator,
      requiredPropFormatValidator
    );
    const builder = mapper.mapToBuilder({}, 1);
    expect(builder.getClassName()).toEqual("LearningEventWithErrorsBuilder");
  });
});
