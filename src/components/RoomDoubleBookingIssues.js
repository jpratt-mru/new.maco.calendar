import React from "react";

const RoomDoubleBookingIssues = props => {
  return (
    <div className="room-double-booking-issues">
      <header>Room Double Booking Issues</header>
      {props.issues.length == 0 ? <span>No Issues</span> : <span>Issues</span>}
    </div>
  );
};

export default RoomDoubleBookingIssues;
