import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class RoomBuilder {
  static create = () => {
    const isValid = propValue => {
      const expectedForm = /^(ea|eb|ec|[a-z])\d{1,}[a-z]?$/gi;
      return expectedForm.test(propValue);
    };

    const formattedValue = propValue => {
      return propValue.toLowerCase();
    };

    return new SecondaryBasePropBuilder("room", isValid, formattedValue);
  };
}

export default RoomBuilder;
