/**
 * This adds a title property to a learningEvent - it's used by fullcalendar
 * as the text to actually display on the calendar for a given event.
 *
 * Currently, we want events that look like this:
 * COMP1501-001
 * [jbond]
 * E145 30/35
 *
 * (the 30/35 is sectioncap/roomcap)
 */

const decoratedEventWithTitle = learningEvent => {
  let titleDecoratedEvent = learningEvent;

  titleDecoratedEvent.title = `${titleDecoratedEvent.course.toUpperCase()}-${
    titleDecoratedEvent.section
  }\n[${
    titleDecoratedEvent.instructorUsername
  }]\n${titleDecoratedEvent.room.toUpperCase()}\t${
    titleDecoratedEvent.sectionCapacity
  }/${titleDecoratedEvent.roomCapacity}`;

  return titleDecoratedEvent;
};

export default decoratedEventWithTitle;
