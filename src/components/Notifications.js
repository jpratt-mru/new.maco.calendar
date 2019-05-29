import React from "react";
import CsvMissingFields from "./CsvMissingFields";
import CsvMalformedFields from "./CsvMalformedFields";
import RoomCapacityIssues from "./RoomCapacityIssues";
import RoomDoubleBookingIssues from "./RoomDoubleBookingIssues";
import InstructorDoubleBookingIssues from "./InstructorDoubleBookingIssues";

const Notifications = props =>
  props.validCsvLoaded ? (
    <>
      <CsvMissingFields fields={props.csvMissingFields} />
      <CsvMalformedFields fields={props.csvMalformedFields} />
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
