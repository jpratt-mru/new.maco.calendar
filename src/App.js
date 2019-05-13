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

  filteredSnapshot = filter => {
    firestore
      .collection("2019.04.001")
      .where("keywords", "array-contains", filter)
      .get();
  };

  filter = async e => {
    // const snapshot = await firestore
    //   .collection("2019.04.001")
    //   .where("keywords", "array-contains", e.target.value.toLowerCase())
    //   .get();
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
    // const flattened = array.flattenDeep(allResults);
    // const flattenedAsEvents = flattened.map(docAsLearningEvent);

    console.log("firebaseSnaps", firebaseSnaps);
    console.log("all results", allResults);
    // console.log("all results flattened", flattened);
    //console.log("all results flattened events", flattenedAsEvents);

    // const intersection = array.intersectionWith(wango, (x, y) => x.id === y.id);
    // const wango = firebaseSnaps.map(snap => snap.docs.map(docAsLearningEvent));
    // console.log("wango", wango);
    // const filtersToSnaps = async () => {
    //   const promiseArray = splitFilters.map(async oneFilter => {
    //     await firestore
    //       .collection("2019.04.001")
    //       .where("keywords", "array-contains", oneFilter)
    //       .get();
    //   });
    //   console.log("promiseArray", promiseArray);
    //   return Promise.all(promiseArray);
    // };

    // const wango = filtersToSnaps.docs.map(docAsLearningEvent);
    // console.log("wango!", wango);

    // const snapshot1 = await firestore
    //   .collection("2019.04.001")
    //   .where("keywords", "array-contains", "comp")
    //   .get();

    // const snapshot2 = await firestore
    //   .collection("2019.04.001")
    //   .where("keywords", "array-contains", "15")
    //   .get();

    // const snapshot1Events = snapshot1.docs.map(docAsLearningEvent);
    // const snapshot2Events = snapshot2.docs.map(docAsLearningEvent);
    // const intersection = array.intersectionWith(
    //   allResults,
    //   (x, y) => x.id === y.id
    // );
    // const union = array.unionWith(allResults, (x, y) => x.id === y.id);
    const intersection = array.intersection(...allResults);
    const union = array.union(...allResults);
    console.log("intersection: ", intersection);
    console.log("union: ", union);

    // const learningEvents = snapshot1.docs.map(docAsLearningEvent);
    // this.setState({ filteredLearningEvents: learningEvents });
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
        <MacoCalendar events={this.state.filteredLearningEvents} />
      </>
    );
  }
}

render(React.createElement(App), document.getElementById("root"));
