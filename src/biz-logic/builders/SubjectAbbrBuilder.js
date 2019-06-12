import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

/**
 * Subject abbreviations are things like `COMP` and `gned`.
 * These are calculated from a course, like `COMP1501` or `gned1102`.
 */
class SubjectAbbrBuilder extends SecondaryCalculatedPropBuilder {
  /**
   * If we have a course, full steam ahead.
   *
   * @param {*} prerequisites
   */
  static prerequisitesAreValid(prerequisites) {
    return prerequisites[0] !== "???";
  }

  /**
   * We grab the first 4 characters in a course; subject abbreviations
   * are kept in lowercase.
   *
   * @param {*} prerequisites
   */
  static propCalculatedFrom(prerequisites) {
    return prerequisites[0].substring(0, 4).toLowerCase();
  }

  constructor() {
    super(
      "subjectAbbrev",
      SubjectAbbrBuilder.prerequisitesAreValid,
      SubjectAbbrBuilder.propCalculatedFrom,
      "course"
    );
  }
}

export default SubjectAbbrBuilder;
