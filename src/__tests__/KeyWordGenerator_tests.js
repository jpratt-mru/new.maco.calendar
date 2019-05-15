import KeywordGenerator from "../biz-logic/KeywordGenerator";

let keywordGenerator;

beforeEach(() => {
  keywordGenerator = new KeywordGenerator();
});

test("an empty string generates an empty array", () => {
  expect(keywordGenerator.keywordsFrom("")).toEqual([]);
});

test("a single-character string generates an array with just that character", () => {
  expect(keywordGenerator.keywordsFrom("f")).toEqual(["f"]);
});

test("2 characters generates 2 keywords", () => {
  expect(keywordGenerator.keywordsFrom("fo")).toEqual(["f", "fo"]);
});

test("3 characters generates 3 keywords...oh, and all keywords are in lowercase", () => {
  expect(keywordGenerator.keywordsFrom("fOO")).toEqual(["f", "fo", "foo"]);
});
