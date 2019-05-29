class Semester {
  static semesterOrdinalFromMonth(jsMonth) {
    let semester = "01";
    if (/[4|5]/.test(jsMonth)) {
      semester = "02";
    } else if (/[6|7]/.test(jsMonth)) {
      semester = "03";
    } else if (/[8|9|10|11]/.test(jsMonth)) {
      semester = "04";
    }
    return semester;
  }

  static fromDate(date) {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Semester(year, Semester.semesterOrdinalFromMonth(month));
  }

  static fromDesc(desc) {
    const [year, semesterOrdinal] = desc.split(/\./);
    return new Semester(year, semesterOrdinal);
  }

  constructor(year, semesterOrdinal) {
    Semester.descToEndpoints =
      Semester.descToEndpoints || new Map(Semester.SEMESTER_DATA);

    this.year = year;
    this.semesterOrdinal = semesterOrdinal;
    this.desc = `${this.year}.${this.semesterOrdinal}`;

    const endpoints = Semester.descToEndpoints.get(this.desc);
    [this.startingMonday, this.lastDay] = endpoints;
  }

  static SEMESTER_DATA = [
    ["2019.01", ["2019-01-07", "2019-04-05"]],
    ["2019.02", ["2019-05-06", "2019-06-17"]],
    ["2019.03", ["2019-07-08", "2019-08-19"]],
    ["2019.04", ["2019-09-09", "2019-12-09"]],
    ["2020.01", ["2020-01-06", "2020-04-06"]],
    ["2020.02", ["2020-05-04", "2020-06-16"]],
    ["2020.03", ["2020-07-06", "2020-08-17"]],
    ["2020.04", ["2020-09-07", "2020-12-09"]]
  ];
}

export default Semester;
