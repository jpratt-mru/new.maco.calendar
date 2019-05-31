import React from "react";

const CsvIssue = props => {
  return (
    <div className="csv-issue">
      <span>{props.issue.eventId}</span>
      <span>{props.issue.fields.sort().join()}</span>
    </div>
  );
};

export default CsvIssue;
