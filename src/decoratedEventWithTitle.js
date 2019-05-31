const decoratedEventWithTitle = learningEvent => {
  let titleDecoratedEvent = learningEvent;
  titleDecoratedEvent["title"] = `${titleDecoratedEvent[
    "course"
  ].toUpperCase()}-${titleDecoratedEvent["section"]}\n[${
    titleDecoratedEvent["instructor-username"]
  }]\n${titleDecoratedEvent["room"].toUpperCase()}`;

  return titleDecoratedEvent;
};

export default decoratedEventWithTitle;
