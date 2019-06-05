import CsvRecordToLearningEventBuilderMapper from "../biz-logic/CsvRecordToLearningEventBuilderMapper";
import RequiredPropPresenceValidator from "../biz-logic/RequiredPropPresenceValidator";
import RequiredPropFormatValidator from "../biz-logic/RequiredPropFormatValidator";
import OptionalBasePropFormatValidator from "../biz-logic/OptionalBasePropFormatValidator";
import OptionalCalculatedPropFormatValidator from "../biz-logic/OptionalCalculatedPropFormatValidator";

const requiredPropPresenceValidator = new RequiredPropPresenceValidator();
const requiredPropFormatValidator = new RequiredPropFormatValidator();
const optionalBasePropFormatValidator = new OptionalBasePropFormatValidator();
const optionalCalculatedPropFormatValidator = new OptionalCalculatedPropFormatValidator();

const FIRST_MONDAY = "2019-09-09"; // September 9, 2019 is a Monday

let mapper;
const validRecord = {
  startingtime: "13:30",
  duration: "1:00",
  course: "comp1501",
  section: "001",
  sectioncapacity: "30",
  dow: "Wednesday",
  room: "t225",
  firstname: "Foo",
  lastname: "Bar"
};

beforeEach(() => {
  mapper = new CsvRecordToLearningEventBuilderMapper(
    FIRST_MONDAY,
    requiredPropPresenceValidator,
    requiredPropFormatValidator,
    optionalBasePropFormatValidator,
    optionalCalculatedPropFormatValidator
  );
});

xdescribe("a mapper will return a LearningEventWithWarningsBuilder when there are recoverable errors with the csv record provided", () => {
  test("course with space", () => {
    const recordWithProblems = Object.assign(
      { course: "GNED 1101" },
      validRecord
    );
    expect(mapper.mapToBuilder(recordWithProblems, 2).getClassName()).toEqual(
      "LearningEventWithWarningsBuilder"
    );
  });
});
