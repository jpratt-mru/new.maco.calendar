import CourseCleaner from "./CourseCleaner";

const UNKNOWN_VALUE_MARKER = "???";
const COURSENUM_PROP_NAME = "course-number";
const COURSE_PROP_NAME = "course";

class CourseNumberCleaner extends CourseCleaner {
  extractedCourseNumber = course => {
    const validCourse = this.validatedCourse(course);
    if (validCourse === UNKNOWN_VALUE_MARKER) {
      return UNKNOWN_VALUE_MARKER;
    } else {
      return validCourse.substring(4);
    }
  };

  clean = obj => {
    if (!obj.hasOwnProperty(COURSE_PROP_NAME)) {
      obj = Object.defineProperty(obj, COURSENUM_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER,
        enumerable: true
      });
    } else {
      obj = Object.defineProperty(obj, COURSENUM_PROP_NAME, {
        value: this.extractedCourseNumber(obj[COURSE_PROP_NAME]),
        enumerable:true
      });
    }
    return obj;
  };
}

export default CourseNumberCleaner;
