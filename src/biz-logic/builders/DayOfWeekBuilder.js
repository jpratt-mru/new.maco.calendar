import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

/**
 * Day of the week is just "monday", "tuesday", etc.
 * Notice they are meant to be stored all lowercase and *not* abbreviated.
 */
class DayOfWeekBuilder extends SecondaryBasePropBuilder {
  static isValid(propValue) {
    const expectedForm = /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/i;
    return expectedForm.test(propValue);
  }

  static formattedValue(propValue) {
    return propValue.toLowerCase();
  }

  constructor() {
    super("dow", DayOfWeekBuilder.isValid, DayOfWeekBuilder.formattedValue);
  }
}

export default DayOfWeekBuilder;
