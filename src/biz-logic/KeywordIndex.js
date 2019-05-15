//
// Provides a way to map keywords to the ids of all
// learning events that have those keywords associated
// with them.
//
// Doesn't return duplicate ids, only a set of ids.
//

class KeywordIndex {
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
      this.map.get(keyword).push(id);
    } else {
      this.map.set(keyword, [id]);
    }
  };

  /**
   *
   */
  isValidKeyword = s => {};
}

export default KeywordIndex;
