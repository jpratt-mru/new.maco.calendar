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
