import React from "react";

const RoomCapacityIssue = props => {
  return (
    <div className="alert alert-warning">
      <p className="mb-0">
        <span className="font-weight-bold">
          {props.issue.class.toUpperCase()}
        </span>{" "}
        is over capacity in room{" "}
        <span className="font-weight-bold">
          {props.issue.room.toUpperCase()}
        </span>
        - ({props.issue.sectionCapacity} vs. {props.issue.roomCapacity})
      </p>
      <p className="mb-0">
        <a href={props.csvFileName} rel="noopener noreferrer" target="_blank">
          csv
        </a>{" "}
        line {props.issue.eventId}
      </p>
    </div>
  );
};

export default RoomCapacityIssue;
