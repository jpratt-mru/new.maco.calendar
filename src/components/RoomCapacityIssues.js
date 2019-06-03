import React from "react";
import RoomCapacityIssue from "./RoomCapacityIssue";
import "./RoomCapacityIssues.css";

const RoomCapacityIssues = props => {
  return (
    <div className="room-capacity-issues">
      {props.issues.length == 0
        ? null
        : props.issues.map((issue, index) => (
            <RoomCapacityIssue key={`rcap${index}`} issue={issue} />
          ))}
    </div>
  );
};

export default RoomCapacityIssues;
