import React from "react";
import CsvIssues from "./CsvIssues";
import RoomCapacityIssues from "./RoomCapacityIssues";
import RoomDoubleBookingIssues from "./RoomDoubleBookingIssues";
import InstructorDoubleBookingIssues from "./InstructorDoubleBookingIssues";

const Notifications = props =>
  props.validCsvLoaded ? (
    <>
      <CsvIssues issues={props.csvIssues} />
      <RoomCapacityIssues issues={props.roomCapacityIssues} />
      <RoomDoubleBookingIssues issues={props.roomDoubleBookingIssues} />
      <InstructorDoubleBookingIssues
        issues={props.instructorDoubleBookingIssues}
      />
    </>
  ) : (
    <div className="invalid-csv-error">Invalid CSV</div>
  );

export default Notifications;
