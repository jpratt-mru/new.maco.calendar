import KeywordIndex from "../biz-logic/KeywordIndex";

let keywordIndex;

beforeEach(() => {
  keywordIndex = new KeywordIndex();
  keywordIndex.add("foo", "5");
  keywordIndex.add("foo", "11");
});

test("if index has one keyword and passed that keyword, idsFor returns corresponding id wrapped in array", () => {
  const matchingIds = keywordIndex.idsFor(["foo"]);

  expect(matchingIds).toStrictEqual([["5", "11"]]);
});

test("if index has one keyword and passed 5 keywords (one of them matching), idsFor returns corresponding id wrapped in array and one empty array for each non-matchin", () => {
  const matchingIds = keywordIndex.idsFor([
    "foo",
    "x",
    "wango!!",
    "smoothie",
    "blorpylistic"
  ]);

  expect(matchingIds).toStrictEqual([["5", "11"], [], [], [], []]);
});
