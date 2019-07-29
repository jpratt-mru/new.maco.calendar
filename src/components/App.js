import React from "react";
import Papa from "papaparse"; // for CSV parsing
import _ from "lodash"; // for difference()
import Dropzone from "react-dropzone";

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
    this.calendar = React.createRef(); // used for printing
    LocalStorageUtilities.initFromLocalStorage(this.state);
  }

  componentDidMount = () => {
    if (!LocalStorageUtilities.learningEventsPresentInLocalStorage()) {
      this.pullLearningEventsFromGithub();
    }
  };

  parseCsvRecords = records => {
    LocalStorageUtilities.clearStorage();

    this.setState({
      validCsvLoaded: this.validCsvFieldsFound(records)
    });

    if (this.state.validCsvLoaded) {
      const allLearningEvents = new LearningEvents(
        records.data,
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
        () => LocalStorageUtilities.saveStateToLocalStorage(this.state)
      );
    }
  };

  pullLearningEventsFromGithub = () => {
    Papa.parse(this.rawScheduleURL(), {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: csvRecords => {
        this.parseCsvRecords(csvRecords);
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

  /**
   * Called on every keyup that happens as text is entered in either
   * of the filter text inputs.
   */
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

  /**
   * Called from `MacoCalendar`.
   * We want to re-color all events as filtering happens.
   */
  addBackgroundColors = () => {
    ColorUtilities.addBackgroundColors(this.state.displayedLearningEvents);
  };

  /**
   * Called when a new schedule is chosen from the SemesterSelector dropdown.
   */
  handleScheduleChange = scheduleFileName => {
    this.setState(
      {
        semester: Semester.fromScheduleName(scheduleFileName),
        selectedCsvFile: scheduleFileName
      },
      this.pullLearningEventsFromGithub
    );
  };

  /**
   * Called when the PrintButton is clicked.
   *
   * It changes the text in a hidden div (#printed-calendar-title) that is only shown
   * when printing happens (see `public/printstyles.css`), calls the `print`
   * function living in `MacoCalendar` via a React reference, and then resets
   * the hidden div text.
   */
  handlePrint = () => {
    // let the user choose a title to display on the printed calendar, using
    // an old-school broswer prompt
    const calendarTitle = prompt("Title for printed calendar?", "Schedule");
    this.setPrintCalendarTitle(calendarTitle);
    this.calendar.current.print();
    this.setPrintCalendarTitle("Schedule");
  };

  setPrintCalendarTitle = text => {
    const title = text ? text : "Schedule";

    document.getElementById("printed-calendar-title").innerHTML = title;
  };

  processDroppedFile = acceptedFiles => {
    const reader = new FileReader();
    reader.onabort = () => console.log("file reading was aborted");
    reader.onerror = () => console.log("file reading has failed");
    reader.onload = () => {
      const scheduleFileName = acceptedFiles[0].name;
      this.setState({
        semester: Semester.fromScheduleName(scheduleFileName),
        selectedCsvFile: scheduleFileName
      });
      const binaryStr = reader.result;
      const data = Papa.parse(binaryStr, {
        header: true,
        skipEmptyLines: true
      });
      this.parseCsvRecords(data);
    };

    acceptedFiles.forEach(file => reader.readAsBinaryString(file));
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

          <Dropzone onDrop={this.processDroppedFile}>
            {({ getRootProps, getInputProps }) => (
              <div className="row">
                <div className="col-3" {...getRootProps()}>
                  <input {...getInputProps()} />
                  <button className="btn btn-outline-primary mt-3">
                    Click here to upload a CSV.
                  </button>
                </div>
              </div>
            )}
          </Dropzone>

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
