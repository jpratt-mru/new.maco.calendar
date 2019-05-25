import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

class RoomBuilder extends SecondaryBasePropBuilder {
  static isValid(propValue) {
    const expectedForm = /^(ea|eb|ec|[a-z])\d{1,}[a-z]?$/gi;
    return expectedForm.test(propValue);
  }

  static formattedValue(propValue) {
    return propValue.toLowerCase();
  }

  constructor() {
    super("room", RoomBuilder.isValid, RoomBuilder.formattedValue);
  }
}

export default RoomBuilder;
