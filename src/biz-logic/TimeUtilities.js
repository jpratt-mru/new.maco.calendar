import moment from "moment";

class TimeUtilities {
  static validMonday = text => {
    const momentedText = moment(text, "YYYY-MM=DD");
    return momentedText.isValid() && momentedText.day() == 1;
  };

  static validTime = text => {
    const validTimeRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return validTimeRegex.test(text);
  };

  static validDuration = text => {
    const validDurationRegex = /^(2[0-3]|[01]?[0-9]):([0-5]?[0-9])$/;
    return validDurationRegex.test(text);
  };
}

export default TimeUtilities;
