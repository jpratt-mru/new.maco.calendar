import CourseBuilder from "./CourseBuilder";
import SectionBuilder from "./SectionBuilder";
import SectionCapacityBuilder from "./SectionCapacityBuilder";
import DayOfWeekBuilder from "./DayOfWeekBuilder";
import RoomBuilder from "./RoomBuilder";
import FirstNameBuilder from "./FirstNameBuilder";
import LastNameBuilder from "./LastNameBuilder";

export const secondaryBaseBuilders = [
  CourseBuilder.create(),
  SectionBuilder.create(),
  SectionCapacityBuilder.create(),
  DayOfWeekBuilder.create(),
  RoomBuilder.create(),
  FirstNameBuilder.create(),
  LastNameBuilder.create()
];
