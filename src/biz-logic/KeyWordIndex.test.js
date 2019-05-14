import KeywordIndex from "./KeywordIndex";

let keywordIndex;

beforeEach(() => {
  keywordIndex = new KeywordIndex();
});

test("if index is empty and passed no keywords, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor([]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index is not empty and passed no keyword, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor([]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index is not empty and passed keyword that is not present, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor(["bar"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index is not empty and passed only keyword that is present, idsFor returns a collection with that id", () => {
    keywordIndex.add("foo", "1");

    const matchingIds = keywordIndex.idsFor(["foo"]);

    expect(matchingIds).toStrictEqual(["1"]);
});
