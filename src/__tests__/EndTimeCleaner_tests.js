import EndTimeCleaner from "../biz-logic/EndTimeCleaner";

const END_TIME_PROP_NAME = "end-time";
const UNKNOWN_VALUE_MARKER = "???";

let endTimeCleaner;

beforeEach(() => {
  endTimeCleaner = new EndTimeCleaner();
});

test("if the incoming object doesn't have a key called 'startingtime' (case-insensitive), then end time defaults to '???'", () => {
  expect(endTimeCleaner.clean({})).toHaveProperty(
    END_TIME_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );

  expect(endTimeCleaner.clean({ duration: "1:30" })).toHaveProperty(
    END_TIME_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object doesn't have a key called 'duration' (case-insensitive), then end time defaults to '???'", () => {
  expect(endTimeCleaner.clean({ "startingtime": "1:00" })).toHaveProperty(
    END_TIME_PROP_NAME,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a duration that's not in xx:xx form, then end time defaults to '???'", () => {
  expect(
    endTimeCleaner.clean({ "startingtime": "3:30", duration: "123" })
  ).toHaveProperty(END_TIME_PROP_NAME, UNKNOWN_VALUE_MARKER);
});

test("if the incoming object has a duration of 1:00, then end time is start time + 50 minutes", () => {
  expect(
    endTimeCleaner.clean({ "startingtime": "8:30", duration: "1:00" })
  ).toHaveProperty(END_TIME_PROP_NAME, "9:20");
});
