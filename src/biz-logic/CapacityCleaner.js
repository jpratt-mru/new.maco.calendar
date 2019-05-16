const UNKNOWN_VALUE_MARKER = "???";
const CAPACITY_PROP_NAME = "section-capacity";

class CapacityCleaner {
  validatedCapacity = capacity => {
    const expectedForm = /^[1-9][0-9]*$/;
    if (!expectedForm.test(capacity)) {
      return UNKNOWN_VALUE_MARKER;
    } else {
      return capacity;
    }
  };

  clean = obj => {
    if (!obj.hasOwnProperty(CAPACITY_PROP_NAME)) {
      obj = Object.defineProperty(obj, CAPACITY_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER
      });
    } else {
      obj = Object.defineProperty(obj, CAPACITY_PROP_NAME, {
        value: this.validatedCapacity(obj[CAPACITY_PROP_NAME])
      });
    }
    return obj;
  };
}

export default CapacityCleaner;
