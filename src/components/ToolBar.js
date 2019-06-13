import React from "react";
import PrintButton from "./PrintButton";
import CalendarExportButton from "./CalendarExportButton";

/**
 * This is the doohickie at the top of the page with the printing and calendar
 * export buttons.
 *
 * @param {*} props
 */
const ToolBar = props => (
  <nav className="navbar navbar-expand sticky-top navbar-dark bg-dark flex-column flex-md-row bd-navbar">
    <ul className="navbar-nav flex-row ml-md-auto d-none d-md-flex">
      <PrintButton
        printMode={props.printMode}
        handlePrint={props.handlePrint}
      />
      <CalendarExportButton semester={props.semester} events={props.events} />
    </ul>
  </nav>
);

export default ToolBar;
