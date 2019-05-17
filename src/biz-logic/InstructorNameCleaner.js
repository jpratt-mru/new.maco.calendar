const UNKNOWN_VALUE_MARKER = "???";
const INSTRUCTOR_USERNAME_PROP_NAME = "instructor-username";

class InstructorNameCleaner {
  validatedUsername = (firstName, lastName) => {
    const TBA = /^tba/gi;
    if (TBA.test(firstName) || TBA.test(lastName)) {
      return "TBA";
    } else {
      const onlyLetters = /[^a-z]/gi;
      const cleanedFirstName = firstName.replace(onlyLetters, "");
      const cleanedLastName = lastName.replace(onlyLetters, "");
      return (cleanedFirstName.charAt(0) + cleanedLastName).toLowerCase();
    }
  };

  clean = obj => {
    if (!obj.hasOwnProperty("first-name") || !obj.hasOwnProperty("last-name")) {
      obj = Object.defineProperty(obj, INSTRUCTOR_USERNAME_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER
      });
    } else {
      obj = Object.defineProperty(obj, INSTRUCTOR_USERNAME_PROP_NAME, {
        value: this.validatedUsername(obj["first-name"], obj["last-name"])
      });
    }
    return obj;
  };
}

export default InstructorNameCleaner;
