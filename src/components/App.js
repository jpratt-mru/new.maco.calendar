import React from "react";
import MacoCalendar from "./MacoCalendar";
import CalendarEventAndFilterInputBox from "./CalendarEventAndFilterInputBox";
import CalendarEventOrFilterInputBox from "./CalendarEventOrFilterInputBox";
import { firestore } from "../../firebase";
import docAsLearningEvent from "../docAsLearningEvent";
import KeywordIndex from "../biz-logic/KeywordIndex";
import Papa from "papaparse";
import LearningEvent from "../biz-logic/LearningEvent";

const LOCAL_STORAGE_KEYWORD_INDEX_KEY = "keyword_index";

class App extends React.Component {
  state = {
    allLearningEvents: [],
    filteredLearningEvents: [],
    keywordIndex: null
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
  }

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

  componentDidMount = async () => {
    Papa.parse(
      "https://raw.githubusercontent.com/jpratt-mru/sandbox-calendar/master/2019.04.schedule.csv",
      {
        download: true,
        header: true,
        complete: function(results) {
          console.warn(results);
          results.data.forEach(row => {
            console.log(LearningEvent.valueOf(row));
          });
        }
      }
    );
    this.unsubscribe = await firestore
      .collection("2019.04.001")
      .onSnapshot(snapshot => {
        const learningEvents = snapshot.docs.map(docAsLearningEvent);
        this.setState({ allLearningEvents: learningEvents });

        const keywordIndex = this.cachedOrNewKeywordIndex(
          learningEvents,
          this.saveKeywordIndexToLocalStorage
        );
        this.setState({ keywordIndex });
      });
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
        <MacoCalendar events={this.state.filteredLearningEvents} />
      </>
    );
  }
}

export default App;
