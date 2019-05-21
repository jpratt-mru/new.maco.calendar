import LearningEvent from "../biz-logic/LearningEvent";

let learningEvent;

test("will have an error recorded if the csvRecord is incorrect", () => {
  const csvRecord = {};
  expect(LearningEvent.createFrom(csvRecord, 2, "")).errors.length.toBe(1);
});
