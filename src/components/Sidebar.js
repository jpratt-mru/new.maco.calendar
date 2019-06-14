import React from "react";
import Notifications from "./Notifications";
import CalendarEventFilterInputBox from "./CalendarEventFilterInputBox";
import _ from "lodash";

import styled from "styled-components";

const SidebarWrapper = styled.div`
  #orFilterText {
    margin-bottom: 10px;
  }
`;

/**
 * This is the part of the page that sits adjacent to the calendar itself.
 *
 * @param {*} props
 */
const Sidebar = props => (
  <SidebarWrapper id="sidebar" className="col-3">
    <CalendarEventFilterInputBox
      handleFiltering={props.handleFiltering}
      keywordIndex={props.keywordIndex}
      name="orFilterText"
      placeholder="OR Filter"
      filterOperation={_.union}
    />

    <CalendarEventFilterInputBox
      handleFiltering={props.handleFiltering}
      keywordIndex={props.keywordIndex}
      name="andFilterText"
      placeholder="AND Filter"
      filterOperation={_.intersection}
    />

    <Notifications
      validCsvLoaded={props.validCsvLoaded}
      csvFileName={props.csvFileName}
      csvIssues={props.csvIssues}
      roomCapacityIssues={props.roomCapacityIssues}
      roomDoubleBookingIssues={props.roomDoubleBookingIssues}
      instructorDoubleBookingIssues={props.instructorDoubleBookingIssues}
    />
  </SidebarWrapper>
);

export default Sidebar;
