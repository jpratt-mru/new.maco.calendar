import React from "react";

const InstructorDoubleBookingIssue = props => {
  return (
    <div className="instructor-double-booking-issue">
      <span>
        {props.issue.instructorName} is double-booked with these classes:
        {props.issue.classes
          .sort()
          .join()
          .toUpperCase()}
      </span>
      <span>
        CSV lines: {props.issue.eventIds.sort((a, b) => a - b).join()}
      </span>
    </div>
  );
};

export default InstructorDoubleBookingIssue;
