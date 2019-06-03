import React from "react";
import "./InfoHeader.css";

const semesterDescToText = desc => {
  if (desc === "01") return "Winter";
  if (desc === "02") return "Spring";
  if (desc === "03") return "Summer";
  return "Fall";
};

const semesterInfo = (year, semesterDesc) => {
  return `${semesterDescToText(semesterDesc)} ${year}`;
};

const InfoHeader = props => (
  <div id="info-header">
    <div className="jumbotron jumbotron-fluid p-3">
      <div className="container-fluid">
        <p className="display-4 text-center">MACO Schedule Calendar Tool</p>
      </div>
    </div>
    <div>
      <h2 className="mb-4">
        Currently showing{" "}
        <span className="font-weight-bold">
          {semesterInfo(props.semester.year, props.semester.semesterOrdinal)} (
          <span className="text-primary">{props.scheduleName}</span>)
        </span>
      </h2>
    </div>
  </div>
);

export default InfoHeader;
