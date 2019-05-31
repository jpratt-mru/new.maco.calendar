import React from "react";
import InstructorDoubleBookingIssue from "./InstructorDoubleBookingIssue";

const InstructorCapacityIssues = props => {
  return (
    <div className="instructor-double-booking-issues">
      <header>Instructor Double-Booking Issues</header>
      {props.issues.length == 0 ? (
        <span>No Issues</span>
      ) : (
        props.issues.map((issue, index) => (
          <InstructorDoubleBookingIssue key={`idoub${index}`} issue={issue} />
        ))
      )}
    </div>
  );
};

export default InstructorCapacityIssues;
