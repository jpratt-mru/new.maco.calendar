import CourseNumberCleaner from "../biz-logic/CourseNumberCleaner";

const COURSE_ABBR_PROP = "course-number";
const UNKNOWN_VALUE_MARKER = "???";

let courseNumberCleaner;

beforeEach(() => {
  courseNumberCleaner = new CourseNumberCleaner();
});

test("if the incoming object doesn't have a key called 'course' (case-insensitive), then course number defaults to '???'", () => {
  expect(courseNumberCleaner.clean({})).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );

  expect(courseNumberCleaner.clean({ foo: 12 })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a course that's not in XXXX#### form, then course number defaults to '???'", () => {
  expect(courseNumberCleaner.clean({ course: "comp501" })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );

  expect(courseNumberCleaner.clean({ course: "computer501" })).toHaveProperty(
    COURSE_ABBR_PROP,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a course that's in XXXX#### form, then course number is ####", () => {
  expect(courseNumberCleaner.clean({ course: "math2233" })).toHaveProperty(
    COURSE_ABBR_PROP,
    "2233"
  );

  expect(courseNumberCleaner.clean({ course: "comp1633" })).toHaveProperty(
    COURSE_ABBR_PROP,
    "1633"
  );
});
