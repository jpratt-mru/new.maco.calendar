import React from "react";
import CsvIssue from "./CsvIssue";

/**
 * A clump of csv issue boxes.
 */
const CsvIssues = props => {
  return (
    <div className="csv-issues">
      {props.issues.length == 0
        ? null
        : props.issues.map((issue, index) => (
            <CsvIssue
              key={`csv${index}`}
              issue={issue}
              csvFileName={props.csvFileName}
            />
          ))}
    </div>
  );
};

export default CsvIssues;
