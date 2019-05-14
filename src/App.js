import React from "react";
import { render } from "react-dom";
import MacoCalendar from "./MacoCalendar";
import { firestore } from "../firebase";
import docAsLearningEvent from "./docAsLearningEvent";
import array from "lodash";

class App extends React.Component {
  state = {
    filteredLearningEvents: []
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
        <input
          type="text"
          name="andFilterText"
          id="andFilterText"
          placeholder="AND Search"
          onKeyUp={this.andFilter}
        />
        <MacoCalendar events={this.state.filteredLearningEvents} />
      </>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
