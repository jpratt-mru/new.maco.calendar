import React from "react";
import CalendarEventOrFilterInputBox from "./CalendarEventOrFilterInputBox";
import CalendarEventAndFilterInputBox from "./CalendarEventAndFilterInputBox";
import Notifications from "./Notifications";

/**
 * This is the part of the page that sits adjacent to the calendar itself.
 *
 * @param {*} props
 */
const Sidebar = props => (
  <div id="sidebar" className="col-3">
    <CalendarEventOrFilterInputBox
      handleFiltering={props.handleFiltering}
      keywordIndex={props.keywordIndex}
    />

    <CalendarEventAndFilterInputBox
      handleFiltering={props.handleFiltering}
      keywordIndex={props.keywordIndex}
    />

    <Notifications
      validCsvLoaded={props.validCsvLoaded}
      csvFileName={props.csvFileName}
      csvIssues={props.csvIssues}
      roomCapacityIssues={props.roomCapacityIssues}
      roomDoubleBookingIssues={props.roomDoubleBookingIssues}
      instructorDoubleBookingIssues={props.instructorDoubleBookingIssues}
    />
  </div>
);

export default Sidebar;
