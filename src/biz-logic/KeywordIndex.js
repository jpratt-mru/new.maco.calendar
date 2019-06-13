import KeywordGenerator from "../biz-logic/KeywordGenerator";
import _ from "lodash"; // for union()

/**
 * Provides a way to map keywords to the ids of all
 * learning events that have those keywords associated
 * with them.
 *
 * For example, say we have two learning events:
 *
 * learningEvent1 = {
 *  id: 3
 *  course: "comp1501"
 *  etc...
 * }
 *
 * learningEvent2 = {
 *  id: 211
 *  course: "comp2503"
 *  etc...
 * }
 *
 * Then we'd have an index that would have the following kind of maps:
 *
 * "" => [3, 211, ...] (empty string maps to every learning event)
 * "c" => [3, 211, ...]
 * "comp" => [3, 211, ...]
 * "comp1" => [3]
 * "comp2" => [211]
 *
 * Doesn't return duplicate ids, only a set (in the mathematical sense
 * of the word) of ids for any given keyword.
 */
class KeywordIndex {
  /**
   * If you want to be able to filter on learning event properties, add
   * the property key to this array. Watch your casing!
   *
   * Don't go overboard; the index could get pretty monstrous if you go too far.
   */
  static fieldsToIndex = [
    "course",
    "courseNumber",
    "firstName",
    "lastName",
    "room",
    "section",
    "subjectAbbrev",
    "instructorUsername",
    "dow"
  ];

  /**
   * Simple factory.
   *
   * @param {*} learningEvents
   */
  static createFromLearningEvents(learningEvents) {
    const keywordIndex = new KeywordIndex();

    learningEvents.forEach(event => {
      const keywords = KeywordIndex.keywordsFor(event);

      keywords.forEach(keyword => {
        keywordIndex.add(keyword, event.id);
      });
    });

    return keywordIndex;
  }

  static keywordsFor(learningEvent) {
    let allKeywordsForThisEvent = [];

    KeywordIndex.fieldsToIndex.forEach(field => {
      const thingToKeywordify = learningEvent[`${field}`];

      if (thingToKeywordify) {
        const keywordsGenerated = KeywordGenerator.keywordsFrom(
          thingToKeywordify
        );
        allKeywordsForThisEvent = [
          ...allKeywordsForThisEvent,
          ...keywordsGenerated
        ];
      }
    });

    return [...allKeywordsForThisEvent];
  }

  constructor() {
    this.map = new Map();
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
      this.map.set(keyword, _.union([id], this.map.get(keyword)));
    } else {
      this.map.set(keyword, [id]);
    }
  };
}

export default KeywordIndex;
