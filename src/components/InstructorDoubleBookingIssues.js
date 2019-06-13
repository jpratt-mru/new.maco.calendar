import React from "react";
import InstructorDoubleBookingIssue from "./InstructorDoubleBookingIssue";

const InstructorCapacityIssues = props => {
  return (
    <div className="instructor-double-booking-issues">
      {props.issues.length == 0
        ? null
        : props.issues.map((issue, index) => (
            <InstructorDoubleBookingIssue
              key={`idoub${index}`}
              issue={issue}
              csvFileName={props.csvFileName}
            />
          ))}
    </div>
  );
};

export default InstructorCapacityIssues;
