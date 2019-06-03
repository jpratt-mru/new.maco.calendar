import React from "react";
import RoomDoubleBookingIssue from "./RoomDoubleBookingIssue";
import "./RoomDoubleBookingIssues.css";

const RoomDoubleBookingIssues = props => {
  return (
    <div className="room-double-booking-issues">
      {props.issues.length == 0
        ? null
        : props.issues.map((issue, index) => (
            <RoomDoubleBookingIssue key={`rdoub${index}`} issue={issue} />
          ))}
    </div>
  );
};

export default RoomDoubleBookingIssues;
