import LearningEventBuilder from "./builders/LearningEventBuilder";
import { primaryBuilders } from "./primaryBuilders";
import { secondaryBaseBuilders } from "./secondaryBaseBuilders";
import { secondaryCalculatedBuilders } from "./secondaryCalculatedBuilders";

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
      // this *used* to be a forEach...is the reduce any better??
      (learningEvents, csvRecord, index) => {
        const id = index + 2;

        let builder = primaryBuilders.reduce((builder, primaryBuilder) => {
          return primaryBuilder.addTo(builder);
        }, new LearningEventBuilder(id, csvRecord, startingMonday));

        // there's no need to continue building an event if you can't display it...
        if (builder.eventInProgress.isDisplayable) {
          builder = secondaryBaseBuilders.reduce(
            (builder, secondaryBaseBuilder) => {
              return secondaryBaseBuilder.addTo(builder);
            },
            builder
          );

          builder = secondaryCalculatedBuilders.reduce(
            (builder, secondaryCalculatedBuilder) => {
              return secondaryCalculatedBuilder.addTo(builder);
            },
            builder
          );

          // secondaryBaseBuilders.forEach(secondaryBaseBuilder => {
          //   builder = secondaryBaseBuilder.addTo(builder);
          // });
          // secondaryCalculatedBuilders.forEach(secondaryCalculatedBuilder => {
          //   builder = secondaryCalculatedBuilder.addTo(builder);
          // });
        }

        return [...learningEvents, builder.build()];
      },
      []
    );
    console.log("here they be!", this.learningEvents);
  }

  withBuilders = (builder, buildersToAdd, startingBuilder = builder) => {
    return buildersToAdd.reduce((builder, addedBuilder) => {
      return addedBuilder.addTo(builder);
    }, startingBuilder);
  };

  events = () => {
    return [...this.learningEvents];
  };
}

export default LearningEvents;
