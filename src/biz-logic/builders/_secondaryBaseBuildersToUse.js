import CourseBuilder from "./CourseBuilder";
import SectionBuilder from "./SectionBuilder";
import SectionCapacityBuilder from "./SectionCapacityBuilder";
import DayOfWeekBuilder from "./DayOfWeekBuilder";
import RoomBuilder from "./RoomBuilder";
import FirstNameBuilder from "./FirstNameBuilder";
import LastNameBuilder from "./LastNameBuilder";

/**
 * Place any secondary base builders needed to make a learning event in this array.
 * They *are* run in order, if that matters.
 *
 * A *secondary base builder* is used to add properties to a learning event that
 * come **directly** from a single field in a schedule CSV, though the data
 * in that field may be formatted slightly (turned to lowercase, for example).
 */
export const secondaryBaseBuilders = [
  new CourseBuilder(),
  new SectionBuilder(),
  new SectionCapacityBuilder(),
  new DayOfWeekBuilder(),
  new RoomBuilder(),
  new FirstNameBuilder(),
  new LastNameBuilder()
];
