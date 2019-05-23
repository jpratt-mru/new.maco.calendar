// import SectionCleaner from "./SectionCleaner";
// import SubjectAbbrCleaner from "./SubjectAbbrCleaner";
// import CourseCleaner from "./CourseCleaner";
// import CourseNumberCleaner from "./CourseNumberCleaner";
// import RoomCleaner from "./RoomCleaner";
// import CapacityCleaner from "./CapacityCleaner";
// import EndTimeCleaner from "./EndTimeCleaner";
// import StartCleaner from "./StartCleaner";
// import EndCleaner from "./EndCleaner";
// import InstructorNameCleaner from "./InstructorNameCleaner";

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
 *
 * I use the Builder Pattern here, because I have self-confidence issues.
 */

class LearningEvent {
  constructor(builder) {
    this.id = builder.id;
    this.startingMonday = builder.startingMonday;
    this.csvRecord = builder.csvRecord;

    this.course = builder.course;
    this.section = builder.section;
    this["section-capacity"] = builder["section-capacity"];
    this.dow = builder.dow;
    this.room = builder.room;
    this["first-name"] = builder["first-name"];
    this["last-name"] = builder["last-name"];

    this["course-number"] = builder["course-number"];
    this["subject-abbr"] = builder["subject-abbr"];
    this["instructor-username"] = builder["instructor-username"];
    this.start = builder.start;
    this.end = builder.end;

    this.errors = builder.errors;
    this.warnings = builder.warnings;
  }
  // static valueOf(index, obj, startingMonday) {
  //   const cleaners = [
  //     new CourseCleaner(),
  //     new SectionCleaner(),
  //     new SubjectAbbrCleaner(),
  //     new CourseNumberCleaner(),
  //     new RoomCleaner(),
  //     new CapacityCleaner(),
  //     new StartCleaner(startingMonday),
  //     new EndTimeCleaner(),
  //     new EndCleaner(),
  //     new InstructorNameCleaner()
  //   ];
  //   // turn all keys to lowercase
  //   // https://stackoverflow.com/a/54985484
  //   let lowcasedObj = Object.fromEntries(
  //     Object.entries(obj).map(([k, v]) => [k.toLowerCase(), v])
  //   );

  //   // add an id
  //   lowcasedObj = Object.defineProperty(lowcasedObj, "id", {
  //     value: index,
  //     enumerable: true
  //   });

  //   // TODO? This *could* be a place to use reduce()....but I can't
  //   // figure out how to yet. Grokking that damn function is HARD.
  //   cleaners.forEach(cleaner => {
  //     lowcasedObj = cleaner.clean(lowcasedObj);
  //   });

  //   return lowcasedObj;
  // }
}

export default LearningEvent;
