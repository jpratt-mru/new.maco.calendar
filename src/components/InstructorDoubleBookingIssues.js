import React from "react";

const InstructorDoubleBookingIssues = props => {
  return (
    <div className="instructor-double-booking-issues">
      <header>Instructor Double Booking Issues</header>
      {props.issues.length == 0 ? <span>No Issues</span> : <span>Issues</span>}
    </div>
  );
};

export default InstructorDoubleBookingIssues;
