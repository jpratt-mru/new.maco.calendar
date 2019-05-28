import CourseNumberBuilder from "./CourseNumberBuilder";
import SubjectAbbrBuilder from "./SubjectAbbrBuilder";
import InstructorUsernameBuilder from "./InstructorUsernameBuilder";
import StartBuilder from "./StartBuilder";
import EndBuilder from "./EndBuilder";

export const secondaryCalculatedBuilders = [
  new InstructorUsernameBuilder(),
  new CourseNumberBuilder(),
  new SubjectAbbrBuilder(),
  new StartBuilder(),
  new EndBuilder() // must come after StartBuilder
];
