import React from "react";
import array from "lodash";

class CalendarEventOrFilterInputBox extends React.Component {
  constructor(props) {
    super(props);
  }

  isEmpty = s => {
    return !s || s.trim().length === 0;
  };

  whitespaceSplitTokens = s => {
    const whitespaceRegex = /\S+/g;
    return s.match(whitespaceRegex);
  };

  extractedKeywords = s => {
    return this.isEmpty(s) ? [] : this.whitespaceSplitTokens(s.toLowerCase());
  };

  clear = e => {
    e.target.value = "";
  };

  applyOrFilter = e => {
    const extractedKeywords = this.extractedKeywords(e.target.value);
    const associatedIds = this.props.keywordIndex.idsFor(extractedKeywords);
    const orIds = array.union(...associatedIds);

    return this.props.handleFiltering(orIds);
  };

  render() {
    return (
      <input
        type="text"
        name="orFilterText"
        id="orFilterText"
        placeholder="OR Search"
        onKeyUp={this.applyOrFilter}
        onBlur={this.clear}
      />
    );
  }
}

export default CalendarEventOrFilterInputBox;
