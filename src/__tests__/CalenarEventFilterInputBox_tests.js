import CalendarEventFilterInputBox from "../components/CalendarEventFilterInputBox";

let filterBox;

beforeEach(() => {
  filterBox = new CalendarEventFilterInputBox();
});

test("returns an empty array if no filter string", () => {
  const keywords = filterBox.extractedKeywords();

  expect(keywords).toStrictEqual([]);
});

test("returns an empty array if empty filter string", () => {
  const keywords = filterBox.extractedKeywords("");

  expect(keywords).toStrictEqual([]);
});

test("returns an empty array if only whitepace present", () => {
  const oneSpace = filterBox.extractedKeywords(" ");
  const oneTab = filterBox.extractedKeywords("\t");
  const oneCR = filterBox.extractedKeywords("\r");
  const oneLF = filterBox.extractedKeywords("\f");
  const oneNewline = filterBox.extractedKeywords("\n");
  const bunchaWhite = filterBox.extractedKeywords("\n\n  \t\t\r\r\f\r\n   \t");

  expect(oneSpace).toStrictEqual([]);
  expect(oneTab).toStrictEqual([]);
  expect(oneCR).toStrictEqual([]);
  expect(oneLF).toStrictEqual([]);
  expect(oneNewline).toStrictEqual([]);
  expect(bunchaWhite).toStrictEqual([]);
});

test("returns the filter string as-is if no spaces and all lowercase", () => {
  const keywords = filterBox.extractedKeywords("greetings");

  expect(keywords).toStrictEqual(["greetings"]);
});

test("returns the filter string lowercased if no spaces and some uppercase letters present", () => {
  const keywords = filterBox.extractedKeywords("wHATtheWHAT?");

  expect(keywords).toStrictEqual(["whatthewhat?"]);
});

test("returns the filter string without spaces if has leading spaces", () => {
  const oneSpaceKeyword = filterBox.extractedKeywords(" ALLO!");
  const multipleSpaceKeyword = filterBox.extractedKeywords("  \t\t  \tw00t");

  expect(oneSpaceKeyword).toStrictEqual(["allo!"]);
  expect(multipleSpaceKeyword).toStrictEqual(["w00t"]);
});

test("returns the filter string without spaces if has trailing spaces", () => {
  const oneSpaceKeyword = filterBox.extractedKeywords("gALLoot\t");
  const multipleSpaceKeyword = filterBox.extractedKeywords(
    "romper-stomper    \t\t  \t  "
  );

  expect(oneSpaceKeyword).toStrictEqual(["galloot"]);
  expect(multipleSpaceKeyword).toStrictEqual(["romper-stomper"]);
});

test("returns the filter string without spaces if has leading AND trailing spaces", () => {
  const keywords = filterBox.extractedKeywords(" \t   \t   !!fnord???\t     ");

  expect(keywords).toStrictEqual(["!!fnord???"]);
});

test("returns 2 space-stripped keywords if there is one space amidst non-spaces", () => {
  const keywords = filterBox.extractedKeywords(" \t WHAT ho? \t");

  expect(keywords).toEqual(["what", "ho?"]);
});

test("returns 5 space-stripped keywords if there are 4 spaces amidst non-spaces", () => {
  const keywords = filterBox.extractedKeywords(
    " \t get   thee\t\t\n to a    NuNNerY \t"
  );

  expect(keywords).toEqual(["get", "thee", "to", "a", "nunnery"]);
});
