import CourseCleaner from "./CourseCleaner";

const UNKNOWN_VALUE_MARKER = "???";
const SUBJECT_ABBR_PROP_NAME = "subject-abbr";
const COURSE_PROP_NAME = "course";

class SubjectAbbrCleaner extends CourseCleaner {
  extractedCourseAbbr = course => {
    const validCourse = this.validatedCourse(course);
    if (validCourse === UNKNOWN_VALUE_MARKER) {
      return UNKNOWN_VALUE_MARKER;
    } else {
      return validCourse.substring(0, 4).toLowerCase();
    }
  };

  clean = obj => {
    if (!obj.hasOwnProperty(COURSE_PROP_NAME)) {
      obj = Object.defineProperty(obj, SUBJECT_ABBR_PROP_NAME, {
        value: UNKNOWN_VALUE_MARKER,
        enumerable: true
      });
    } else {
      obj = Object.defineProperty(obj, SUBJECT_ABBR_PROP_NAME, {
        value: this.extractedCourseAbbr(obj[COURSE_PROP_NAME]),
        enumerable:true
      });
    }
    return obj;
  };
}

export default SubjectAbbrCleaner;
