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
 */

class LearningEvent {
  constructor(builder) {
    this.id = builder.id;
    this.startingMonday = builder.startingMonday;
    this.csvRecord = builder.csvRecord;

    this.course = builder.course;
    this.section = builder.section;
    this.sectionCapacity = builder.sectionCapacity;
    this.roomCapacity = builder.roomCapacity;
    this.dow = builder.dow;
    this.room = builder.room;
    this.firstName = builder.firstName;
    this.lastName = builder.lastName;

    this.courseNumber = builder.courseNumber;
    this.subjectAbbrev = builder.subjectAbbrev;
    this.instructorUsername = builder.instructorUsername;
    this.start = builder.start;
    this.end = builder.end;
    this.duration = builder.duration;

    this.missing = builder.missing;
    this.malformed = builder.malformed;
    this.isDisplayable = builder.isDisplayable;

    this.borderColor = "transparent";
  }
}

export default LearningEvent;
