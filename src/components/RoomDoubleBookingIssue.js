import React from "react";

const RoomDoubleBookingIssue = props => {
  return (
    <div className="room-double-booking-issue">
      <span>
        {props.issue.room.toUpperCase()} is double-booked with these classes:
        {props.issue.classes
          .sort()
          .join()
          .toUpperCase()}
      </span>
      <span>
        CSV lines: {props.issue.eventIds.sort((a, b) => a - b).join()}
      </span>
    </div>
  );
};

export default RoomDoubleBookingIssue;
