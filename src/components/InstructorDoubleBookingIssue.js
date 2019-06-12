import React from "react";

const InstructorDoubleBookingIssue = props => {
  return (
    <div className="alert alert-secondary">
      <p className="mb-0">
        <span className="font-weight-bold">{props.issue.instructorName}</span>{" "}
        is double-booked with these classes:
        <br />
        <span className="font-weight-bold">
          {props.issue.classes
            .sort()
            .join()
            .toUpperCase()}
        </span>
      </p>
      <p className="mb-0">
        <a href={props.csvFileName} rel="noopener noreferrer" target="_blank">
          csv
        </a>{" "}
        lines {props.issue.eventIds.sort((a, b) => a - b).join()}
      </p>
    </div>
  );
};

export default InstructorDoubleBookingIssue;
