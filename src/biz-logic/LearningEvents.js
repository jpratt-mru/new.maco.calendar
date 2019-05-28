import LearningEventBuilder from "./builders/LearningEventBuilder";
import { primaryBuilders } from "./builders/_primaryBuildersToUse";
import { secondaryBaseBuilders } from "./builders/_secondaryBaseBuildersToUse";
import { secondaryCalculatedBuilders } from "./builders/_secondaryCalculatedBuildersToUse";

/**
 * A collection of LearningEvents.
 *
 * What we do here is take in a bunch of csvRecords (that may or not be dirty) along
 * with a startingMonday (in "YYYY-MM-DD" format) and create a bunch of LearningEvents
 * from the csvRecords.
 *
 * Each record is transformed into a learning event by being stepped through a series
 * of Builders, each Builder adding an a required property of a LearningEvent. Validation
 * goes on in each Builder.
 *
 * It *should* be easy to add more properties if needed, by adding the necessary Builder
 * and then newing it up in either primaryBuilders.js, secondaryBaseBuilders.js, or
 * secondaryCalculatedBuilders.js. - there should be no need to edit this file in this
 * case, which follows the Open-Closed Principle and that makes me happy. For now.
 */
class LearningEvents {
  learningEvents = [];

  constructor(csvRecords, startingMonday) {
    this.learningEvents = csvRecords.reduce(
      (learningEvents, csvRecord, index) => {
        // want the id to be a line number in the csv, which has a header...and
        // we want to count from 1
        const id = index + 2;

        // this is the seed for all the additional builders...
        let builder = new LearningEventBuilder(id, csvRecord, startingMonday);

        // ...then on go the ones needed to create a displayable event
        builder = this.withFurtherBuilders(builder, primaryBuilders);

        // there's no need to continue building an event if you can't display it...
        // but if you can display it, the rest of the builders get layered on
        if (builder.eventInProgress.isDisplayable) {
          builder = this.withFurtherBuilders(builder, secondaryBaseBuilders);
          builder = this.withFurtherBuilders(
            builder,
            secondaryCalculatedBuilders
          );
        }

        return [...learningEvents, builder.build()];
      },
      []
    );
    console.log("events are", this.learningEvents);
  }

  withFurtherBuilders = (builder, buildersToAdd) => {
    return buildersToAdd.reduce((builder, addedBuilder) => {
      return addedBuilder.addTo(builder);
    }, builder);
  };

  events = () => {
    return [...this.learningEvents];
  };
}

export default LearningEvents;
