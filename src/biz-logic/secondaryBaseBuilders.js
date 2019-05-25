import CourseBuilder from "./builders/CourseBuilder";
import SectionBuilder from "./builders/SectionBuilder";
import SectionCapacityBuilder from "./builders/SectionCapacityBuilder";
import DayOfWeekBuilder from "./builders/DayOfWeekBuilder";
import RoomBuilder from "./builders/RoomBuilder";
import FirstNameBuilder from "./builders/FirstNameBuilder";
import LastNameBuilder from "./builders/LastNameBuilder";

export const secondaryBaseBuilders = [
  new CourseBuilder(),
  new SectionBuilder(),
  new SectionCapacityBuilder(),
  new DayOfWeekBuilder(),
  new RoomBuilder(),
  new FirstNameBuilder(),
  new LastNameBuilder()
];
