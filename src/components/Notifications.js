import React from "react";
import CsvIssues from "./CsvIssues";
import RoomCapacityIssues from "./RoomCapacityIssues";
import RoomDoubleBookingIssues from "./RoomDoubleBookingIssues";
import InstructorDoubleBookingIssues from "./InstructorDoubleBookingIssues";
import "./Notifications.css";

const issuesPresent = props => {
  return (
    props.csvIssues.length > 0 ||
    props.roomCapacityIssues.length > 0 ||
    props.roomDoubleBookingIssues.length > 0 ||
    props.instructorDoubleBookingIssues.length > 0
  );
};

const notificationsHeader = props => {
  if (issuesPresent(props)) {
    return <h2 className="text-center with-issues mt-3 pb-2">Issues</h2>;
  }
  return <h2 className="text-center with-no-issues mt-3 pb-2">No Issues</h2>;
};

const Notifications = props =>
  props.validCsvLoaded ? (
    <div id="notifications">
      {notificationsHeader(props)}

      <CsvIssues issues={props.csvIssues} />
      <RoomCapacityIssues issues={props.roomCapacityIssues} />
      <RoomDoubleBookingIssues issues={props.roomDoubleBookingIssues} />
      <InstructorDoubleBookingIssues
        issues={props.instructorDoubleBookingIssues}
      />
    </div>
  ) : null;

export default Notifications;
