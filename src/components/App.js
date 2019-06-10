import React from "react";
import Papa from "papaparse"; // for CSV parsing
import _ from "lodash"; // for difference()

// these are used in render()
import ToolBar from "./ToolBar";
import InfoHeader from "./InfoHeader";
import SemesterSelector from "./SemesterSelector";
import MacoCalendar from "./MacoCalendar";
import Sidebar from "./Sidebar";

// these are business logic objects
import KeywordIndex from "../biz-logic/KeywordIndex";
import LearningEvents from "../biz-logic/LearningEvents";
import IssuesDetector from "../biz-logic/issueDetectors/IssuesDetector";
import Semester from "../biz-logic/Semester";

import { learningEventColors } from "../biz-logic/learningEventColors";
import LocalStorageUtilities from "../biz-logic/LocalStorageUtilities";

class App extends React.Component {
  state = {
    selectedCsvFile: "",
    allLearningEvents: [],
    displayedLearningEvents: [],
    keywordIndex: null,
    semester: {},
    validCsvLoaded: false,
    csvIssues: [],
    roomCapacityIssues: [],
    roomDoubleBookingIssues: [],
    instructorDoubleBookingIssues: [],
    printMode: false
  };

  constructor(props) {
    super(props);

    LocalStorageUtilities.initFromLocalStorage(this.state);
  }

  validCsvFieldsFound = csvRecords => {
    const expectedFields = [
      "course",
      "section",
      "sectioncapacity",
      "dow",
      "startingtime",
      "duration",
      "room",
      "firstname",
      "lastname"
    ];

    const fields = csvRecords.meta.fields.map(x => x.toLowerCase());
    return _.difference(expectedFields, fields).length == 0;
  };

  scheduleURL = () =>
    `https://raw.githubusercontent.com/jpratt-mru/maco.calendar.datafiles/master/${
      this.state.selectedCsvFile
    }`;

  pullLearningEventsFromGithub = () => {
    Papa.parse(this.scheduleURL(), {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: csvRecords => {
        LocalStorageUtilities.clearStorage();

        this.setState({
          validCsvLoaded: this.validCsvFieldsFound(csvRecords)
        });

        if (this.state.validCsvLoaded) {
          const allLearningEvents = new LearningEvents(
            csvRecords.data,
            this.state.semester.startingMonday
          ).events();

          const issuesDetector = new IssuesDetector(allLearningEvents);

          const keywordIndex = KeywordIndex.createFromLearningEvents(
            allLearningEvents
          );

          const displayedLearningEvents = allLearningEvents.filter(
            event => event.isDisplayable
          );

          this.setState(
            {
              allLearningEvents,
              displayedLearningEvents,
              keywordIndex,
              issues: issuesDetector,
              csvIssues: issuesDetector.csvIssues(),
              roomCapacityIssues: issuesDetector.roomCapacityIssues(),
              roomDoubleBookingIssues: issuesDetector.roomDoubleBookingIssues(),
              instructorDoubleBookingIssues: issuesDetector.instructorDoubleBookingIssues()
            },
            LocalStorageUtilities.saveStateToLocalStorage
          );
        }
      }
    });
  };

  componentDidMount = () => {
    if (!LocalStorageUtilities.learningEventsPresentInLocalStorage()) {
      this.pullLearningEventsFromGithub();
    }
  };

  matchingLearningEvents = learningEventIds => {
    return this.state.allLearningEvents.filter(learningEvent =>
      learningEventIds.includes(learningEvent.id)
    );
  };

  coloredEvent = (event, color) => {
    event.backgroundColor = color;
  };

  addColorByYear = () => {
    const colorMap = new Map();

    let currColorIndex = 0;
    this.state.displayedLearningEvents.forEach(event => {
      let courseYear = event["course-number"].substring(0, 1);
      if (!colorMap.has(courseYear)) {
        colorMap.set(courseYear, learningEventColors[currColorIndex]);
        currColorIndex++;
      }
    });

    this.state.displayedLearningEvents.forEach(event => {
      let courseYear = event["course-number"].substring(0, 1);
      this.coloredEvent(event, colorMap.get(courseYear));
    });

    // this.setState({ displayedLearningEvents: coloredEvents });
  };

  addColorByCourseAbbr = () => {
    const colorMap = new Map();

    let currColorIndex = 0;
    this.state.displayedLearningEvents.forEach(event => {
      let subjectAbbr = event["subject-abbr"];
      if (!colorMap.has(subjectAbbr)) {
        colorMap.set(subjectAbbr, learningEventColors[currColorIndex]);
        currColorIndex++;
      }
    });

    this.state.displayedLearningEvents.forEach(event => {
      this.coloredEvent(event, colorMap.get(event["subject-abbr"]));
    });
  };

  addColorByCourse = () => {
    const colorMap = new Map();

    let currColorIndex = 0;
    this.state.displayedLearningEvents.forEach(event => {
      let course = event["course"];
      if (!colorMap.has(course)) {
        colorMap.set(course, learningEventColors[currColorIndex]);
        currColorIndex++;
      }
    });

    this.state.displayedLearningEvents.forEach(event => {
      this.coloredEvent(event, colorMap.get(event["course"]));
    });
  };

  addBackgroundColors = () => {
    let justSubjectAbbr = this.state.displayedLearningEvents.map(
      event => event["subject-abbr"]
    );

    const uniqSubjectAbbr = new Set(justSubjectAbbr);

    let justYears = this.state.displayedLearningEvents.map(event =>
      event["course-number"].substring(0, 1)
    );

    const uniqYears = new Set(justYears);

    if (uniqSubjectAbbr.size > 1) {
      this.addColorByCourseAbbr();
    } else if (uniqYears.size > 1) {
      this.addColorByYear();
    } else {
      this.addColorByCourse();
    }
  };

  handleFiltering = targetLearningIds => {
    this.setState({
      displayedLearningEvents: this.matchingLearningEvents(targetLearningIds)
    });
  };

  handleScheduleChange = scheduleFileName => {
    const semesterPart = scheduleFileName.substring(0, 7);
    this.setState(
      {
        semester: Semester.fromDesc(semesterPart),
        selectedCsvFile: scheduleFileName
      },
      this.pullLearningEventsFromGithub
    );
  };

  handlePrintViewChange = () => {
    this.setState({ printMode: !this.state.printMode });
  };

  render() {
    return (
      <>
        <ToolBar
          printMode={this.state.printMode}
          handlePrintViewChange={this.handlePrintViewChange}
          semester={this.state.semester}
          events={this.state.displayedLearningEvents}
        />

        <InfoHeader
          semester={this.state.semester}
          scheduleName={this.state.selectedCsvFile}
        />
        <div className="container-fluid">
          <SemesterSelector handleScheduleChange={this.handleScheduleChange} />

          <div className="row mt-3">
            <MacoCalendar
              printMode={this.state.printMode}
              recolor={this.addBackgroundColors}
              validCsvLoaded={this.state.validCsvLoaded}
              startingMonday={this.state.semester.startingMonday}
              events={this.state.displayedLearningEvents}
            />

            <Sidebar
              handleFiltering={this.handleFiltering}
              keywordIndex={this.state.keywordIndex}
              validCsvLoaded={this.state.validCsvLoaded}
              csvIssues={this.state.csvIssues}
              roomCapacityIssues={this.state.roomCapacityIssues}
              roomDoubleBookingIssues={this.state.roomDoubleBookingIssues}
              instructorDoubleBookingIssues={
                this.state.instructorDoubleBookingIssues
              }
            />
          </div>
        </div>
      </>
    );
  }
}

export default App;
