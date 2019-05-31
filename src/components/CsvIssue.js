import React from "react";
import styled from "@emotion/styled";

const Container = styled("div")`
  background-color: hotpink;
  margin: 1em;
  padding: 0.5em;
  border-radius: 5px;
`;

const LineNumber = styled("span")`
  font-weight: bold;
  color: blue;
`;

const Fields = styled("span")`
  font-weight: bold;
`;

const CsvIssue = props => {
  return (
    <Container className="csv-issue">
      <div>
        csv line <LineNumber>{props.issue.eventId}</LineNumber>
      </div>
      {props.issue.missingFields.length > 0 ? (
        <div>
          missing <Fields>{props.issue.missingFields.sort().join()}</Fields>
        </div>
      ) : null}
      {props.issue.malformedFields.length > 0 ? (
        <div>
          malformed <Fields>{props.issue.malformedFields.sort().join()}</Fields>
        </div>
      ) : null}
    </Container>
  );
};

export default CsvIssue;
