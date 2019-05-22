import LearningEventBuilder from "../biz-logic/LearningEventBuilder";

describe("when malformed startingMonday provided", () => {
  const learningEventBuilder = new LearningEventBuilder(3, {}, "foo");

  test("builder can't build a displayable event", () => {
    expect(learningEventBuilder.canBuildDisplayableEvent).toBeFalsy();
  });

  test("errors collection goes up by one", () => {
    expect(learningEventBuilder.errors.length).toBe(1);
  });

  test("builder has an empty warnings list", () => {
    expect(learningEventBuilder.warnings).toStrictEqual([]);
  });
});

describe("when well-formed but non-Monday date provided", () => {
  const learningEventBuilder = new LearningEventBuilder(3, {}, "2019-05-22");

  test("builder can't build a displayable event", () => {
    expect(learningEventBuilder.canBuildDisplayableEvent).toBeFalsy();
  });

  test("builder has an empty warnings list", () => {
    expect(learningEventBuilder.warnings).toStrictEqual([]);
  });
});

describe("when well-formed and Monday date provided", () => {
  const learningEventBuilder = new LearningEventBuilder(3, {}, "2019-05-20");

  test("builder can build a displayable event", () => {
    expect(learningEventBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder has an empty warnings list", () => {
    expect(learningEventBuilder.warnings).toStrictEqual([]);
  });
});
