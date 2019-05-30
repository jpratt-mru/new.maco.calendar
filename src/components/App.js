import React from "react";
import MacoCalendar from "./MacoCalendar";
import CalendarEventAndFilterInputBox from "./CalendarEventAndFilterInputBox";
import CalendarEventOrFilterInputBox from "./CalendarEventOrFilterInputBox";
import KeywordIndex from "../biz-logic/KeywordIndex";
import Papa from "papaparse";
import LearningEvents from "../biz-logic/LearningEvents";
import IssuesDetector from "../biz-logic/issueDetectors/IssuesDetector";
import array from "lodash";
import SemesterSelector from "./SemesterSelector";
import Notifications from "./Notifications";
import Semester from "../biz-logic/Semester";
import InfoHeader from "./InfoHeader";

class App extends React.Component {
  state = {
    selectedCsvFile: "",
    allLearningEvents: [],
    displayedLearningEvents: [],
    keywordIndex: null,
    issues: [],
    semester: {},
    validCsvLoaded: false,
    csvMissingFields: [],
    csvMalformedFields: [],
    roomCapacityIssues: [],
    roomDoubleBookingIssues: [],
    instructorDoubleBookingIssues: []
  };

  constructor(props) {
    super(props);

    if (this.learningEventsPresentInLocalStorage()) {
      for (let stateName in this.state) {
        if (localStorage[stateName]) {
          this.state[stateName] = JSON.parse(localStorage.getItem(stateName));
        }
      }
    }
  }

  learningEventsPresentInLocalStorage = () => {
    return localStorage["allLearningEvents"] && localStorage["semester"];
  };

  validCsvFieldsFound = csvRecords => {
    const expectedFields = [
      "course",
      "section",
      "section-capacity",
      "dow",
      "start-time",
      "duration",
      "room",
      "first-name",
      "last-name"
    ];

    const fields = csvRecords.meta.fields.map(x => x.toLowerCase());
    return array.difference(expectedFields, fields).length == 0;
  };

  scheduleURL = () =>
    `https://raw.githubusercontent.com/jpratt-mru/maco.calendar.datafiles/master/${
      this.state.semester.desc
    }.schedule.csv`;

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
              issues: issuesDetector.issues()
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
      "validCsvLoaded"
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

  render() {
    return (
      <>
        <InfoHeader scheduleName={this.state.selectedCsvFile} />

        <SemesterSelector handleScheduleChange={this.handleScheduleChange} />

        <CalendarEventOrFilterInputBox
          handleFiltering={this.handleFiltering}
          keywordIndex={this.state.keywordIndex}
        />

        <CalendarEventAndFilterInputBox
          handleFiltering={this.handleFiltering}
          keywordIndex={this.state.keywordIndex}
        />

        <MacoCalendar
          validCsvLoaded={this.state.validCsvLoaded}
          startingMonday={this.state.semester.startingMonday}
          events={this.state.displayedLearningEvents}
        />

        <Notifications
          validCsvLoaded={this.state.validCsvLoaded}
          csvMissingFields={this.state.csvMissingFields}
          csvMalformedFields={this.state.csvMalformedFields}
          roomCapacityIssues={this.state.roomCapacityIssues}
          roomDoubleBookingIssues={this.state.roomDoubleBookingIssues}
          instructorDoubleBookingIssues={
            this.state.instructorDoubleBookingIssues
          }
        />
      </>
    );
  }
}

export default App;
