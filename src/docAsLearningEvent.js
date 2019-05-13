const docAsLearningEvent = doc => {
  const zeDoc = { id: doc.id, ...doc.data() };

  zeDoc["title"] = `${zeDoc["course"]}\n[${zeDoc["instructorUsername"]}]\n${
    zeDoc["room"]
  }`;

  return zeDoc;
};

export default docAsLearningEvent;
