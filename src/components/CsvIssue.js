import React from "react";

const CsvIssue = props => {
  return (
    <div className="csv-issue">
      <span>CSV line: {props.issue.eventId}</span>
      {props.issue.missingFields.length > 0 ? (
        <span>
          Fields with missing data: {props.issue.missingFields.sort().join()}
        </span>
      ) : null}
      {props.issue.malformedFields.length > 0 ? (
        <span>
          Fields with malformed data:{" "}
          {props.issue.malformedFields.sort().join()}
        </span>
      ) : null}
    </div>
  );
};

export default CsvIssue;
