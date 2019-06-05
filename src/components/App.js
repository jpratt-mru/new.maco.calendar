import React from "react";
import MacoCalendar from "./MacoCalendar";
import CalendarEventAndFilterInputBox from "./CalendarEventAndFilterInputBox";
import CalendarEventOrFilterInputBox from "./CalendarEventOrFilterInputBox";
import KeywordIndex from "../biz-logic/KeywordIndex";
import PrintToggleButton from "./PrintToggleButton";
import Papa from "papaparse";
import LearningEvents from "../biz-logic/LearningEvents";
import IssuesDetector from "../biz-logic/issueDetectors/IssuesDetector";
import array from "lodash";
import SemesterSelector from "./SemesterSelector";
import Notifications from "./Notifications";
import Semester from "../biz-logic/Semester";
import InfoHeader from "./InfoHeader";
import { colors } from "../biz-logic/colors";

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

    if (this.learningEventsPresentInLocalStorage()) {
      for (let stateName in this.state) {
        if (localStorage[stateName]) {
          const storedItem = JSON.parse(localStorage.getItem(stateName));
          if (stateName === "keywordIndex") {
            this.state[stateName] = new KeywordIndex(storedItem);
          } else {
            this.state[stateName] = storedItem;
          }
        }
      }
    }
    this.state.printMode = false;
  }

  learningEventsPresentInLocalStorage = () => {
    return localStorage["allLearningEvents"] && localStorage["semester"];
  };

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
    return array.difference(expectedFields, fields).length == 0;
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
        localStorage.clear();

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
            this.saveStateToLocalStorage
          );
        }
      }
    });
  };

  saveStateToLocalStorage = () => {
    const stateThatNeedsSaving = [
      "allLearningEvents",
      "displayedLearningEvents",
      "semester",
      "keywordIndex",
      "selectedCsvFile",
      "validCsvLoaded",
      "csvIssues",
      "roomCapacityIssues",
      "roomDoubleBookingIssues",
      "instructorDoubleBookingIssues"
    ];

    stateThatNeedsSaving.forEach(stateName => {
      localStorage.setItem(stateName, JSON.stringify(this.state[stateName]));
    });
  };

  componentDidMount = () => {
    if (!this.learningEventsPresentInLocalStorage()) {
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
        colorMap.set(courseYear, colors[currColorIndex]);
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
        colorMap.set(subjectAbbr, colors[currColorIndex]);
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
        colorMap.set(course, colors[currColorIndex]);
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
        <div className="container-fluid">
          <InfoHeader
            semester={this.state.semester}
            scheduleName={this.state.selectedCsvFile}
          />

          <div className="row">
            <div className="col-12">
              <SemesterSelector
                handleScheduleChange={this.handleScheduleChange}
              />
            </div>
          </div>

          <PrintToggleButton
            printMode={this.state.printMode}
            handlePrintViewChange={this.handlePrintViewChange}
          />

          <div className="row mt-5">
            <div className="col-9">
              <MacoCalendar
                printMode={this.state.printMode}
                recolor={this.addBackgroundColors}
                validCsvLoaded={this.state.validCsvLoaded}
                startingMonday={this.state.semester.startingMonday}
                events={this.state.displayedLearningEvents}
              />
            </div>
            <div className="col-3">
              <CalendarEventOrFilterInputBox
                handleFiltering={this.handleFiltering}
                keywordIndex={this.state.keywordIndex}
              />

              <CalendarEventAndFilterInputBox
                handleFiltering={this.handleFiltering}
                keywordIndex={this.state.keywordIndex}
              />

              <Notifications
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
        </div>
      </>
    );
  }
}

export default App;
