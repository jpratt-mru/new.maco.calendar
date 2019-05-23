import DayOfWeekBuilder from "../biz-logic/DayOfWeekBuilder";

const PROP_NAME = "dow";

describe("when no dow property present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: {},
    canBuildDisplayableEvent: true
  };

  const dowBuilder = DayOfWeekBuilder.create().addTo(fakeBuilder);

  test("warnings collection goes up by one", () => {
    expect(dowBuilder.warnings.length).toBe(1);
  });

  test("builder can still build a displayable event", () => {
    expect(dowBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows ??? as dow", () => {
    expect(dowBuilder[PROP_NAME]).toBe("???");
  });
});

describe("when malformed dow present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "wed" },
    canBuildDisplayableEvent: true
  };

  const dowBuilder = DayOfWeekBuilder.create().addTo(fakeBuilder);

  test("warnings collection goes up by one", () => {
    expect(dowBuilder.warnings.length).toBe(1);
  });

  test("builder can still build a displayable event", () => {
    expect(dowBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows ??? as dow", () => {
    expect(dowBuilder[PROP_NAME]).toBe("???");
  });
});

describe("when well formed dow is in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "Thursday" },
    canBuildDisplayableEvent: true
  };

  const dowBuilder = DayOfWeekBuilder.create().addTo(fakeBuilder);

  test("builder can still build a displayable event", () => {
    expect(dowBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder shows lowercased dow as dow", () => {
    expect(dowBuilder[PROP_NAME]).toBe("thursday");
  });
});
