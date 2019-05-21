import CsvRecordToLearningEventBuilderMapper from "../biz-logic/CsvRecordToLearningEventBuilderMapper";
import RequiredPropPresenceValidator from "../biz-logic/RequiredPropPresenceValidator";
import RequiredPropFormatValidator from "../biz-logic/RequiredPropFormatValidator";

const requiredPropPresenceValidator = new RequiredPropPresenceValidator();
const requiredPropFormatValidator = new RequiredPropFormatValidator();

const FIRST_MONDAY = "2019-09-09"; // September 9, 2019 is a Monday

let mapper;

beforeEach(() => {
  mapper = new CsvRecordToLearningEventBuilderMapper(
    FIRST_MONDAY,
    requiredPropPresenceValidator,
    requiredPropFormatValidator
  );
});

describe("a mapper will return a LearningEventWithErrorsBuilder when there are unrecoverable errors with the csv record provided", () => {
  test("no duration present", () => {
    expect(
      mapper.mapToBuilder({ "start-time": "9:00" }, 2).getClassName()
    ).toEqual("LearningEventWithErrorsBuilder");
  });

  test("no valid duration", () => {
    const builder = mapper.mapToBuilder(
      { "start-time": "9:00", duration: "hello" },
      2
    );
    expect(builder.getClassName()).toEqual("LearningEventWithErrorsBuilder");
  });

  test("no start time present", () => {
    const builder = mapper.mapToBuilder({ duration: "1:30" }, 2);
    expect(builder.getClassName()).toEqual("LearningEventWithErrorsBuilder");
  });

  test("no valid start time", () => {
    const builder = mapper.mapToBuilder(
      { "start-time": "12:9:00", duration: "1:00" },
      1
    );
    expect(builder.getClassName()).toEqual("LearningEventWithErrorsBuilder");
  });
});
