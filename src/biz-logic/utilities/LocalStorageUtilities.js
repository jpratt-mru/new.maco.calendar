import KeywordIndex from "../KeywordIndex";

/**
 * Utility methods to save/retrieve calendar states from HTML5 LocalStorage.
 */
class LocalStorageUtilities {
  /**
   * Incoming state is the state of the `App.js` Component.  We're touching
   * it directly, because this helper method is being called in the App's
   * constructor.
   *
   * We handle the keywordIndex state a bit differently becuase it's a bit
   * more of a complex beast.
   *
   * @param {*} state
   */
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

  /**
   * TODO: This is a bit arbitrary - what's so special about the keys
   * `allLearningEvents` and `semester`?
   */
  static learningEventsPresentInLocalStorage = () => {
    return localStorage["allLearningEvents"] && localStorage["semester"];
  };

  static saveStateToLocalStorage(state) {
    Object.keys(state).forEach(stateName => {
      localStorage.setItem(stateName, JSON.stringify(this.state[stateName]));
    });
  }

  static clearStorage() {
    localStorage.clear();
  }
}

export default LocalStorageUtilities;
