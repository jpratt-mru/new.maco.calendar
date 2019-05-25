import CourseNumberBuilder from "./builders/CourseNumberBuilder";
import SubjectAbbrBuilder from "./builders/SubjectAbbrBuilder";
import InstructorUsernameBuilder from "./builders/InstructorUsernameBuilder";
import StartBuilder from "./builders/StartBuilder";
import EndBuilder from "./builders/EndBuilder";

export const secondaryCalculatedBuilders = [
  new InstructorUsernameBuilder(),
  new CourseNumberBuilder(),
  new SubjectAbbrBuilder(),
  new StartBuilder(),
  new EndBuilder() // must come after StartBuilder
];
