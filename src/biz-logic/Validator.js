class Validator {
  static UNKNOWN_VALUE_MARKER = "???";
  addNecessaryProperyIfNotPresent = (obj, propertyName) => {
    if (!obj.hasOwnProperty(propertyName)) {
      obj = Object.defineProperty(obj, propertyName, {
        value: Validator.UNKNOWN_VALUE_MARKER,
        enumerable: true,
        writable: true
      });
    }
  };

  validateProperty = (obj, propertyName, validatedPropertyValue) => {
    obj[propertyName] = validatedPropertyValue(obj[propertyName]);
  };

  validate = (obj, propertyName, validator) => {
    this.addNecessaryProperyIfNotPresent(obj, propertyName);
    this.validateProperty(obj, propertyName, validator);
    return obj;
  };
}

export default Validator;
