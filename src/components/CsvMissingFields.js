import React from "react";

const CsvMissingFields = props => {
  return (
    <div className="csv-missing-fields">
      <header>Missing Fields</header>
      {props.fields.length == 0 ? <span>No Issues</span> : <span>Issues</span>}
    </div>
  );
};

export default CsvMissingFields;
