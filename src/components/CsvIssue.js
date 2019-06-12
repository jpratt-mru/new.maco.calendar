import React from "react";

const CsvIssue = props => {
  return (
    <div className="alert alert-danger">
      {props.issue.missingFields.length > 0 ? (
        <p className="mb-0">
          missing{" "}
          <span className="font-weight-bold">
            {props.issue.missingFields.sort().join()}
          </span>
        </p>
      ) : null}
      {props.issue.malformedFields.length > 0 ? (
        <p className="mb-0">
          malformed{" "}
          <span className="font-weight-bold">
            {props.issue.malformedFields.sort().join()}
          </span>
        </p>
      ) : null}
      <p className="mb-0">
        <a href={props.csvFileName} rel="noopener noreferrer" target="_blank">
          csv
        </a>{" "}
        line {props.issue.eventId}
      </p>
    </div>
  );
};

export default CsvIssue;
