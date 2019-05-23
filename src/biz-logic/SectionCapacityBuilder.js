import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class SectionCapacityBuilder {
  static create = () => {
    const isValid = propValue => {
      const expectedForm = /^[1-9][0-9]*$/;
      return expectedForm.test(propValue);
    };

    const formattedValue = propValue => {
      return propValue;
    };

    return new SecondaryBasePropBuilder(
      "section-capacity",
      isValid,
      formattedValue
    );
  };
}

export default SectionCapacityBuilder;
