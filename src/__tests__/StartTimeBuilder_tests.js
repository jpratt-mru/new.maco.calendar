import StartTimeBuilder from "../biz-logic/StartTimeBuilder";

const PROP_NAME = "startingtime";

describe("when no startingtime property present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: {},
    canBuildDisplayableEvent: true
  };

  const startTimeBuilder = StartTimeBuilder.create().addTo(fakeBuilder);

  test("errors collection goes up by one", () => {
    expect(startTimeBuilder.errors.length).toBe(1);
  });

  test("builder can't build a displayable event", () => {
    expect(startTimeBuilder.canBuildDisplayableEvent).toBeFalsy();
  });

  test("builder has an empty warnings list", () => {
    expect(startTimeBuilder.warnings).toStrictEqual([]);
  });
});

describe("when malformed startingtime present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "foo" },
    canBuildDisplayableEvent: true
  };

  const startTimeBuilder = StartTimeBuilder.create().addTo(fakeBuilder);

  test("errors collection goes up by one", () => {
    expect(startTimeBuilder.errors.length).toBe(1);
  });

  test("builder can't build a displayable event", () => {
    expect(startTimeBuilder.canBuildDisplayableEvent).toBeFalsy();
  });

  test("builder has an empty warnings list", () => {
    expect(startTimeBuilder.warnings).toStrictEqual([]);
  });
});

describe("when well-formed startingtime present in incoming builder's csv record", () => {
  const fakeBuilder = {
    errors: [],
    warnings: [],
    csvRecord: { [PROP_NAME]: "15:00" },
    canBuildDisplayableEvent: true
  };

  const startTimeBuilder = StartTimeBuilder.create().addTo(fakeBuilder);

  test("no errors", () => {
    expect(startTimeBuilder.errors.length).toBe(0);
  });

  test("builder can build displayable event", () => {
    expect(startTimeBuilder.canBuildDisplayableEvent).toBeTruthy();
  });

  test("builder has a startingtime property with that valid time", () => {
    expect(startTimeBuilder[PROP_NAME]).toBe("15:00");
  });

  test("builder has an empty warnings list", () => {
    expect(startTimeBuilder.warnings).toStrictEqual([]);
  });
});
