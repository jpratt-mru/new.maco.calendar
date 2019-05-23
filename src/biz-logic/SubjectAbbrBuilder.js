import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

class SubjectAbbrBuilder extends SecondaryCalculatedPropBuilder {
  static prerequisitesAreValid(prerequisites) {
    return prerequisites[0] !== "???";
  }

  static propCalculatedFrom(prerequisites) {
    return prerequisites[0].substring(0, 4).toLowerCase();
  }

  constructor() {
    super(
      "subject-abbr",
      SubjectAbbrBuilder.prerequisitesAreValid,
      SubjectAbbrBuilder.propCalculatedFrom,
      "course"
    );
  }
}

export default SubjectAbbrBuilder;
