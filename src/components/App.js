import React from "react";

import MacoCalendar from "./MacoCalendar";
import CalendarEventAndFilterInputBox from "./CalendarEventAndFilterInputBox";
import CalendarEventOrFilterInputBox from "./CalendarEventOrFilterInputBox";
import { firestore } from "../../firebase";
import docAsLearningEvent from "../docAsLearningEvent";
import array from "lodash";
import KeywordIndex from "../biz-logic/KeywordIndex";

class App extends React.Component {
  state = {
    filteredLearningEvents: [],
    filters: []
  };

  constructor(props) {
    super(props);
    this.unsubscribe = null;
    this.keywordIndex = new KeywordIndex();
    this.keywordIndex.add("c", "1");
    this.keywordIndex.add("co", "1");
    this.keywordIndex.add("com", "1");
    this.keywordIndex.add("comp", "1");
    this.keywordIndex.add("1", "1");
    this.keywordIndex.add("15", "1");
    this.keywordIndex.add("150", "1");
    this.keywordIndex.add("1501", "1");
    this.keywordIndex.add("comp1", "1");
    this.keywordIndex.add("comp15", "1");
    this.keywordIndex.add("comp150", "1");
    this.keywordIndex.add("comp1501", "1");
    this.keywordIndex.add("t", "1");
    this.keywordIndex.add("t2", "1");
    this.keywordIndex.add("t22", "1");
    this.keywordIndex.add("t225", "1");
    this.keywordIndex.add("j", "1");
    this.keywordIndex.add("jp", "1");
    this.keywordIndex.add("jpr", "1");
    this.keywordIndex.add("jpra", "1");
    this.keywordIndex.add("jprat", "1");
    this.keywordIndex.add("jpratt", "1");
    this.keywordIndex.add("c", "2");
    this.keywordIndex.add("co", "2");
    this.keywordIndex.add("com", "2");
    this.keywordIndex.add("comp", "2");
    this.keywordIndex.add("1", "2");
    this.keywordIndex.add("10", "2");
    this.keywordIndex.add("100", "2");
    this.keywordIndex.add("1001", "2");
    this.keywordIndex.add("comp1", "2");
    this.keywordIndex.add("comp10", "2");
    this.keywordIndex.add("comp100", "2");
    this.keywordIndex.add("comp1001", "2");
    this.keywordIndex.add("b", "2");
    this.keywordIndex.add("b1", "2");
    this.keywordIndex.add("b16", "2");
    this.keywordIndex.add("b162", "2");
    this.keywordIndex.add("p", "2");
    this.keywordIndex.add("pp", "2");
    this.keywordIndex.add("ppe", "2");
    this.keywordIndex.add("pper", "2");
    this.keywordIndex.add("pperr", "2");
    this.keywordIndex.add("pperri", "2");
  }

  componentDidMount = async () => {
    this.unsubscribe = await firestore
      .collection("2019.04.001")
      .onSnapshot(snapshot => {
        const learningEvents = snapshot.docs.map(docAsLearningEvent);
        this.setState({ filteredLearningEvents: learningEvents });
      });
  };

  componentWillUnmount = () => {
    this.unsubscribe();
  };

  andFilter = async e => {
    const whitespace = /\s+/;
    const splitFilters = e.target.value.toLowerCase().split(whitespace);

    const firebasePromises = splitFilters.map(
      async filter =>
        await firestore
          .collection("2019.04.001")
          .where("keywords", "array-contains", filter)
          .get()
    );

    const firebaseSnaps = await Promise.all(firebasePromises);
    const allResults = firebaseSnaps.map(querySnapshot =>
      querySnapshot.docs.map(doc => doc.id)
    );

    console.log("firebaseSnaps", firebaseSnaps);
    console.log("all results", allResults);

    const intersection = array.intersection(...allResults);
    console.log("intersection: ", intersection);
  };

  orFilter = async e => {
    const whitespace = /\s+/;
    const splitFilters = e.target.value.toLowerCase().split(whitespace);

    const firebasePromises = splitFilters.map(
      async filter =>
        await firestore
          .collection("2019.04.001")
          .where("keywords", "array-contains", filter)
          .get()
    );

    const firebaseSnaps = await Promise.all(firebasePromises);
    const allResults = firebaseSnaps.map(querySnapshot =>
      querySnapshot.docs.map(doc => doc.id)
    );

    console.log("firebaseSnaps", firebaseSnaps);
    console.log("all results", allResults);

    const union = array.union(...allResults);

    console.log("union: ", union);
  };

  handleFilter = (filters, callback) => {
    this.setState({ filters });
  };

  render() {
    return (
      <>
        <CalendarEventOrFilterInputBox
          handleFilter={this.handleFilter}
          keywordIndex={this.keywordIndex}
        />
        <CalendarEventAndFilterInputBox
          handleFilter={this.handleFilter}
          keywordIndex={this.keywordIndex}
        />
        <MacoCalendar events={this.state.filteredLearningEvents} />
      </>
    );
  }
}

export default App;
