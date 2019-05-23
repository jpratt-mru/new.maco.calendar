import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class LastNameBuilder extends SecondaryBasePropBuilder {
  static isValid(propValue) {
    const expectedForm = /^[a-z]+/i;
    return expectedForm.test(propValue);
  }

  static formattedValue(propValue) {
    return propValue.toLowerCase();
  }

  constructor() {
    super("last-name", LastNameBuilder.isValid, LastNameBuilder.formattedValue);
  }
}

export default LastNameBuilder;
