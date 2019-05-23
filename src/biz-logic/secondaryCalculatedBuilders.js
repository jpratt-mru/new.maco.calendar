import CourseNumberBuilder from "./CourseNumberBuilder";
import SubjectAbbrBuilder from "./SubjectAbbrBuilder";
import InstructorUsernameBuilder from "./InstructorUsernameBuilder";

export const secondaryCalculatedBuilders = [
  InstructorUsernameBuilder.create(),
  CourseNumberBuilder.create(),
  SubjectAbbrBuilder.create()
  
];
