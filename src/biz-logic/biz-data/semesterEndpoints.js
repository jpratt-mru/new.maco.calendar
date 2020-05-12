/**
 * These are the endpoints (starting MONDAY and last day of semester)
 * that are used by the Semester class.
 *
 * The Monday is just the first Monday of the first FULL week
 * after classes officially start - i.e. the Monday of the first
 * FULL week of classes. (If the first such Monday happens to be a
 * holiday, still use it!)
 *
 * This file will need to be added to, manually, periodically.
 *
 */

export const semesterEndpoints = [
  ["2019.01", ["2019-01-07", "2019-04-05"]],
  ["2019.02", ["2019-05-06", "2019-06-17"]],
  ["2019.03", ["2019-07-08", "2019-08-19"]],
  ["2019.04", ["2019-09-09", "2019-12-09"]],
  ["2020.01", ["2020-01-06", "2020-04-06"]],
  ["2020.02", ["2020-05-04", "2020-06-16"]],
  ["2020.03", ["2020-07-06", "2020-08-17"]],
  ["2020.04", ["2020-09-07", "2020-12-09"]],
  ["2021.01", ["2021-01-04", "2021-04-12"]],
  ["2021.02", ["2021-05-03", "2021-06-14"]],
  ["2021.04", ["2021-09-13", "2021-12-09"]],
  ["2022.01", ["2022-01-10", "2022-04-06"]],
  ["2022.02", ["2022-05-02", "2022-06-13"]],
  ["2022.04", ["2022-09-12", "2022-12-09"]]
];
