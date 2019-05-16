import SectionCleaner from "../biz-logic/SectionCleaner";

const SECTION_PROP = "section";
const UNKNOWN_VALUE_MARKER = "???";

let sectionCleaner;

beforeEach(() => {
  sectionCleaner = new SectionCleaner();
});

test("if the incoming object doesn't have a key called 'section' (case-insensitive), then it's added and set to value '???'", () => {
  expect(sectionCleaner.clean({})).toHaveProperty(
    SECTION_PROP,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a non-numerical section, then its value is set to '???'", () => {
  expect(sectionCleaner.clean({ section: "a" })).toHaveProperty(
    SECTION_PROP,
    UNKNOWN_VALUE_MARKER
  );
});

test("if the incoming object has a section that's under 3 characters, then its value is given leading 0's to make up the difference", () => {
  expect(sectionCleaner.clean({ section: "1" })).toHaveProperty(
    SECTION_PROP,
    "001"
  );

  expect(sectionCleaner.clean({ section: "80" })).toHaveProperty(
    SECTION_PROP,
    "080"
  );
});

test("if the incoming object has a section that's over 3 characters, then its value is set to '???'", () => {
  expect(sectionCleaner.clean({ section: "5081" })).toHaveProperty(
    SECTION_PROP,
    UNKNOWN_VALUE_MARKER
  );
});
