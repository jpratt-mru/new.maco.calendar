import React from "react";
import PrintToggleButton from "./PrintToggleButton";
import CalendarExportButton from "./CalendarExportButton";

const ToolBar = props => (
  <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark flex-column flex-md-row bd-navbar">
    <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
      <PrintToggleButton
        printMode={props.printMode}
        handlePrintViewChange={props.handlePrintViewChange}
      />
      <CalendarExportButton
        semester={props.semester}
        events={props.displayedLearningEvents}
      />
    </ul>
  </nav>
);

export default ToolBar;
