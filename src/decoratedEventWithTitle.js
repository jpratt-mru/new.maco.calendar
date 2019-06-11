const decoratedEventWithTitle = learningEvent => {
  let titleDecoratedEvent = learningEvent;
  const overCapacity =
    titleDecoratedEvent["sectioncapacity"] >
    titleDecoratedEvent["roomcapacity"];

  titleDecoratedEvent["title"] = `${titleDecoratedEvent[
    "course"
  ].toUpperCase()}-${titleDecoratedEvent["section"]}\n[${
    titleDecoratedEvent["instructor-username"]
  }]\n${titleDecoratedEvent["room"].toUpperCase()}\ts${
    titleDecoratedEvent["sectioncapacity"]
  }:r${titleDecoratedEvent["roomcapacity"]}${overCapacity ? "!!!" : ""}`;

  return titleDecoratedEvent;
};

export default decoratedEventWithTitle;
