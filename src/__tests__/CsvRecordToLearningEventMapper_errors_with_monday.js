import CsvRecordToLearningEventBuilderMapper from "../biz-logic/CsvRecordToLearningEventBuilderMapper";
import RequiredPropPresenceValidator from "../biz-logic/RequiredPropPresenceValidator";
import RequiredPropFormatValidator from "../biz-logic/RequiredPropFormatValidator";
import OptionalBasePropFormatValidator from "../biz-logic/OptionalBasePropFormatValidator";
import OptionalCalculatedPropFormatValidator from "../biz-logic/OptionalCalculatedPropFormatValidator";

const requiredPropPresenceValidator = new RequiredPropPresenceValidator();
const requiredPropFormatValidator = new RequiredPropFormatValidator();
const optionalBasePropFormatValidator = new OptionalBasePropFormatValidator();
const optionalCalculatedPropFormatValidator = new OptionalCalculatedPropFormatValidator();

const mapperArgs = [
  requiredPropPresenceValidator,
  requiredPropFormatValidator,
  optionalBasePropFormatValidator,
  optionalCalculatedPropFormatValidator
];

xdescribe("a mapper will return a LearningEventWithErrorsBuilder when there are errors the first Monday date provided", () => {
  test("given firstMondayOfSemester is not a recognized date format", () => {
    const mapper = new CsvRecordToLearningEventBuilderMapper(
      "blorb",
      ...mapperArgs
    );

    const builder = mapper.mapToBuilder({}, 1);
    expect(builder.getClassName()).toEqual("LearningEventWithErrorsBuilder");
  });

  test("given firstMondayOfSemester is not a Monday", () => {
    const mapper = new CsvRecordToLearningEventBuilderMapper(
      "2019-05-21",
      ...mapperArgs
    );

    const builder = mapper.mapToBuilder({}, 1);
    expect(builder.getClassName()).toEqual("LearningEventWithErrorsBuilder");
  });
});
