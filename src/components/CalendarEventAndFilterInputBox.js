import React from "react";
import array from "lodash";

class CalendarEventAndFilterInputBox extends React.Component {
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

  andFilter = e => {
    const extractedKeywords = this.extractedKeywords(e.target.value);
    const associatedIds = this.props.keywordIndex.idsFor(extractedKeywords);
    const andedIds = array.intersection(...associatedIds);

    return this.props.handleFilter(andedIds);
  };

  render() {
    return (
      <input
        type="text"
        name="andFilterText"
        id="andFilterText"
        placeholder="AND Search"
        onKeyUp={this.andFilter}
      />
    );
  }
}

export default CalendarEventAndFilterInputBox;
