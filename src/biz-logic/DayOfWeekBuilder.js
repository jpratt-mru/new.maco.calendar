import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class SectionCapacityBuilder {
  static create = () => {
    const isValid = propValue => {
      const expectedForm = /^(monday|tuesday|wednesday|thursday|friday|saturday|sunday)$/i;
      return expectedForm.test(propValue);
    };

    const formattedValue = propValue => {
      return propValue.toLowerCase();
    };

    return new SecondaryBasePropBuilder("dow", isValid, formattedValue);
  };
}

export default SectionCapacityBuilder;
