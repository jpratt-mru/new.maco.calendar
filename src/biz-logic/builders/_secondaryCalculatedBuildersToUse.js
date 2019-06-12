import CourseNumberBuilder from "./CourseNumberBuilder";
import SubjectAbbrBuilder from "./SubjectAbbrBuilder";
import InstructorUsernameBuilder from "./InstructorUsernameBuilder";
import StartBuilder from "./StartBuilder";
import EndBuilder from "./EndBuilder";
import RoomCapacityBuilder from "./RoomCapacityBuilder";

/**
 * Place any secondary calculated base builders needed to make a learning event
 * in this array. They *are* run in order, if that matters.
 *
 * A *secondary calculated builder* is used to add properties to a learning event
 * that must be caluclated from other properites in the learning event. (For
 * example, we use the firstname and lastname properties to create another
 * property for an instructor's username.)
 */
export const secondaryCalculatedBuilders = [
  new InstructorUsernameBuilder(),
  new CourseNumberBuilder(),
  new SubjectAbbrBuilder(),
  new RoomCapacityBuilder(),
  new StartBuilder(),
  new EndBuilder() // must come after StartBuilder
];
