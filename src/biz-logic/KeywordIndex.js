import KeywordGenerator from "../biz-logic/KeywordGenerator";

//
// Provides a way to map keywords to the ids of all
// learning events that have those keywords associated
// with them.
//
// Doesn't return duplicate ids, only a set (in the mathematical sense
// of the word) of ids.
//

class KeywordIndex {
  static createFromLocalStorage(storageContents) {
    return new KeywordIndex(storageContents);
  }

  static createFromLearningEvents(learningEvents) {
    const fieldsToIndex = [
      "course",
      "course-number",
      "first-name",
      "last-name",
      "room",
      "section",
      "subject-abbr",
      "instructor-username"
    ];
    const keywordGenerator = new KeywordGenerator();
    const keywordIndex = new KeywordIndex();
    learningEvents.forEach(learningEvent => {
      let allKeywordsForThisEvent = [];
      const idForThisEvent = learningEvent.id;
      fieldsToIndex.forEach(field => {
        const thingToKeywordify = learningEvent[`${field}`];

        if (thingToKeywordify) {
          const keywordsGenerated = keywordGenerator.keywordsFrom(
            thingToKeywordify
          );
          allKeywordsForThisEvent = allKeywordsForThisEvent.concat(
            keywordsGenerated
          );
        }
      });

      allKeywordsForThisEvent.forEach(keyword => {
        keywordIndex.add(keyword, idForThisEvent);
      });
    });
    return keywordIndex;
  }

  static createFromScratch() {
    return new KeywordIndex();
  }

  constructor(startingMap) {
    if (!startingMap) {
      this.map = new Map();
    } else {
      this.map = new Map(JSON.parse(startingMap));
    }
  }

  /**
   * Returns an array of all ids associated with the given keywords.
   *
   * @param {Array<String>} keywords a (potentially empty) collection of keywords to search for
   * @return {Array<String>} the collection of ids associated with the given keywords
   */
  idsFor = keywords => {
    const foundIds = [];
    let nonEmptyAdded = false;

    keywords.forEach(keyword => {
      if (this.map.has(keyword)) {
        nonEmptyAdded = true;
        foundIds.push(this.map.get(keyword));
      } else {
        foundIds.push([]);
      }
    });
    return nonEmptyAdded ? [...foundIds] : [];
  };

  /**
   * Adds a given keyword and its associated id. Keywords are
   * case-sensitive.
   *
   * If the keyword already exists in the index, it is not added.
   *
   * If the keyword contains only whitespace, it is not added.
   *
   * @param {String} keyword the keyword to add
   * @return {Array<String>} the collection of ids associated with the given keywords
   */
  add = (keyword, id) => {
    if (this.map.has(keyword)) {
      const currentIdsMappedToKeyword = new Set(this.map.get(keyword));
      currentIdsMappedToKeyword.add(id);

      this.map.set(keyword, [...currentIdsMappedToKeyword]);
    } else {
      this.map.set(keyword, [id]);
    }
  };

  toJSON = () => {
    return JSON.stringify([...this.map]);
  };
}

export default KeywordIndex;
