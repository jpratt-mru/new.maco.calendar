import React from "react";
import MacoCalendar from "./MacoCalendar";
import CalendarEventAndFilterInputBox from "./CalendarEventAndFilterInputBox";
import CalendarEventOrFilterInputBox from "./CalendarEventOrFilterInputBox";
import docAsLearningEvent from "../docAsLearningEvent";
import KeywordIndex from "../biz-logic/KeywordIndex";
import Papa from "papaparse";
import LearningEvent from "../biz-logic/LearningEvent";
import GitHub from "github-api";
import LearningEvents from "../biz-logic/LearningEvents";

const LOCAL_STORAGE_KEYWORD_INDEX_KEY = "keyword_index";
const LOCAL_STORAGE_LEARNING_EVENTS_KEY = "learning_events";

class App extends React.Component {
  state = {
    allLearningEvents: [],
    filteredLearningEvents: [],
    keywordIndex: null,
    semester: "2020.01",
    startingMonday: "2020-01-06"
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
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
      localStorage.clear();
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

  pullLearningEventsFromGithub = () => {
    Papa.parse(
      `https://raw.githubusercontent.com/jpratt-mru/maco.calendar.datafiles/master/${
        this.state.semester
      }.schedule.csv`,
      {
        download: true,
        header: true,
        complete: csvRecords => {
          let builtLearningEvents = new LearningEvents(
            csvRecords.data,
            this.state.startingMonday
          );

          const loadedLearningEvents = [];
          csvRecords.data.forEach((row, index) => {
            const event = LearningEvent.valueOf(
              index + 2,
              row,
              this.state.startingMonday
            );
            loadedLearningEvents.push(event);
          });
          const learningEvents = loadedLearningEvents.map(docAsLearningEvent);
          this.setState({
            allLearningEvents: learningEvents,
            filteredLearningEvents: builtLearningEvents.events()
          });
          this.saveLearningEventsToLocalStorage();
          const keywordIndex = this.cachedOrNewKeywordIndex(
            learningEvents,
            this.saveKeywordIndexToLocalStorage
          );
          this.setState({ keywordIndex });
        }
      }
    );
  };

  componentDidMount = async () => {
    const gh = new GitHub();
    const repo = gh.getRepo("jpratt-mru", "maco.calendar.datafiles");
    const foo = repo.getContents();
    foo.then(value => {
      const dataReturned = value.data;
      const filtered = dataReturned.filter(result => result.type === "file");
    });
    this.loadOrRecreateLearningEvents();

    // Papa.parse(
    //   "https://raw.githubusercontent.com/jpratt-mru/maco.calendar.datafiles/master/2019.04.schedule.csv",
    //   {
    //     download: true,
    //     header: true,
    //     complete: results => {
    //       const loadedLearningEvents = [];
    //       results.data.forEach((row, index) => {
    //         const startingMonday = "2019.09.09";
    //         const event = LearningEvent.valueOf(index, row, startingMonday);
    //         loadedLearningEvents.push(event);
    //       });
    //       const learningEvents = loadedLearningEvents.map(docAsLearningEvent);
    //       this.setState({
    //         allLearningEvents: learningEvents,
    //         filteredLearningEvents: learningEvents
    //       });

    //       const keywordIndex = this.cachedOrNewKeywordIndex(
    //         learningEvents,
    //         this.saveKeywordIndexToLocalStorage
    //       );
    //       this.setState({ keywordIndex });
    //     }
    //   }
    // );
    // this.unsubscribe = await firestore
    //   .collection("2019.04.001")
    //   .onSnapshot(snapshot => {
    //     const learningEvents = snapshot.docs.map(docAsLearningEvent);
    //     this.setState({ allLearningEvents: learningEvents });

    //     const keywordIndex = this.cachedOrNewKeywordIndex(
    //       learningEvents,
    //       this.saveKeywordIndexToLocalStorage
    //     );
    //     this.setState({ keywordIndex });
    //   });
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

  render() {
    return (
      <>
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
      </>
    );
  }
}

export default App;
