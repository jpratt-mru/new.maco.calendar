import DurationBuilder from "../biz-logic/DurationBuilder";

const PROP_NAME = "duration";

describe("when no duration property present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: {},
    canBuildDisplayableEvent: true
  };

  const durationBuilder = DurationBuilder.create().addTo(fakeBuilder);

  test("errors collection goes up by one", () => {
    expect(durationBuilder.errors.length).toBe(1);
  });

  test("builder can't build a displayable event", () => {
    expect(durationBuilder.canBuildDisplayableEvent).toBeFalsy();
  });

  test("builder has an empty warnings list", () => {
    expect(durationBuilder.warnings).toStrictEqual([]);
  });
});

describe("when malformed duration present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "foo" },
    canBuildDisplayableEvent: true
  };

  const durationBuilder = DurationBuilder.create().addTo(fakeBuilder);

  test("errors collection goes up by one", () => {
    expect(durationBuilder.errors.length).toBe(1);
  });

  test("builder can't build a displayable event", () => {
    expect(durationBuilder.canBuildDisplayableEvent).toBeFalsy();
  });

  test("builder has an empty warnings list", () => {
    expect(durationBuilder.warnings).toStrictEqual([]);
  });
});

describe("when well-formed duration present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "3:00" },
    canBuildDisplayableEvent: true
  };

  const durationBuilder = DurationBuilder.create().addTo(fakeBuilder);

  test("no errors", () => {
    expect(durationBuilder.errors.length).toBe(0);
  });

  test("builder can build displayable event", () => {
    expect(durationBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder has a start-time property with that valid time", () => {
    expect(durationBuilder[PROP_NAME]).toBe("3:00");
  });

  test("builder has an empty warnings list", () => {
    expect(durationBuilder.warnings).toStrictEqual([]);
  });
});
