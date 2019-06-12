import { learningEventColors } from "../biz-logic/biz-data/learningEventColors";
import _ from "lodash"; // for uniq()

class ColorUtilities {
  /**
   * The idea here is to change the background color of
   * learning events based on the number of events currently
   * being shown on the calendar.
   *
   * There are some easily distinguishable colors found
   * in learningEventColors.js - if the number of **unique**
   * courses being displayed is <= that number, then we'll
   * just use those colors and be done with it.
   *
   * If there are more courses being shown than colors,
   * then we'll color by **subject** if more than one subject
   * is present, then by **course level** (1xxx, 2xxx, etc),
   * and finally just color everything grey otherwise.
   *
   * @param {*} learningEvents
   */

  static addBackgroundColors(learningEvents) {
    if (
      ColorUtilities.numUniqueCoursesIn(learningEvents) <=
      learningEventColors.length
    ) {
      ColorUtilities.addColorByCourse(learningEvents);
    } else if (ColorUtilities.numUniqueSubjectsIn(learningEvents) > 1) {
      ColorUtilities.addColorBySubject(learningEvents);
    } else if (ColorUtilities.numCourseLevelsIn(learningEvents) > 1) {
      ColorUtilities.addColorByYear(learningEvents);
    } else {
      ColorUtilities.addDefaultColor(learningEvents);
    }
  }

  static numUniqueCoursesIn(learningEvents) {
    const justCourses = learningEvents.map(event => event["course"]);

    return _.uniq(justCourses).length;
  }

  static numUniqueSubjectsIn(learningEvents) {
    const justSubjectAbbr = learningEvents.map(event => event["subjectAbbrev"]);

    return _.uniq(justSubjectAbbr).length;
  }

  static numCourseLevelsIn(learningEvents) {
    const courseNumbersLeadingNumbers = learningEvents.map(event =>
      event["courseNumber"].substring(0, 1)
    );

    return _.uniq(courseNumbersLeadingNumbers).length;
  }

  static addColorByYear(learningEvents) {
    this.addColorByKeyFunction(learningEvents, event =>
      event["courseNumber"].substring(0, 1)
    );
  }

  static addColorBySubject(learningEvents) {
    this.addColorByKeyFunction(learningEvents, event => event["subjectAbbrev"]);
  }

  static addColorByCourse(learningEvents) {
    this.addColorByKeyFunction(learningEvents, event => event["course"]);
  }

  static addDefaultColor(learningEvents) {
    learningEvents.forEach(event => {
      event.backgroundColor = "#d9d9d9";
    });
  }

  static addColorByKeyFunction(learningEvents, keyGeneratingFunction) {
    const colorMap = ColorUtilities.colorMap(
      learningEvents,
      keyGeneratingFunction
    );

    this.applyColorMapToEvents(colorMap, learningEvents, keyGeneratingFunction);
  }

  static colorMap(learningEvents, keyFromEvent) {
    const colorMap = new Map();

    let currColorIndex = 0;
    learningEvents.forEach(event => {
      let key = keyFromEvent(event);
      if (!colorMap.has(key)) {
        colorMap.set(key, learningEventColors[currColorIndex]);
        currColorIndex++;
      }
    });

    return colorMap;
  }

  static applyColorMapToEvents(colorMap, learningEvents, keyFromEvent) {
    learningEvents.forEach(event => {
      let key = keyFromEvent(event);
      event.backgroundColor = colorMap.get(key);
    });
  }
}
export default ColorUtilities;
