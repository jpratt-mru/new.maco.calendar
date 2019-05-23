import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class FirstNameBuilder {
  static create = () => {
    const isValid = propValue => {
      const expectedForm = /^[a-z]+/i;
      return expectedForm.test(propValue);
    };

    const formattedValue = propValue => {
      return propValue.toLowerCase();
    };

    return new SecondaryBasePropBuilder("first-name", isValid, formattedValue);
  };
}

export default FirstNameBuilder;
