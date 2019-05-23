import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

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
