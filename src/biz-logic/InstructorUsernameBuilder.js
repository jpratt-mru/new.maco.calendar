import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

class InstructorUsernameBuilder extends SecondaryCalculatedPropBuilder {
  static prerequisitesAreValid(prerequisites) {
    return prerequisites[0] !== "???" && prerequisites[1] !== "???";
  }

  static propCalculatedFrom(prerequisites) {
    const firstName = prerequisites[0];
    const lastName = prerequisites[1];
    const TBA = /^tba/gi;

    if (TBA.test(firstName) || TBA.test(lastName)) {
      return "TBA";
    } else {
      const onlyLetters = /[^a-z]/gi;
      const cleanedFirstName = firstName.replace(onlyLetters, "");
      const cleanedLastName = lastName.replace(onlyLetters, "");

      return (cleanedFirstName.charAt(0) + cleanedLastName).toLowerCase();
    }
  }

  constructor() {
    super(
      "instructor-username",
      InstructorUsernameBuilder.prerequisitesAreValid,
      InstructorUsernameBuilder.propCalculatedFrom,
      "first-name",
      "last-name"
    );
  }
}

export default InstructorUsernameBuilder;
