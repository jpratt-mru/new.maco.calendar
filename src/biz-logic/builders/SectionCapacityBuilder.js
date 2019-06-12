import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

/**
 * The section capacity allocated for a course.
 */
class SectionCapacityBuilder extends SecondaryBasePropBuilder {
  /**
   * Looking for a non-zero positive integer here.
   *
   * @param {*} propValue
   */

  static isValid(propValue) {
    const expectedForm = /^[1-9][0-9]*$/;
    return expectedForm.test(propValue);
  }

  static formattedValue(propValue) {
    return propValue;
  }

  constructor() {
    super(
      "sectionCapacity",
      SectionCapacityBuilder.isValid,
      SectionCapacityBuilder.formattedValue
    );
  }
}

export default SectionCapacityBuilder;
