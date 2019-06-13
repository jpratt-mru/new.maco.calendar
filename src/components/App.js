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

import LocalStorageUtilities from "../biz-logic/utilities/LocalStorageUtilities";
import ColorUtilities from "../biz-logic/utilities/ColorUtilities";

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
    this.calendar = React.createRef();
    LocalStorageUtilities.initFromLocalStorage(this.state);
  }

  componentDidMount = () => {
    if (!LocalStorageUtilities.learningEventsPresentInLocalStorage()) {
      this.pullLearningEventsFromGithub();
    }
  };

  pullLearningEventsFromGithub = () => {
    Papa.parse(this.rawScheduleURL(), {
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

  rawScheduleURL = () =>
    `https://raw.githubusercontent.com/jpratt-mru/maco.calendar.datafiles/master/${
      this.state.selectedCsvFile
    }`;

  githubScheduleURL = () =>
    `https://github.com/jpratt-mru/maco.calendar.datafiles/blob/master/${
      this.state.selectedCsvFile
    }`;

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

    // get just the lowercased field names from the Papa
    // records and if they are the same return true; otherwise
    // return false
    const fields = csvRecords.meta.fields.map(x => x.toLowerCase());
    return _.difference(expectedFields, fields).length == 0;
  };

  handleFiltering = targetLearningIds => {
    this.setState({
      displayedLearningEvents: this.matchingLearningEvents(targetLearningIds)
    });
  };

  matchingLearningEvents = learningEventIds => {
    return this.state.allLearningEvents.filter(learningEvent =>
      learningEventIds.includes(learningEvent.id)
    );
  };

  addBackgroundColors = () => {
    ColorUtilities.addBackgroundColors(this.state.displayedLearningEvents);
  };

  handleScheduleChange = scheduleFileName => {
    this.setState(
      {
        semester: Semester.fromScheduleName(scheduleFileName),
        selectedCsvFile: scheduleFileName
      },
      this.pullLearningEventsFromGithub
    );
  };

  handlePrint = () => {
    const calendarTitle = prompt("Title for printed calendar?");
    if (calendarTitle) {
      document.getElementById(
        "printed-calendar-title"
      ).innerHTML = calendarTitle;
    } else {
      document.getElementById("printed-calendar-title").innerHTML = "Schedule";
    }
    this.calendar.current.print();
    document.getElementById("printed-calendar-title").innerHTML = "Schedule";
  };

  render() {
    return (
      <>
        <ToolBar
          printMode={this.state.printMode}
          handlePrint={this.handlePrint}
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
              ref={this.calendar}
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
              csvFileName={this.githubScheduleURL()}
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
