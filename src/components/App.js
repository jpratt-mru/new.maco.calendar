import React from "react";
import MacoCalendar from "./MacoCalendar";
import CalendarEventAndFilterInputBox from "./CalendarEventAndFilterInputBox";
import CalendarEventOrFilterInputBox from "./CalendarEventOrFilterInputBox";
import docAsLearningEvent from "../docAsLearningEvent";
import KeywordIndex from "../biz-logic/KeywordIndex";
import Papa from "papaparse";
import GitHub from "github-api";
import LearningEvents from "../biz-logic/LearningEvents";
import Rooms from "../biz-logic/Rooms";
import IssuesDetector from "../biz-logic/issueDetectors/IssuesDetector";
import array from "lodash";
import SemesterSelector from "./SemesterSelector";
import Notifications from "./Notifications";
import Semester from "../biz-logic/Semester";
import InfoHeader from "./InfoHeader";

const LOCAL_STORAGE_KEYWORD_INDEX_KEY = "keyword_index";
const LOCAL_STORAGE_LEARNING_EVENTS_KEY = "learning_events";
const LOCAL_STORAGE_SEMESTER_KEY = "saved_semester";
const LOCAL_STORAGE_CSV_FILENAME_KEY = "loaded_csv_filename";

class App extends React.Component {
  state = {
    selectedCsvFile: "",
    allLearningEvents: [],
    displayedLearningEvents: [],
    keywordIndex: null,
    issues: [],
    semester: {},
    validCsvLoaded: null,
    csvMissingFields: [],
    csvMalformedFields: [],
    roomCapacityIssues: [],
    roomDoubleBookingIssues: [],
    instructorDoubleBookingIssues: [],
    discoveredGithubCSVs: [],
    unrecoverableError: false
  };

  constructor(props) {
    super(props);
    this.rooms = new Rooms();
    this.state.semester = this.storedOrClosestSemester();
    this.state.selectedCsvFile = this.storedOrBlankCsvFileName();
  }

  /**
   * Returns either a Semester that is stored locally, or if there isn't one,
   * the semester that is closest to the current date.
   */
  storedOrClosestSemester = () => {
    const localStorageContents = localStorage.getItem(
      LOCAL_STORAGE_SEMESTER_KEY
    );
    return localStorageContents
      ? JSON.parse(localStorageContents)
      : Semester.fromDate(new Date());
  };

  /**
   * Returns either the name of the csv schedule file last successfully loaded,
   * or a set message.
   */
  storedOrBlankCsvFileName = () => {
    const localStorageContents = localStorage.getItem(
      LOCAL_STORAGE_CSV_FILENAME_KEY
    );
    return localStorageContents
      ? JSON.parse(localStorageContents)
      : "no cached schedule";
  };

  saveStateToLocalStorage = stateName => {
    localStorage.setItem(stateName, JSON.stringify(this.state[stateName]));
  };

  saveCsvFilenameToLocalStorage = () => {
    this.saveStateToLocalStorage("selectedCsvFile");
  };

  saveLearningEventsToLocalStorage = () => {
    this.saveStateToLocalStorage("allLearningEvents");
  };

  saveSemesterToLocalStorage = () => {
    this.saveStateToLocalStorage("semester");
  };

  saveKeywordIndexToLocalStorage = () => {
    this.saveStateToLocalStorage("keywordIndex");

    // localStorage.setItem(
    //   LOCAL_STORAGE_KEYWORD_INDEX_KEY,
    //   keywordIndex.toJSON()
    // );
  };

  populateEventsFromLocalStorage = (
    localStorageSemesterContents,
    localStorageEventsContents
  ) => {
    const localEvents = JSON.parse(localStorageEventsContents);
    const semester = JSON.parse(localStorageSemesterContents);
    const keywordIndex = this.cachedOrNewKeywordIndex(localEvents);

    this.setState({
      allLearningEvents: localEvents,
      displayedLearningEvents: localEvents,
      semester,
      keywordIndex
    });
  };

  loadOrRecreateLearningEvents = () => {
    const localStorageLearningEventsContents = localStorage.getItem(
      LOCAL_STORAGE_LEARNING_EVENTS_KEY
    );

    const localStorageSemesterContents = localStorage.getItem(
      LOCAL_STORAGE_SEMESTER_KEY
    );

    if (!localStorageSemesterContents || !localStorageLearningEventsContents) {
      this.pullLearningEventsFromGithub();
    } else {
      this.populateEventsFromLocalStorage(
        localStorageSemesterContents,
        localStorageLearningEventsContents
      );
    }
  };

  cachedOrNewKeywordIndex = learningEvents => {
    const localStorageIndexContents = localStorage.getItem(
      LOCAL_STORAGE_KEYWORD_INDEX_KEY
    );

    if (!localStorageIndexContents) {
      const newKeywordIndex = KeywordIndex.createFromLearningEvents(
        learningEvents
      );
      this.saveKeywordIndexToLocalStorage(newKeywordIndex);
      return newKeywordIndex;
    } else {
      return KeywordIndex.createFromLocalStorage(localStorageIndexContents);
    }
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
          const learningEvents = new LearningEvents(
            csvRecords.data,
            this.state.semester.startingMonday
          ).events();

          let issuesDetector = new IssuesDetector(learningEvents);

          const displayableLearningEvents = learningEvents
            .filter(event => event.errors.length === 0)
            .map(docAsLearningEvent);

          this.setState({
            allLearningEvents: learningEvents,
            displayedLearningEvents: displayableLearningEvents
          });
          this.saveLearningEventsToLocalStorage();
          this.saveSemesterToLocalStorage();
          const keywordIndex = this.cachedOrNewKeywordIndex(
            displayableLearningEvents
          );
          this.setState({ keywordIndex: keywordIndex });

          this.setState({ issues: issuesDetector.issues() });

          this.saveCsvFilenameToLocalStorage();
        }
      }
    });
  };

  githubRepoContents = async () => {
    const gh = new GitHub();
    const repo = gh.getRepo("jpratt-mru", "maco.calendar.datafiles");
    return repo.getContents();
  };

  componentDidMount = () => {
    this.githubRepoContents().then(value => {
      const dataReturned = value.data;

      const scheduleCSVs = dataReturned
        .filter(result => result.type === "file")
        .map(file => file.name)
        .filter(name => /^20\d\d\.0[1-4]/.test(name));
      this.setState({ discoveredGithubCSVs: scheduleCSVs });
      this.loadOrRecreateLearningEvents();
    });
  };

  matchingLearningEvents = eventIds => {
    return this.state.allLearningEvents.filter(event =>
      eventIds.includes(event.id)
    );
  };

  handleFiltering = targetIds => {
    this.setState({
      displayedLearningEvents: this.matchingLearningEvents(targetIds)
    });
  };

  handleScheduleChange = semester => {
    const semesterPart = semester.substring(0, 7);
    this.setState(
      { semester: Semester.fromDesc(semesterPart), selectedCsvFile: semester },
      this.pullLearningEventsFromGithub
    );
  };

  render() {
    return (
      <>
        <InfoHeader scheduleName={this.state.selectedCsvFile} />

        <SemesterSelector
          csvFiles={this.state.discoveredGithubCSVs}
          handleScheduleChange={this.handleScheduleChange}
        />

        <CalendarEventOrFilterInputBox
          handleFiltering={this.handleFiltering}
          keywordIndex={this.state.keywordIndex}
        />

        <CalendarEventAndFilterInputBox
          handleFiltering={this.handleFiltering}
          keywordIndex={this.state.keywordIndex}
        />

        <MacoCalendar
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
