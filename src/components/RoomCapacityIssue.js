import React from "react";
import styled from "styled-components";

const Issue = styled.div`
  padding: 10px;
`;

const RoomCapacityIssue = props => {
  return (
    <Issue className="alert alert-warning">
      <p className="mb-0">
        <span className="font-weight-bold">
          {props.issue.class.toUpperCase()}
        </span>{" "}
        is over capacity in{" "}
        <span className="font-weight-bold">
          {props.issue.room.toUpperCase()}
        </span>{" "}
        ({props.issue.sectionCapacity}/{props.issue.roomCapacity})
      </p>
      <p className="mb-0">
        <a href={props.csvFileName} rel="noopener noreferrer" target="_blank">
          csv
        </a>{" "}
        line {props.issue.eventId}
      </p>
    </Issue>
  );
};

export default RoomCapacityIssue;
