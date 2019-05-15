import React from "react";
import array from "lodash";

class CalendarEventOrFilterInputBox extends React.Component {
  constructor(props) {
    super(props);
    this.keywords = [];
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

  orFilter = e => {
    const extractedKeywords = this.extractedKeywords(e.target.value);
    const associatedIds = this.props.keywordIndex.idsFor(extractedKeywords);
    const orIds = array.union(...associatedIds);

    return this.props.handleFilter(orIds);
  };

  render() {
    return (
      <input
        type="text"
        name="andFilterText"
        id="andFilterText"
        placeholder="AND Search"
        onKeyUp={this.orFilter}
      />
    );
  }
}

export default CalendarEventOrFilterInputBox;
