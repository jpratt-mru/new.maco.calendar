import SectionCapacityBuilder from "../biz-logic/SectionCapacityBuilder";

const PROP_NAME = "sectioncapacity";

describe("when no sectioncapacity property present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: {},
    canBuildDisplayableEvent: true
  };

  const sectionCapacityBuilder = SectionCapacityBuilder.create().addTo(
    fakeBuilder
  );

  test("warnings collection goes up by one", () => {
    expect(sectionCapacityBuilder.warnings.length).toBe(1);
  });

  test("builder can still build a displayable event", () => {
    expect(sectionCapacityBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows ??? as sectioncapacity", () => {
    expect(sectionCapacityBuilder[PROP_NAME]).toBe("???");
  });
});

describe("when malformed sectioncapacity present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "foo" },
    canBuildDisplayableEvent: true
  };

  const sectionCapacityBuilder = SectionCapacityBuilder.create().addTo(
    fakeBuilder
  );

  test("warnings collection goes up by one", () => {
    expect(sectionCapacityBuilder.warnings.length).toBe(1);
  });

  test("builder can still build a displayable event", () => {
    expect(sectionCapacityBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows ??? as sectioncapacity", () => {
    expect(sectionCapacityBuilder[PROP_NAME]).toBe("???");
  });
});

describe("when well formed sectioncapacity is in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "29" },
    canBuildDisplayableEvent: true
  };

  const sectionCapacityBuilder = SectionCapacityBuilder.create().addTo(
    fakeBuilder
  );

  test("builder can still build a displayable event", () => {
    expect(sectionCapacityBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows lowercased sectioncapacity as sectioncapacity", () => {
    expect(sectionCapacityBuilder[PROP_NAME]).toBe("29");
  });
});
