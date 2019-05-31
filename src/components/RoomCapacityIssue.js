import React from "react";

const RoomCapacityIssue = props => {
  return (
    <div className="room-capacity-issue">
      <span>
        {props.issue.class.toUpperCase()} is over capacity in room{" "}
        {props.issue.room.toUpperCase()}: {props.issue.sectionCapacity} vs.{" "}
        {props.issue.roomCapacity}
      </span>
      <span>CSV line: {props.issue.eventId}</span>
    </div>
  );
};

export default RoomCapacityIssue;
