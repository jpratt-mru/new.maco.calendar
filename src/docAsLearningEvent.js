const docAsLearningEvent = doc => {
  console.log("doc", doc);
  let titleDecoratedDoc = doc;
  titleDecoratedDoc["title"] = `${titleDecoratedDoc[
    "course"
  ].toUpperCase()}\n[${
    titleDecoratedDoc["instructor-username"]
  }]\n${titleDecoratedDoc["room"].toUpperCase()}`;

  return titleDecoratedDoc;
};

export default docAsLearningEvent;
