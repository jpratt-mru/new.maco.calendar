import SubjectAbbrCleaner from "../biz-logic/SubjectAbbrCleaner";

const COURSE_ABBR_PROP = "subject-abbr";
const UNKNOWN_VALUE_MARKER = "???";

let subjectAbbrCleaner;

beforeEach(() => {
  subjectAbbrCleaner = new SubjectAbbrCleaner();
});

test("if the incoming object doesn't have a key called 'course' (case-insensitive), then subject abbreviation defaults to '???'", () => {
  expect(subjectAbbrCleaner.clean({})).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );

  expect(subjectAbbrCleaner.clean({ foo: 12 })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a course that's not in XXXX#### form, then subject abbreviation defaults to '???'", () => {
  expect(subjectAbbrCleaner.clean({ course: "comp501" })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );

  expect(subjectAbbrCleaner.clean({ course: "computer501" })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );
});

test("the course abbrev is always lowercase", () => {
  expect(subjectAbbrCleaner.clean({ course: "MATH1001" })).toHaveProperty(
    COURSE_ABBR_PROP,
    "math"
  );
});
