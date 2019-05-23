import SecondaryCalculatedPropBuilder from "./SecondaryCalculatedPropBuilder";

class InstructorUsernameBuilder {

    static create = () => {
        const prerequisitesAreValid = prerequisites => {
            return prerequisites[0] !== "???" && prerequisites[1] !== "???";
        };
    
        const propCalculatedFrom = prerequisites => {
          console.log("prereq", prerequisites);
          const firstName = prerequisites[0];
          const lastName = prerequisites[1];
          console.log("first", firstName);
          console.log("last", lastName);
          const TBA = /^tba/gi;
        
          if (TBA.test(firstName) || TBA.test(lastName)) {
            return "TBA";
          } else {
            const onlyLetters = /[^a-z]/gi;
            const cleanedFirstName = firstName.replace(onlyLetters, "");
            const cleanedLastName = lastName.replace(onlyLetters, "");
            return (cleanedFirstName.charAt(0) + cleanedLastName).toLowerCase();
    }
        };
    
        return new SecondaryCalculatedPropBuilder("instructor-username", prerequisitesAreValid, propCalculatedFrom, "first-name", "last-name");
      };


}

export default InstructorUsernameBuilder;