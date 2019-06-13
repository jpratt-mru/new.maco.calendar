import React from "react";
import CsvIssues from "./CsvIssues";
import RoomCapacityIssues from "./RoomCapacityIssues";
import RoomDoubleBookingIssues from "./RoomDoubleBookingIssues";
import InstructorDoubleBookingIssues from "./InstructorDoubleBookingIssues";

import styled from "styled-components";

const NotificationBlock = styled.div`
  p {
    font-size: 0.85em;
  }

  h2 {
    padding: 3px;
    border-radius: 0.25em;
    border: 1px solid transparent;
  }

  h2.with-issues {
    background-color: darkred;
    color: white;
  }

  h2.with-no-issues {
    background-color: darkgreen;
    color: white;
  }
`;

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
    <NotificationBlock id="notifications">
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
    </NotificationBlock>
  ) : null;

export default Notifications;
