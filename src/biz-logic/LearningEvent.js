import SectionCleaner from "./SectionCleaner";
import SubjectAbbrCleaner from "./SubjectAbbrCleaner";
import CourseCleaner from "./CourseCleaner";
import CourseNumberCleaner from "./CourseNumberCleaner";
import RoomCleaner from "./RoomCleaner";
import CapacityCleaner from "./CapacityCleaner";

/**
 * Represents an event - not in the CS sense of the award, but as in
 * "let's go to the pavillion, I hear there's an event going on".
 *
 * A Learning Event is fancyspeak for what you'll see in a given room on
 * campus on a given day, at a given time, taught by a given person,
 * for a given course.
 *
 * These learning events are what get displayed on the calendar, albeit
 * with many of their attributes not actually displayed - but they're
 * there behind the scenes, lurking.
 */

class LearningEvent {
  static valueOf(obj) {
    const cleaners = [
      new CourseCleaner(),
      new SectionCleaner(),
      new SubjectAbbrCleaner(),
      new CourseNumberCleaner(),
      new RoomCleaner(),
      new CapacityCleaner()
    ];
    // turn all keys to lowercase
    // https://stackoverflow.com/a/54985484
    let lowcasedObj = Object.fromEntries(
      Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
    );

    // TODO? This *could* be a place to use reduce()....but I can't
    // figure out how to yet. Grokking that damn function is HARD.
    cleaners.forEach(cleaner => {
      lowcasedObj = cleaner.clean(lowcasedObj);
    });

    return lowcasedObj;
  }
}

export default LearningEvent;
