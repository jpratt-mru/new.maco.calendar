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

test("1 match", () => {
  expect(keywordIndex.idsFor(["a"])).toStrictEqual([["1"]]);
  expect(keywordIndex.idsFor(["b"])).toStrictEqual([["1", "2"]]);
  expect(keywordIndex.idsFor(["c"])).toStrictEqual([["3"]]);
  expect(keywordIndex.idsFor(["d"])).toStrictEqual([["4", "5"]]);
});

test("2 matches", () => {
  expect(keywordIndex.idsFor(["a", "b"])).toStrictEqual([["1"], ["1", "2"]]);
  expect(keywordIndex.idsFor(["a", "c"])).toStrictEqual([["1"], ["3"]]);
  expect(keywordIndex.idsFor(["a", "d"])).toStrictEqual([["1"], ["4", "5"]]);
  expect(keywordIndex.idsFor(["b", "c"])).toStrictEqual([["1", "2"], ["3"]]);
  expect(keywordIndex.idsFor(["b", "d"])).toStrictEqual([
    ["1", "2"],
    ["4", "5"]
  ]);
  expect(keywordIndex.idsFor(["c", "d"])).toStrictEqual([["3"], ["4", "5"]]);
});

test("3 matches", () => {
  expect(keywordIndex.idsFor(["a", "b", "c"])).toStrictEqual([
    ["1"],
    ["1", "2"],
    ["3"]
  ]);
  expect(keywordIndex.idsFor(["b", "c", "d"])).toStrictEqual([
    ["1", "2"],
    ["3"],
    ["4", "5"]
  ]);
  expect(keywordIndex.idsFor(["a", "b", "d"])).toStrictEqual([
    ["1"],
    ["1", "2"],
    ["4", "5"]
  ]);
  expect(keywordIndex.idsFor(["a", "c", "d"])).toStrictEqual([
    ["1"],
    ["3"],
    ["4", "5"]
  ]);
});

test("all match", () => {
  expect(keywordIndex.idsFor(["a", "b", "c", "d"])).toStrictEqual([
    ["1"],
    ["1", "2"],
    ["3"],
    ["4", "5"]
  ]);
});
