import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class SectionBuilder extends SecondaryBasePropBuilder {
  static isValid(propValue) {
    const expectedForm = /^\d{1,3}$/;
    return expectedForm.test(propValue);
  }

  static formattedValue(propValue) {
    return propValue.padStart(3, "0");
  }

  constructor() {
    super("section", SectionBuilder.isValid, SectionBuilder.formattedValue);
  }
}

export default SectionBuilder;
