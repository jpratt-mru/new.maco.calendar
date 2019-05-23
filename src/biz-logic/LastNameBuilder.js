import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class LastNameBuilder {
  static create = () => {
    const isValid = propValue => {
      const expectedForm = /^[a-z]+/i;
      return expectedForm.test(propValue);
    };

    const formattedValue = propValue => {
      return propValue.toLowerCase();
    };

    return new SecondaryBasePropBuilder("last-name", isValid, formattedValue);
  };
}

export default LastNameBuilder;
