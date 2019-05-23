import CourseBuilder from "./CourseBuilder";
import SectionBuilder from "./SectionBuilder";
import SectionCapacityBuilder from "./SectionCapacityBuilder";
import DayOfWeekBuilder from "./DayOfWeekBuilder";
import RoomBuilder from "./RoomBuilder";
import FirstNameBuilder from "./FirstNameBuilder";
import LastNameBuilder from "./LastNameBuilder";

export const secondaryBaseBuilders = [
  new CourseBuilder(),
  new SectionBuilder(),
  new SectionCapacityBuilder(),
  new DayOfWeekBuilder(),
  new RoomBuilder(),
  new FirstNameBuilder(),
  new LastNameBuilder()
];
