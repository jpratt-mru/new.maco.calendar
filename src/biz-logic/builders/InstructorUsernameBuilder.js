import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

/**
 * "Username" means what a person would use to log into an MRU
 * computer. For instructors, that's the first initial of their
 * first name followed by their entire last name, with any funky
 * characters (spaces, hyphens, numbers) removed; the username is
 * always in lowercase.
 *
 * Usernames are important because they're used to indicate the
 * instructor on calendar every calendar event.
 *
 * Also, if either of the first name or last names start with "TBA",
 * then the username is considered TBA. (Some of the spreadsheets have had
 * data where the first name is "TBA001", or the last name is
 * something similar - they're just placeholders meaning "this
 * instructor hasn't been determined yet").
 */
class InstructorUsernameBuilder extends SecondaryCalculatedPropBuilder {
  /**
   * As long as the first AND last names have come through validated,
   * we'll build a username.
   *
   * @param {*} prerequisites
   */
  static prerequisitesAreValid(prerequisites) {
    const [firstName, lastName] = prerequisites;
    return firstName !== "???" && lastName !== "???";
  }

  static propCalculatedFrom(prerequisites) {
    const [firstName, lastName] = prerequisites;
    const TBA = /^tba/gi;

    if (TBA.test(firstName) || TBA.test(lastName)) {
      return "TBA";
    } else {
      return InstructorUsernameBuilder.validUsernameFrom(firstName, lastName);
    }
  }

  static validUsernameFrom(firstName, lastName) {
    const notAllowedChars = /[^a-z]/gi;

    const cleanedFirstName = firstName.replace(notAllowedChars, "");
    const cleanedLastName = lastName.replace(notAllowedChars, "");

    return (cleanedFirstName.charAt(0) + cleanedLastName).toLowerCase();
  }

  constructor() {
    super(
      "instructorUsername",
      InstructorUsernameBuilder.prerequisitesAreValid,
      InstructorUsernameBuilder.propCalculatedFrom,
      "firstName",
      "lastName"
    );
  }
}

export default InstructorUsernameBuilder;
