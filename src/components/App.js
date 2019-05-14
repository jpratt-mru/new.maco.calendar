import React from "react";

import MacoCalendar from "./MacoCalendar";
import CalendarEventFilterInputBox from "./CalendarEventFilterInputBox";
import { firestore } from "../../firebase";
import docAsLearningEvent from "../docAsLearningEvent";
import array from "lodash";

class App extends React.Component {
  state = {
    filteredLearningEvents: [],
    filters: []
  };

  unsubscribe = null;

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

  handleFilter = filters => {
    console.warn("here be filters: ", filters);
    this.setState({ filters });
  };

  render() {
    return (
      <>
        <input
          type="text"
          name="orFilterText"
          id="orFilterText"
          placeholder="OR Search"
          onKeyUp={this.orFilter}
        />
        <CalendarEventFilterInputBox handleFilter={this.handleFilter} />
        <MacoCalendar events={this.state.filteredLearningEvents} />
      </>
    );
  }
}

export default App;
