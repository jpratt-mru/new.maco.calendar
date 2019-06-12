import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

/**
 * When we say "course number", we mean something like the `2503` in `COMP2503`
 * or `1200` in `math 1200`.
 *
 * Course numbers are calculated from `course` properties.
 */
class CourseNumberBuilder extends SecondaryCalculatedPropBuilder {
  /**
   * The prerequisite for a course number is a course. It's assumed that
   * the course will have been previously validated, so if it doesn't come
   * in as "???", we'll assume things are fine.
   *
   * @param {*} propValue
   */
  static prerequisitesAreValid(prerequisites) {
    return prerequisites[0] !== "???";
  }

  /**
   * Just take the last 4 characters of the course. No need to turn it into
   * a number, as we never do any math with it.
   *
   * @param {*} prerequisites
   */
  static propCalculatedFrom(prerequisites) {
    return prerequisites[0].substring(4);
  }

  constructor() {
    super(
      "courseNumber",
      CourseNumberBuilder.prerequisitesAreValid,
      CourseNumberBuilder.propCalculatedFrom,
      "course"
    );
  }
}

export default CourseNumberBuilder;
