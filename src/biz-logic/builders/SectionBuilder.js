import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

/**
 * The section (like 001 or 080 or 503) of a course.
 */
class SectionBuilder extends SecondaryBasePropBuilder {
  /**
   * Being super flexible here - just need 1 to 3 digits. (The
   * spreadsheet often has number like "1" when it should have "001" -
   * this is just because whoever makes the spreadsheet formats that
   * column as a number, not text).
   *
   * @param {*} propValue
   */
  static isValid(propValue) {
    const expectedForm = /^\d{1,3}$/;
    return expectedForm.test(propValue);
  }

  /**
   * We always want 3-digit section numbers, with leading 0's
   * if necessary.
   *
   * @param {*} propValue
   */
  static formattedValue(propValue) {
    return propValue.padStart(3, "0");
  }

  constructor() {
    super("section", SectionBuilder.isValid, SectionBuilder.formattedValue);
  }
}

export default SectionBuilder;
