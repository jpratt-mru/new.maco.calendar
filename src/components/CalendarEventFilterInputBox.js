import React from "react";

class CalendarEventFilterInputBox extends React.Component {
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

  andFilter = e => {
    console.warn({ e });
    return this.props.handleFilter(this.extractedKeywords(e.target.value));
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

export default CalendarEventFilterInputBox;
