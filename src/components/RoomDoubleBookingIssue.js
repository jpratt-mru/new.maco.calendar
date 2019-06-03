import React from "react";

const RoomDoubleBookingIssue = props => {
  return (
    <div className="alert alert-primary">
      <p className="mb-0">
        <span className="font-weight-bold">
          {props.issue.room.toUpperCase()}
        </span>{" "}
        is double-booked with these classes:
        <span className="font-weight-bold">
          {props.issue.classes
            .sort()
            .join()
            .toUpperCase()}
        </span>
      </p>
      <p className="mb-0">
        csv lines {props.issue.eventIds.sort((a, b) => a - b).join()}
      </p>
    </div>
  );
};

export default RoomDoubleBookingIssue;
