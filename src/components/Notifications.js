import React from "react";
import CsvIssues from "./CsvIssues";
import RoomCapacityIssues from "./RoomCapacityIssues";
import RoomDoubleBookingIssues from "./RoomDoubleBookingIssues";
import InstructorDoubleBookingIssues from "./InstructorDoubleBookingIssues";
import "./Notifications.css";

const Notifications = props =>
  props.validCsvLoaded ? (
    <div id="notifications">
      <h2 className="text-center mt-3 pb-2">Issues</h2>
      <div id="notifications">
        <CsvIssues issues={props.csvIssues} />
        <RoomCapacityIssues issues={props.roomCapacityIssues} />
        <RoomDoubleBookingIssues issues={props.roomDoubleBookingIssues} />
        <InstructorDoubleBookingIssues
          issues={props.instructorDoubleBookingIssues}
        />
      </div>
    </div>
  ) : (
    <div className="invalid-csv-error">Invalid CSV</div>
  );

export default Notifications;
