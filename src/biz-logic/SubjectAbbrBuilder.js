import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

class SubjectAbbrBuilder {

    static create = () => {
        const prerequisitesAreValid = prerequisites => {
            return prerequisites[0] !== "???";
        };
    
        const propCalculatedFrom = prerequisites => {
          return prerequisites[0].substring(0, 4).toLowerCase();
        };
    
        return new SecondaryCalculatedPropBuilder("subject-abbr", prerequisitesAreValid, propCalculatedFrom, "course");
      };


}

export default SubjectAbbrBuilder;