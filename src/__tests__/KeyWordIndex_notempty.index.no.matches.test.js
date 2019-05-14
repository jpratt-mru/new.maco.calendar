import KeywordIndex from "../biz-logic/KeywordIndex";

let keywordIndex;

beforeEach(() => {
  keywordIndex = new KeywordIndex();
});

test("if index has one keyword and passed no keyword, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor([]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has one keyword and passed a keyword that is not present, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor(["bar"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has one keyword and passed 2 keywords that are not present, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor(["bar", "BAZ"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has one keyword and passed multiple keywords with repetition that are not present, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor(["bar", "BAZ", "bar", "bar", "Baz"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has one keyword and passed a keyword that is present, but has different case, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor(["FOO"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has one keyword and passed multiple keywords with repetition that are not present, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor(["Foo", "BAZ", "fOo", "bar", "Baz"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has 2 keywords and passed a keyword that is not present, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");
  keywordIndex.add("BAr", "2");

  const matchingIds = keywordIndex.idsFor(["x"]);

  expect(matchingIds).toStrictEqual([]);
});

test("if index has 2 keywords and passed multiple keywords that are not present, idsFor returns empty collection", () => {
  keywordIndex.add("foo", "1");
  keywordIndex.add("BAr", "2");

  const matchingIds = keywordIndex.idsFor(["x", "FOO", "FOO", "bar", "baz"]);

  expect(matchingIds).toStrictEqual([]);
});
