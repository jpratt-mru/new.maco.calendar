import KeywordIndex from "../biz-logic/KeywordIndex";

class LocalStorageUtilities {
  static initFromLocalStorage(state) {
    if (LocalStorageUtilities.learningEventsPresentInLocalStorage()) {
      for (let stateName in state) {
        if (localStorage[stateName]) {
          const storedItem = JSON.parse(localStorage.getItem(stateName));
          if (stateName === "keywordIndex") {
            state[stateName] = KeywordIndex.createFromLocalStorage(storedItem);
          } else {
            state[stateName] = storedItem;
          }
        }
      }
    }
  }

  static learningEventsPresentInLocalStorage = () => {
    return localStorage["allLearningEvents"] && localStorage["semester"];
  };

  static saveStateToLocalStorage() {
    const stateThatNeedsSaving = [
      "allLearningEvents",
      "displayedLearningEvents",
      "semester",
      "keywordIndex",
      "selectedCsvFile",
      "validCsvLoaded",
      "csvIssues",
      "roomCapacityIssues",
      "roomDoubleBookingIssues",
      "instructorDoubleBookingIssues"
    ];

    stateThatNeedsSaving.forEach(stateName => {
      localStorage.setItem(stateName, JSON.stringify(this.state[stateName]));
    });
  }

  static clearStorage() {
    localStorage.clear();
  }
}

export default LocalStorageUtilities;
