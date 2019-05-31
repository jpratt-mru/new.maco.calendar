import React from "react";
import RoomCapacityIssue from "./RoomCapacityIssue";

const RoomCapacityIssues = props => {
  return (
    <div className="room-capacity-issues">
      <header>Room Capacity Issues</header>
      {props.issues.length == 0 ? (
        <span>No Issues</span>
      ) : (
        props.issues.map((issue, index) => (
          <RoomCapacityIssue key={`rcap${index}`} issue={issue} />
        ))
      )}
    </div>
  );
};

export default RoomCapacityIssues;
