import Validator from "./Validator";
const CAPACITY_PROP_NAME = "section-capacity";

class CapacityValidator extends Validator {
  validatedCapacity = capacity => {
    const expectedForm = /^[1-9][0-9]*$/;
    if (!expectedForm.test(capacity)) {
      return Validator.UNKNOWN_VALUE_MARKER;
    } else {
      return capacity;
    }
  };

  clean = obj => {
    return this.validate(obj, CAPACITY_PROP_NAME, this.validatedCapacity);
  };
}

export default CapacityValidator;
