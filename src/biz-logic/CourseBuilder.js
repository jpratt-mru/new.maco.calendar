import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class CourseBuilder extends SecondaryBasePropBuilder {
  static isValid(propValue) {
    const propValueWithoutSpaces = propValue.replace(/\s/g, "");
    const expectedForm = /^[a-zA-z]{4,4}\d{4,4}$/i;
    return expectedForm.test(propValueWithoutSpaces);
  }

  static formattedValue(propValue) {
    return propValue.replace(/\s/g, "").toLowerCase();
  }

  constructor() {
    super("course", CourseBuilder.isValid, CourseBuilder.formattedValue);
  }
}

export default CourseBuilder;
