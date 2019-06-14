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
    return this.isEmpty(s) ? [""] : this.whitespaceSplitTokens(s.toLowerCase());
  };

  clear = e => {
    e.target.value = "";
  };

  applyAndFilter = (filterMethod, e) => {
    const extractedKeywords = this.extractedKeywords(e.target.value);
    const associatedIds = this.props.keywordIndex.idsFor(extractedKeywords);
    const filteredIds = filterMethod(...associatedIds);

    return this.props.handleFiltering(filteredIds);
  };

  render() {
    return (
      <input
        type="text"
        name={this.props.name}
        id={this.props.name}
        placeholder={this.props.placeholder}
        onKeyUp={this.applyAndFilter.bind(this, this.props.filterOperation)}
        onBlur={this.clear}
        className="form-control form-control-lg"
      />
    );
  }
}
export default CalendarEventFilterInputBox;
