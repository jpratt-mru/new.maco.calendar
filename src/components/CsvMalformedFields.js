import React from "react";

const CsvMalformedFields = props => {
  return (
    <div className="csv-malformed-fields">
      <header>Malformed Fields</header>
      {props.fields.length == 0 ? <span>No Issues</span> : <span>Issues</span>}
    </div>
  );
};

export default CsvMalformedFields;
