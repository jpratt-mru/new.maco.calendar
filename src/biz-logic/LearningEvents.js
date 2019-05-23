import LearningEventBuilder from "./LearningEventBuilder";
import { primaryBuilders } from "./primaryBuilders";
import { secondaryBaseBuilders } from "./secondaryBaseBuilders";
import { secondaryCalculatedBuilders } from "./secondaryCalculatedBuilders";
import InstructorUsernameBuilder from "./InstructorUsernameBuilder";
import CourseNumberBuilder from "./CourseNumberBuilder";
import SubjectAbbrBuilder from "./SubjectAbbrBuilder";

class LearningEvents {
  learningEvents = [];

  constructor(csvRecords, startingMonday) {
    let glob = [];
    let builder;
    csvRecords.forEach((record, index) => {
      const id = index + 2;
      builder = new LearningEventBuilder(id, record, startingMonday);

      primaryBuilders.forEach(primaryBuilder => {
        builder = primaryBuilder.addTo(builder);
      });

      if (builder.canBuildDisplayableEvent) {
        secondaryBaseBuilders.forEach(secondaryBaseBuilder => {
          builder = secondaryBaseBuilder.addTo(builder);
        });
        builder = InstructorUsernameBuilder.create().addTo(builder);
        builder = CourseNumberBuilder.create().addTo(builder);
        builder = SubjectAbbrBuilder.create().addTo(builder);

        // secondaryCalculatedBuilders.forEach(secondaryCalculatedBuilder => {
        //   builder = secondaryCalculatedBuilder.addTo(builder);
        // });
      }

      glob.push(builder.build());

    });
    console.log(glob);
  }

  events = () => {
    return [...this.learningEvents];
  };
}

export default LearningEvents;
