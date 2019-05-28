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
import CsvMissingFields from "./CsvMissingFields";
import CsvMalformedFields from "./CsvMalformedFields";
import RoomCapacityIssues from "./RoomCapacityIssues";
import RoomDoubleBookingIssues from "./RoomDoubleBookingIssues";
import InstructorDoubleBookingIssues from "./InstructorDoubleBookingIssues";
import SemesterSelector from "./SemesterSelector";

const LOCAL_STORAGE_KEYWORD_INDEX_KEY = "keyword_index";
const LOCAL_STORAGE_LEARNING_EVENTS_KEY = "learning_events";

class App extends React.Component {
  state = {
    allLearningEvents: [],
    filteredLearningEvents: [],
    keywordIndex: null,
    issues: [],
    semester: "", // not  date...it's year.semester
    startingMonday: "2019-09-09",
    lastDayOfClasses: "",
    validCsvLoaded: null,
    csvMissingFields: [],
    csvMalformedFields: [],
    roomCapacityIssues: [],
    roomDoubleBookingIssues: [],
    instructorDoubleBookingIssues: [],
    discoveredGithubCSVs: [],
    semesterMetadata: []
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.rooms = new Rooms();
  }

  saveLearningEventsToLocalStorage = () => {
    const copy = [...this.state.allLearningEvents];
    localStorage.setItem(
      LOCAL_STORAGE_LEARNING_EVENTS_KEY,
      JSON.stringify(copy)
    );
  };

  populateEventsFromLocalStorage = localStorageEventsContents => {
    const localEvents = JSON.parse(localStorageEventsContents);
    this.setState({
      allLearningEvents: localEvents,
      filteredLearningEvents: localEvents
    });
    const keywordIndex = this.cachedOrNewKeywordIndex(
      localEvents,
      this.saveKeywordIndexToLocalStorage
    );
    this.setState({ keywordIndex });
  };

  loadOrRecreateLearningEvents = () => {
    const localStorageLearningEventsContents = localStorage.getItem(
      LOCAL_STORAGE_LEARNING_EVENTS_KEY
    );

    if (!localStorageLearningEventsContents) {
      this.pullLearningEventsFromGithub();
    } else {
      this.populateEventsFromLocalStorage(localStorageLearningEventsContents);
    }
  };

  cachedOrNewKeywordIndex = (learningEvents, saveIndex) => {
    const localStorageIndexContents = localStorage.getItem(
      LOCAL_STORAGE_KEYWORD_INDEX_KEY
    );

    if (!localStorageIndexContents) {
      const newKeywordIndex = KeywordIndex.createFromLearningEvents(
        learningEvents
      );
      saveIndex(newKeywordIndex);
      return newKeywordIndex;
    } else {
      return KeywordIndex.createFromLocalStorage(localStorageIndexContents);
    }
  };

  saveKeywordIndexToLocalStorage = keywordIndex => {
    localStorage.setItem(
      LOCAL_STORAGE_KEYWORD_INDEX_KEY,
      keywordIndex.toJSON()
    );
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

  pullLearningEventsFromGithub = () => {
    console.log("pulled in ", this.state.semester);
    Papa.parse(
      `https://raw.githubusercontent.com/jpratt-mru/maco.calendar.datafiles/master/${
        this.state.semester
      }.schedule.csv`,
      {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: csvRecords => {
          localStorage.clear();
          console.log("papa:", csvRecords);
          this.setState({
            validCsvLoaded: this.validCsvFieldsFound(csvRecords)
          });

          if (this.state.validCsvLoaded) {
            let builtLearningEvents = new LearningEvents(
              csvRecords.data,
              this.state.startingMonday
            );

            const rawEvents = builtLearningEvents.events();

            let issuesDetector = new IssuesDetector(rawEvents);
            console.log("issuesDetector", issuesDetector);

            const displayableLearningEvents = builtLearningEvents
              .events()
              .filter(event => event.errors.length === 0)
              .map(docAsLearningEvent);

            this.setState({
              allLearningEvents: rawEvents,
              filteredLearningEvents: displayableLearningEvents
            });
            this.saveLearningEventsToLocalStorage();
            const keywordIndex = this.cachedOrNewKeywordIndex(
              displayableLearningEvents,
              this.saveKeywordIndexToLocalStorage
            );
            this.setState({ keywordIndex });
            console.log("detected: ", issuesDetector.issues());
            this.setState({ issues: issuesDetector.issues() });
          }
        }
      }
    );
  };

  componentDidMount = async () => {
    Papa.parse(
      `https://raw.githubusercontent.com/jpratt-mru/maco.calendar.datafiles/master/.semester.metadata.csv`,
      {
        download: true,
        header: true,
        skipEmptyLines: true,
        complete: metadataRecords => {
          const map = new Map();
          metadataRecords.data.forEach(record => {
            map.set(record["semester"], {
              "first-full-Monday": record["first-full-Monday"],
              "last-day-of-classes": record["last-day-of-classes"]
            });
          });
          this.setState({ semesterMetadata: map });
          const gh = new GitHub();
          const repo = gh.getRepo("jpratt-mru", "maco.calendar.datafiles");
          const repoContents = repo.getContents();
          repoContents.then(value => {
            const dataReturned = value.data;

            const scheduleCSVs = dataReturned
              .filter(result => result.type === "file")
              .map(file => file.name)
              .filter(name => /^20\d\d\.0[1-4]/.test(name));
            this.setState({ discoveredGithubCSVs: [...scheduleCSVs] });
            this.loadOrRecreateLearningEvents();
          });
        }
      }
    );
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  matchingLearningEvents = eventIds => {
    return this.state.allLearningEvents.filter(event =>
      eventIds.includes(event.id)
    );
  };

  handleFiltering = targetIds => {
    this.setState({
      filteredLearningEvents: this.matchingLearningEvents(targetIds)
    });
  };

  handleScheduleChange = semester => {
    console.warn("semester coming in", semester);
    this.setState({ semester: semester }, this.pullLearningEventsFromGithub);
  };

  render() {
    return (
      <>
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
          startingMonday={this.state.startingMonday}
          events={this.state.filteredLearningEvents}
        />
        {this.state.validCsvLoaded ? (
          <>
            {" "}
            <CsvMissingFields fields={this.state.csvMissingFields} />
            <CsvMalformedFields fields={this.state.csvMalformedFields} />
            <RoomCapacityIssues issues={this.state.roomCapacityIssues} />
            <RoomDoubleBookingIssues
              issues={this.state.roomDoubleBookingIssues}
            />
            <InstructorDoubleBookingIssues
              issues={this.state.instructorDoubleBookingIssues}
            />{" "}
          </>
        ) : (
          <div className="invalid-csv-error">Invalid CSV</div>
        )}

        {/* <ul>
          {this.state.issues.map((oneIssue, index) => (
            <Issue key={index} issue={oneIssue} />
          ))}
        </ul> */}
      </>
    );
  }
}

export default App;
