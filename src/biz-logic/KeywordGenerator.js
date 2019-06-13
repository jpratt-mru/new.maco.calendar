class KeywordGenerator {
  /**
   * Returns a collection of all keywords for a given string s of sizes 0
   * through n (where n is the length of the string). We include the empty
   * string so that when user is filtering and then deletes a filter
   * completely, all learning events will be shown - **every** learning event
   * has the keyword `""`.
   *
   * All the keywords will be lowercase.
   *
   * It is assumed the given string has NO whitespace in it.
   *
   * So, for example, COMP1105 would return
   * [c, co, com, comp, comp1, comp11, comp1105]
   */
  static keywordsFrom = text => {
    let keywords = [""];
    let lastKeywordAdded = "";

    Array.from(text).forEach(c => {
      const keyword = (lastKeywordAdded + c).toLowerCase();
      keywords = [...keywords, keyword];
      lastKeywordAdded = keyword;
    });

    return keywords;
  };
}

export default KeywordGenerator;
