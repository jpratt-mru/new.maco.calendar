import { semesterEndpoints } from "./biz-data/semesterEndpoints";

class Semester {
  /**
   * Creates a new Semester from the name of a schedule
   * file name.
   *
   * It is assumed the schedule file starts with 20YY.SS,
   * where 20YY is a year and SS is a semester code
   * (01 -> winter, 02 -> spring, 03 -> summer, 04 -> fall)
   *
   * There's no error checking on the fileName, as the
   * SemesterSelector only displays files that start
   * with the expected format.
   *
   * @param {*} fileName a schedule
   * @returns a new Semester based on the fileName's year and ordinal
   */
  static fromScheduleName(fileName) {
    const semesterPartOfFileName = fileName.substring(0, 7);
    const [year, semesterCode] = semesterPartOfFileName.split(/\./);

    return new Semester(year, semesterCode);
  }

  constructor(year, semesterCode) {
    this.year = year;
    this.semesterCode = semesterCode;
    this.desc = `${this.year}.${this.semesterCode}`;

    this.initEndpoints(this.desc);
  }

  /**
   * Initializes the starting Monday and last day of a
   * given semester from that semester's desc.
   *
   * This is done through a simple map lookup with the
   * contents of the array found in semesterEndpoints.js
   *
   * @param {*} desc the semester desc (like 2019.04)
   */
  initEndpoints(desc) {
    [this.startingMonday, this.lastDay] = new Map(semesterEndpoints).get(desc);
  }
}

export default Semester;
