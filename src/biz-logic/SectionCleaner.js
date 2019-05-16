const UNKNOWN_VALUE_MARKER = "???";
const SECTION_PROP_NAME = "section";

class SectionCleaner {
  formattedSection = section => {
    const expectedForm = /^\d{1,3}$/;
    if (!expectedForm.test(section)) {
      return UNKNOWN_VALUE_MARKER;
    } else {
      return section.padStart(3, "0");
    }
  };

  clean = obj => {
    if (!obj.hasOwnProperty(SECTION_PROP_NAME)) {
      obj = Object.defineProperty(obj, SECTION_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER
      });
    } else {
      obj = Object.defineProperty(obj, SECTION_PROP_NAME, {
        value: this.formattedSection(obj[SECTION_PROP_NAME])
      });
    }
    return obj;
  };
}

export default SectionCleaner;
