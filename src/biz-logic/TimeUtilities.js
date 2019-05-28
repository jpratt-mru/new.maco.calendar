import moment from "moment";

class TimeUtilities {
  static validMonday(text) {
    const momentedText = moment(text, "YYYY-MM=DD");
    return momentedText.isValid() && momentedText.day() == 1;
  }

  static validDate(text) {
    const momentedText = moment(text, "YYYY-MM=DD");
    return momentedText.isValid();
  }

  static validTime(text) {
    const validTimeRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return validTimeRegex.test(text);
  }

  static validDuration(text) {
    const validDurationRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return validDurationRegex.test(text);
  }

  static formattedTime(momentTimeObject) {
    return moment(momentTimeObject, "YYYY-MM-DD HH:mm").format();
  }

  static dayOfWeekAsNumber(dow) {
    switch (dow) {
      case "monday":
      case "m":
        return 1;
      case "tuesday":
      case "t":
        return 2;
      case "wednesday":
      case "w":
        return 3;
      case "thursday":
      case "r":
        return 4;
      case "friday":
      case "f":
        return 5;
      case "saturday":
        return 6;
      default:
        return 0;
    }
  }
}

export default TimeUtilities;
