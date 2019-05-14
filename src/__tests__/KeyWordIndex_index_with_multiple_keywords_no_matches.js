import KeywordIndex from "../biz-logic/KeywordIndex";

let keywordIndex;

beforeEach(() => {
  keywordIndex = new KeywordIndex();
  keywordIndex.add("a", "1");
  keywordIndex.add("b", "2");
  keywordIndex.add("c", "3");
  keywordIndex.add("d", "4");
});

test("if index has multiple keywords and passed no keyword, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor([]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has multiple keywords and passed a keyword that is not present, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor(["bar"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has multiple keywords and passed 2 keywords that are not present, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor(["bar", "BAZ"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has multiple keywords and passed multiple keywords that are not present, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor(["bar", "BAZ", "Baz"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has multiple keywords and passed a keyword that is present, but has different case, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor(["A"]);

  expect(matchingIds).toStrictEqual([]);
});
