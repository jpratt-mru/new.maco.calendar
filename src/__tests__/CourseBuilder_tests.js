import CourseBuilder from "../biz-logic/CourseBuilder";

const PROP_NAME = "course";

describe("when no course property present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: {},
    canBuildDisplayableEvent: true
  };

  const courseBuilder = CourseBuilder.create().addTo(fakeBuilder);

  test("warnings collection goes up by one", () => {
    expect(courseBuilder.warnings.length).toBe(1);
  });

  test("builder can still build a displayable event", () => {
    expect(courseBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows ??? as course", () => {
    expect(courseBuilder[PROP_NAME]).toBe("???");
  });
});

describe("when malformed course present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "foo" },
    canBuildDisplayableEvent: true
  };

  const courseBuilder = CourseBuilder.create().addTo(fakeBuilder);

  test("warnings collection goes up by one", () => {
    expect(courseBuilder.warnings.length).toBe(1);
  });

  test("builder can still build a displayable event", () => {
    expect(courseBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows ??? as course", () => {
    expect(courseBuilder[PROP_NAME]).toBe("???");
  });
});

describe("when course that has a space in it is in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "GNED 1101" },
    canBuildDisplayableEvent: true
  };

  const courseBuilder = CourseBuilder.create().addTo(fakeBuilder);

  test("builder can still build a displayable event", () => {
    expect(courseBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows course without space, lowercased, as course", () => {
    expect(courseBuilder[PROP_NAME]).toBe("gned1101");
  });
});

describe("when course that has no space in it is in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "COMP1501" },
    canBuildDisplayableEvent: true
  };

  const courseBuilder = CourseBuilder.create().addTo(fakeBuilder);

  test("builder can still build a displayable event", () => {
    expect(courseBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows lowercased course as course", () => {
    expect(courseBuilder[PROP_NAME]).toBe("comp1501");
  });
});
