import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

class CourseNumberBuilder extends SecondaryCalculatedPropBuilder {
  static prerequisitesAreValid(prerequisites) {
    return prerequisites[0] !== "???";
  }

  static propCalculatedFrom(prerequisites) {
    return prerequisites[0].substring(4);
  }

  constructor() {
    super(
      "course-number",
      CourseNumberBuilder.prerequisitesAreValid,
      CourseNumberBuilder.propCalculatedFrom,
      "course"
    );
  }
}

export default CourseNumberBuilder;
