import SectionBuilder from "../biz-logic/SectionBuilder";

const PROP_NAME = "section";

describe("when no section property present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: {},
    canBuildDisplayableEvent: true
  };

  const sectionBuilder = SectionBuilder.create().addTo(fakeBuilder);

  test("warnings collection goes up by one", () => {
    expect(sectionBuilder.warnings.length).toBe(1);
  });

  test("builder can still build a displayable event", () => {
    expect(sectionBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows ??? as section", () => {
    expect(sectionBuilder[PROP_NAME]).toBe("???");
  });
});

describe("when malformed section present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "foo" },
    canBuildDisplayableEvent: true
  };

  const sectionBuilder = SectionBuilder.create().addTo(fakeBuilder);

  test("warnings collection goes up by one", () => {
    expect(sectionBuilder.warnings.length).toBe(1);
  });

  test("builder can still build a displayable event", () => {
    expect(sectionBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows ??? as section", () => {
    expect(sectionBuilder[PROP_NAME]).toBe("???");
  });
});

describe("when section that isn't in XXX format is in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "1" },
    canBuildDisplayableEvent: true
  };

  const sectionBuilder = SectionBuilder.create().addTo(fakeBuilder);

  test("builder can still build a displayable event", () => {
    expect(sectionBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows section with leading 0s as section", () => {
    expect(sectionBuilder[PROP_NAME]).toBe("001");
  });
});

describe("when section that has 3 digits is in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "501" },
    canBuildDisplayableEvent: true
  };

  const sectionBuilder = SectionBuilder.create().addTo(fakeBuilder);

  test("builder can still build a displayable event", () => {
    expect(sectionBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows lowercased section as section", () => {
    expect(sectionBuilder[PROP_NAME]).toBe("501");
  });
});
