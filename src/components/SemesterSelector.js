import React from "react";

class SemesterSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  handleScheduleChange = event => {
    const selectedSchedule = event.target.value;

    this.props.handleScheduleChange(selectedSchedule);
  };

  componentDidMount = () => {};

  render() {
    return (
      <select name="semester" onChange={this.handleScheduleChange}>
        <option value="">--Please choose a schedule --</option>
        {this.props.csvFiles.map(fileName => (
          <option key={fileName} value={fileName}>
            {fileName}
          </option>
        ))}
      </select>
    );
  }
}

export default SemesterSelector;
