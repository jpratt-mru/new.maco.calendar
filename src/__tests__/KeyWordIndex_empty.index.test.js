import KeywordIndex from "../biz-logic/KeywordIndex";

let keywordIndex;

beforeEach(() => {
  keywordIndex = new KeywordIndex();
});

test("if index is empty and passed no keywords, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor([]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index is empty and passed 1 keyword, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor(["foo"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index is empty and passed 2 different keywords, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor(["foo", "bar"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index is empty and passed 2 same keywords, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor(["foo", "foo"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index is empty and passed a bunch of keywords, idsFor returns empty collection", () => {
  const matchingIds = keywordIndex.idsFor([
    "foo",
    "bar",
    "baz",
    "qux",
    "foo",
    "w",
    "LIL'ABNER"
  ]);

  expect(matchingIds).toStrictEqual([]);
});
