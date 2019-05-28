import React from "react";

const RoomCapacityIssues = props => {
  return (
    <div className="room-capacity-issues">
      <header>Room Capacity Issues</header>
      {props.issues.length == 0 ? <span>No Issues</span> : <span>Issues</span>}
    </div>
  );
};

export default RoomCapacityIssues;
