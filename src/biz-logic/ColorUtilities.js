import { learningEventColors } from "../biz-logic/learningEventColors";

class ColorUtilities {
  static coloredEvent(event, color) {
    event.backgroundColor = color;
  }

  static addColorByYear(learningEvents) {
    const colorMap = new Map();

    let currColorIndex = 0;
    learningEvents.forEach(event => {
      let courseYear = event["course-number"].substring(0, 1);
      if (!colorMap.has(courseYear)) {
        colorMap.set(courseYear, learningEventColors[currColorIndex]);
        currColorIndex++;
      }
    });

    learningEvents.forEach(event => {
      let courseYear = event["course-number"].substring(0, 1);
      event.backgroundColor = colorMap.get(courseYear);
    });

    // this.setState({ displayedLearningEvents: coloredEvents });
  }

  static addColorByCourseAbbr(learningEvents) {
    const colorMap = new Map();

    let currColorIndex = 0;
    learningEvents.forEach(event => {
      let subjectAbbr = event["subject-abbr"];
      if (!colorMap.has(subjectAbbr)) {
        colorMap.set(subjectAbbr, learningEventColors[currColorIndex]);
        currColorIndex++;
      }
    });

    learningEvents.forEach(event => {
      event.backgroundColor = colorMap.get(event["subject-abbr"]);
    });
  }

  static addColorByCourse(learningEvents) {
    const colorMap = new Map();

    let currColorIndex = 0;
    learningEvents.forEach(event => {
      let course = event["course"];
      if (!colorMap.has(course)) {
        colorMap.set(course, learningEventColors[currColorIndex]);
        currColorIndex++;
      }
    });

    learningEvents.forEach(event => {
      event.backgroundColor = colorMap.get(event["course"]);
    });
  }

  static addBackgroundColors(learningEvents) {
    let justSubjectAbbr = learningEvents.map(event => event["subject-abbr"]);

    const uniqSubjectAbbr = new Set(justSubjectAbbr);

    let justYears = learningEvents.map(event =>
      event["course-number"].substring(0, 1)
    );

    const uniqYears = new Set(justYears);

    if (uniqSubjectAbbr.size > 1) {
      ColorUtilities.addColorByCourseAbbr(learningEvents);
    } else if (uniqYears.size > 1) {
      ColorUtilities.addColorByYear(learningEvents);
    } else {
      ColorUtilities.addColorByCourse(learningEvents);
    }
  }
}
export default ColorUtilities;
