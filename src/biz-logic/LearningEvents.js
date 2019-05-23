import LearningEventBuilder from "./LearningEventBuilder";
import { primaryBuilders } from "./primaryBuilders";
import { secondaryBaseBuilders } from "./secondaryBaseBuilders";
import { secondaryCalculatedBuilders } from "./secondaryCalculatedBuilders";

class LearningEvents {
  learningEvents = [];

  constructor(csvRecords, startingMonday) {
    let builder;
    csvRecords.forEach((record, index) => {
      const id = index + 2;
      builder = new LearningEventBuilder(id, record, startingMonday);

      primaryBuilders.forEach(primaryBuilder => {
        builder = primaryBuilder.addTo(builder);
      });

      if (builder.eventInProgress.isDisplayable) {
        secondaryBaseBuilders.forEach(secondaryBaseBuilder => {
          builder = secondaryBaseBuilder.addTo(builder);
        });
        secondaryCalculatedBuilders.forEach(secondaryCalculatedBuilder => {
          builder = secondaryCalculatedBuilder.addTo(builder);
        });

        // secondaryCalculatedBuilders.forEach(secondaryCalculatedBuilder => {
        //   builder = secondaryCalculatedBuilder.addTo(builder);
        // });
      }

      this.learningEvents.push(builder.build());
    });
    console.log(this.learningEvents);
  }

  events = () => {
    return [...this.learningEvents];
  };
}

export default LearningEvents;
