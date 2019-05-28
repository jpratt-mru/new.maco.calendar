import React from "react";

class SemesterSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = { value: "" };
  }

  handleScheduleChange = event => {
    const selectedSchedule = event.target.value;

    const semesterPart = selectedSchedule.substring(0, 7);

    this.props.handleScheduleChange(semesterPart);
  };

  componentDidMount = () => {};

  render() {
    return (
      <select name="semester" onChange={this.handleScheduleChange}>
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
