import CourseCleaner from "../biz-logic/CourseCleaner";

const COURSE_ABBR_PROP = "course";
const UNKNOWN_VALUE_MARKER = "???";

let courseCleaner;

beforeEach(() => {
  courseCleaner = new CourseCleaner();
});

test("if the incoming object doesn't have a key called 'course' (case-insensitive), then subject abbreviation defaults to '???'", () => {
  expect(courseCleaner.clean({})).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );

  expect(courseCleaner.clean({ foo: 12 })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a course that's not in XXXX#### form, then course defaults to '???'", () => {
  expect(courseCleaner.clean({ course: "comp501" })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );

  expect(courseCleaner.clean({ course: "computer501" })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );
});

test("the course abbrev is always lowercase", () => {
  expect(courseCleaner.clean({ course: "MATH1001" })).toHaveProperty(
    COURSE_ABBR_PROP,
    "math1001"
  );
});
