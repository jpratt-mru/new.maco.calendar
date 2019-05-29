import Semester from "../biz-logic/Semester";

beforeEach(() => {});

test("has a desc", () => {
  expect(Semester.fromDate(new Date(2019, 3))).toHaveProperty(
    "desc",
    "2019.01"
  );

  expect(Semester.fromDate(new Date(2020, 5))).toHaveProperty(
    "desc",
    "2020.02"
  );

  expect(Semester.fromDate(new Date(2020, 7))).toHaveProperty(
    "desc",
    "2020.03"
  );

  expect(Semester.fromDate(new Date(2020, 11))).toHaveProperty(
    "desc",
    "2020.04"
  );
});

test("has a startingMonday", () => {
  expect(Semester.fromDesc("2019.01")).toHaveProperty(
    "startingMonday",
    "2019-01-07"
  );

  expect(Semester.fromDesc("2019.02")).toHaveProperty(
    "startingMonday",
    "2019-05-06"
  );

  expect(Semester.fromDesc("2019.03")).toHaveProperty(
    "startingMonday",
    "2019-07-08"
  );

  expect(Semester.fromDesc("2019.04")).toHaveProperty(
    "startingMonday",
    "2019-09-09"
  );
});

test("has a lastDay", () => {
  expect(Semester.fromDesc("2019.01")).toHaveProperty("lastDay", "2019-04-05");

  expect(Semester.fromDesc("2019.02")).toHaveProperty("lastDay", "2019-06-17");

  expect(Semester.fromDesc("2019.03")).toHaveProperty("lastDay", "2019-08-19");

  expect(Semester.fromDesc("2019.04")).toHaveProperty("lastDay", "2019-12-09");
});
