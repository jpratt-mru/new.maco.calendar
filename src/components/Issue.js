import React from "react";

const Issue = props => {
  return (
    <li>
      CSV line {props.issue.eventId}:{props.issue.details.join()}
    </li>
  );
};

export default Issue;
