class KeywordGenerator {
  constructor() {}

  /**
   * Returns a collection of all keywords for a given string s of sizes 1 through n (where n is the length
   * of the string). All the keywords will be lowercase.
   *
   * It is assumed the given string has NO whitespace in it.
   *
   * So, for example, COMP1105 would return
   * [c, co, com, comp, comp1, comp11, comp1105]
   */
  keywordsFrom = s => {
    const result = [];
    let lastPush = "";

    Array.from(s).forEach(c => {
      const toPush = (lastPush + c).toLowerCase();
      result.push(toPush);
      lastPush = toPush;
    });

    return ["", ...result];
  };
}

export default KeywordGenerator;
