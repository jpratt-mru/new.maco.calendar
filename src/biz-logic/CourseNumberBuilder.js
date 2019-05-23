import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

class CourseNumberBuilder {

    static create = () => {
        const prerequisitesAreValid = prerequisites => {
            return prerequisites[0] !== "???";
        };
    
        const propCalculatedFrom = prerequisites => {
          return prerequisites[0].substring(4);
        };
    
        return new SecondaryCalculatedPropBuilder("course-number", prerequisitesAreValid, propCalculatedFrom, "course");
      };


}

export default CourseNumberBuilder;