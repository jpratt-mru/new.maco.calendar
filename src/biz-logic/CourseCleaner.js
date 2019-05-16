const UNKNOWN_VALUE_MARKER = "???";
const COURSE_PROP_NAME = "course";

class CourseCleaner {
  validatedCourse = course => {
    const expectedForm = /[a-zA-z]{4,4}\d{4,4}/;
    if (!expectedForm.test(course)) {
      return UNKNOWN_VALUE_MARKER;
    } else {
      return course.toLowerCase();
    }
  };

  clean = obj => {
    if (!obj.hasOwnProperty(COURSE_PROP_NAME)) {
      obj = Object.defineProperty(obj, COURSE_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER
      });
    } else {
      obj = Object.defineProperty(obj, COURSE_PROP_NAME, {
        value: this.validatedCourse(obj[COURSE_PROP_NAME])
      });
    }
    return obj;
  };
}

export default CourseCleaner;
