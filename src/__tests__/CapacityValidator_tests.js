import CapacityValidator from "../biz-logic/CapacityValidator";

const CAPACITY_PROP_NAME = "section-capacity";
const UNKNOWN_VALUE_MARKER = "???";

let capacityCleaner;

beforeEach(() => {
  capacityCleaner = new CapacityValidator();
});

test("if the incoming object doesn't have a key called 'capacity' (case-insensitive), then capacity defaults to '???'", () => {
  expect(capacityCleaner.clean({})).toHaveProperty(
    CAPACITY_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(capacityCleaner.clean({ foo: 12 })).toHaveProperty(
    CAPACITY_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a capacity that's not in a known form, then capacity defaults to '???'", () => {
  expect(capacityCleaner.clean({ "section-capacity": "123f" })).toHaveProperty(
    CAPACITY_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(
    capacityCleaner.clean({ "section-capacity": "no-numbers" })
  ).toHaveProperty(CAPACITY_PROP_NAME, UNKNOWN_VALUE_MARKER);

  expect(capacityCleaner.clean({ "section-capacity": "  " })).toHaveProperty(
    CAPACITY_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(capacityCleaner.clean({ "section-capacity": "12.3" })).toHaveProperty(
    CAPACITY_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(capacityCleaner.clean({ "section-capacity": "0" })).toHaveProperty(
    CAPACITY_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(capacityCleaner.clean({ "section-capacity": "-4" })).toHaveProperty(
    CAPACITY_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );
});

test("positive nums ok", () => {
  expect(capacityCleaner.clean({ "section-capacity": "1" })).toHaveProperty(
    CAPACITY_PROP_NAME,
    "1"
  );

  expect(capacityCleaner.clean({ "section-capacity": "21" })).toHaveProperty(
    CAPACITY_PROP_NAME,
    "21"
  );

  expect(capacityCleaner.clean({ "section-capacity": "513" })).toHaveProperty(
    CAPACITY_PROP_NAME,
    "513"
  );
});
