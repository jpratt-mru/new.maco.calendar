import KeywordIndex from "../biz-logic/KeywordIndex";

let keywordIndex;

beforeEach(() => {
  keywordIndex = new KeywordIndex();
});

test("adding a keyword with an id it already has does not add a duplicate entry", () => {
  keywordIndex.add("c", "1");
  keywordIndex.add("d", "2");
  keywordIndex.add("c", "1");
  keywordIndex.add("c", "2");

  const matchingIds = keywordIndex.idsFor(["c"]);

  expect(matchingIds).toStrictEqual([["1", "2"]]);
});
