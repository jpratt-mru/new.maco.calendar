import KeywordIndex from "../biz-logic/KeywordIndex";

let keywordIndex;

beforeEach(() => {
  keywordIndex = new KeywordIndex();
  keywordIndex.add("a", "1");
  keywordIndex.add("b", "1");
  keywordIndex.add("b", "2");
  keywordIndex.add("c", "3");
  keywordIndex.add("d", "4");
  keywordIndex.add("d", "5");
});

test("1 match, 1 non-match", () => {
  expect(keywordIndex.idsFor(["foo", "d"])).toStrictEqual([[], ["4", "5"]]);
});

test("1 match, 2 non-match", () => {
  expect(keywordIndex.idsFor(["a", "foo", "x"])).toStrictEqual([["1"], [], []]);
});

test("2 match, 1 non-match", () => {
  expect(keywordIndex.idsFor(["a", "foo", "d"])).toStrictEqual([
    ["1"],
    [],
    ["4", "5"]
  ]);
});

test("2 match, 2 non-match", () => {
  expect(keywordIndex.idsFor(["blort", "a", "foo", "d"])).toStrictEqual([
    [],
    ["1"],
    [],
    ["4", "5"]
  ]);
});
