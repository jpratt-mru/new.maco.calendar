import React from "react";
import styled from "styled-components";

const Issue = styled.div`
  padding: 10px;
`;

/**
 * This is a single CSV issue warning box.
 * There's some Bootstrap styling (alert, alert-danger, mb-0) going on.
 *
 * These boxes have a link back to the csv file on Github where the
 * problem exists. Convenience!
 */
const CsvIssue = props => {
  return (
    <Issue className="alert alert-danger">
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
    </Issue>
  );
};

export default CsvIssue;
