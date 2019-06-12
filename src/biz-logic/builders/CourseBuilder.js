import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

/**
 * When we say "course", we mean something like `COMP2503` or `math1200`.
 */
class CourseBuilder extends SecondaryBasePropBuilder {
  /**
   * Courses are in AAAA#### format, like COMP1501 or gned1001.
   * Sometimes the spreadsheet might have courses with a space
   * between the AAAA and #### part - that's still valid, though annoying.
   *
   * @param {*} propValue
   */
  static isValid(propValue) {
    const propValueWithoutSpaces = propValue.replace(/\s/g, "");
    const expectedForm = /^[a-zA-z]{4,4}\d{4,4}$/i;
    return expectedForm.test(propValueWithoutSpaces);
  }

  /**
   * We want to store courses in lowercase letter, no spaces between
   * the course abbreviation and the course number.
   *
   * @param {*} propValue
   */
  static formattedValue(propValue) {
    return propValue.replace(/\s/g, "").toLowerCase();
  }

  constructor() {
    super("course", CourseBuilder.isValid, CourseBuilder.formattedValue);
  }
}

export default CourseBuilder;
