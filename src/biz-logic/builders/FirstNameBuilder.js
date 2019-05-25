import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class FirstNameBuilder extends SecondaryBasePropBuilder {
  static isValid(propValue) {
    const expectedForm = /^[a-z]+/i;
    return expectedForm.test(propValue);
  }

  static formattedValue(propValue) {
    return propValue.toLowerCase();
  }

  constructor() {
    super(
      "first-name",
      FirstNameBuilder.isValid,
      FirstNameBuilder.formattedValue
    );
  }
}

export default FirstNameBuilder;
