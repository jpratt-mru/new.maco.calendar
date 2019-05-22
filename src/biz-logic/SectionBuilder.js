import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class SectionBuilder {
  static create = () => {
    const isValid = propValue => {
      const expectedForm = /^\d{1,3}$/;
      return expectedForm.test(propValue);
    };

    const formattedValue = propValue => {
      return propValue.padStart(3, "0");
    };

    return new SecondaryBasePropBuilder("section", isValid, formattedValue);
  };
}

export default SectionBuilder;
