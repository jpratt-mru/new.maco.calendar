import React from "react";
import RoomDoubleBookingIssue from "./RoomDoubleBookingIssue";

const RoomDoubleBookingIssues = props => {
  return (
    <div className="room-double-booking-issues">
      <header>Room Double-Booking Issues</header>
      {props.issues.length == 0 ? (
        <span>No Issues</span>
      ) : (
        props.issues.map((issue, index) => (
          <RoomDoubleBookingIssue key={`rdoub${index}`} issue={issue} />
        ))
      )}
    </div>
  );
};

export default RoomDoubleBookingIssues;
