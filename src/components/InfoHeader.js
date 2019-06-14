import React from "react";

import styled from "styled-components";

const Wrapper = styled.div`
  h2 {
    font-size: 1.2em;
  }

  #printed-calendar-title {
    display: none;
  }

  #semester {
    font-size: 1.5em;
    color: blue;
  }
`;

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
  <Wrapper id="info-header">
    <div className="display-1 text-center mb-5" id="printed-calendar-title">
      Weekly Schedule
    </div>
    <div id="calendar-info-display" className="jumbotron jumbotron-fluid p-2">
      <div className="container-fluid">
        <p className="display-4 text-center">MACO Schedule Calendar Tool</p>
        <h2 className="mb-1 text-center">
          Currently showing{" "}
          <span className="font-weight-bold" id="semester">
            {semesterInfo(props.semester.year, props.semester.semesterCode)}{" "}
          </span>
          <span id="schedule-file-name">({props.scheduleName})</span>
        </h2>
      </div>
    </div>
  </Wrapper>
);

export default InfoHeader;
