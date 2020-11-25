import SecondaryBasePropBuilder from "./SecondaryBasePropBuilder";

/**
 * Room where learning event takes place.
 */
class RoomBuilder extends SecondaryBasePropBuilder {
  /**
   * We're looking for things like EA1042, b107, and the like.
   * There are some weirdo rooms like C201H that have a letter
   * at the end.
   *
   * @param {*} propValue
   */

  static isValid(propValue) {
    const expectedForm = /^(onl|ea|eb|ec|[a-z])\d{1,}[a-z]?$/gi;
    return expectedForm.test(propValue);
  }

  /**
   * We store all rooms in lowercase.
   *
   * @param {*} propValue
   */
  static formattedValue(propValue) {
    return propValue.toLowerCase();
  }

  constructor() {
    super("room", RoomBuilder.isValid, RoomBuilder.formattedValue);
  }
}

export default RoomBuilder;
