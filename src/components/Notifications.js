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

      <CsvIssues issues={props.csvIssues} csvFileName={props.csvFileName} />
      <RoomCapacityIssues
        issues={props.roomCapacityIssues}
        csvFileName={props.csvFileName}
      />
      <RoomDoubleBookingIssues
        issues={props.roomDoubleBookingIssues}
        csvFileName={props.csvFileName}
      />
      <InstructorDoubleBookingIssues
        issues={props.instructorDoubleBookingIssues}
        csvFileName={props.csvFileName}
      />
    </div>
  ) : null;

export default Notifications;
