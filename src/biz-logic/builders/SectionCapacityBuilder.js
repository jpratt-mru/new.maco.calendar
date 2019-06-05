import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class SectionCapacityBuilder extends SecondaryBasePropBuilder {
  static isValid(propValue) {
    const expectedForm = /^[1-9][0-9]*$/;
    return expectedForm.test(propValue);
  }

  static formattedValue(propValue) {
    return propValue;
  }

  constructor() {
    super(
      "sectioncapacity",
      SectionCapacityBuilder.isValid,
      SectionCapacityBuilder.formattedValue
    );
  }
}

export default SectionCapacityBuilder;
