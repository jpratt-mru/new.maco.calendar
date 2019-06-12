import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

/**
 * First name of the instructor, just to be clear.
 */
class FirstNameBuilder extends SecondaryBasePropBuilder {
  /**
   * Just looking for anything that *starts* with alphabetic characters.
   * You can go crazy after that (like "TBA123") if you really want to.
   *
   * @param {*} propValue
   */
  static isValid(propValue) {
    const expectedForm = /^[a-z]+/i;
    return expectedForm.test(propValue);
  }

  /**
   * We store all names in lowercase - they're never displayed, so
   * wanted to keep it simple.
   *
   * @param {*} propValue
   */
  static formattedValue(propValue) {
    return propValue.toLowerCase();
  }

  constructor() {
    super(
      "firstName",
      FirstNameBuilder.isValid,
      FirstNameBuilder.formattedValue
    );
  }
}

export default FirstNameBuilder;
