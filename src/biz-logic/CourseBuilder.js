import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class CourseBuilder {
  static create = () => {
    const isValid = propValue => {
      const propValueWithoutSpaces = propValue.replace(/\s/g, "");
      const expectedForm = /^[a-zA-z]{4,4}\d{4,4}$/i;
      return expectedForm.test(propValueWithoutSpaces);
    };

    const formattedValue = propValue => {
      return propValue.replace(/\s/g, "").toLowerCase();
    };

    return new SecondaryBasePropBuilder("course", isValid, formattedValue);
  };
}

export default CourseBuilder;
