import KeywordIndex from "../biz-logic/KeywordIndex";

let keywordIndex;

beforeEach(() => {
  keywordIndex = new KeywordIndex();
});

const expectToHaveSameIds = (array1, array2) => {
  expect(array1.sort()).toEqual(array2.sort());
};

test("if index has one word and passed the only keyword that is present, idsFor returns a collection with that id", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor(["foo"]);

  expectToHaveSameIds(matchingIds, ["1"]);
});

test("if index has one word and passed multiple keywords all the same, idsFor returns a collection with that id ONCE", () => {
  keywordIndex.add("foo", "1");

  const matchingIds = keywordIndex.idsFor(["foo", "foo", "foo"]);

  expectToHaveSameIds(matchingIds, ["1"]);
});

test("if index has two words different case and passed that keyword multiple times and multiple cases,  idsFor returns a collection with that id ONCE for each case", () => {
  keywordIndex.add("foo", "1");
  keywordIndex.add("FOO", "2");

  const matchingIds = keywordIndex.idsFor(["FOO", "foo", "FoO", "FOO"]);

  expectToHaveSameIds(matchingIds, ["1", "2"]);
  expectToHaveSameIds(matchingIds, ["2", "1"]);
});

test("if index has two words different case and passed that keyword multiple times and multiple cases,  idsFor returns a collection with that id ONCE for each case", () => {
  keywordIndex.add("foo", "1");
  keywordIndex.add("FOO", "2");
  keywordIndex.add("bar", "3");
  keywordIndex.add("BaZ", "4");
  keywordIndex.add("QUx", "5");

  const matchingIds = keywordIndex.idsFor([
    "x",
    "QUx",
    "BaZ",
    "FOO",
    "foo",
    "FoO",
    "FOO"
  ]);

  expectToHaveSameIds(matchingIds, ["1", "2", "4", "5"]);
  expectToHaveSameIds(matchingIds, ["2", "1", "4", "5"]);
  expectToHaveSameIds(matchingIds, ["1", "2", "5", "4"]);
  expectToHaveSameIds(matchingIds, ["5", "4", "2", "1"]);
});
