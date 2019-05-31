import React from "react";
import CsvIssue from "./CsvIssue";

const CsvIssues = props => {
  return (
    <div className="csv-issues">
      <header>CSV Issues</header>
      {props.issues.length == 0 ? (
        <span>No Issues</span>
      ) : (
        props.issues.map((issue, index) => (
          <CsvIssue key={`csv${index}`} issue={issue} />
        ))
      )}
    </div>
  );
};

export default CsvIssues;
