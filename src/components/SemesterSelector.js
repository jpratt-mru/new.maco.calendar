import React from "react";
import GitHub from "github-api";

class SemesterSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = { discoveredGithubCSVs: [] };
  }

  githubRepoContents = async () => {
    const gh = new GitHub();
    const repo = gh.getRepo("jpratt-mru", "maco.calendar.datafiles");
    return repo.getContents();
  };

  scheduleCSVsFromRepoResponse = response => {
    return response
      .filter(result => result.type === "file")
      .map(file => file.name)
      .filter(name => /^20\d\d\.0[1-4]/.test(name));
  };

  handleScheduleChange = event => {
    const selectedSchedule = event.target.value;

    this.props.handleScheduleChange(selectedSchedule);
  };

  componentDidMount = () => {
    this.githubRepoContents().then(value => {
      const response = value.data;
      this.setState({
        discoveredGithubCSVs: this.scheduleCSVsFromRepoResponse(response)
      });
    });
  };

  render() {
    return (
      <select
        className="custom-select"
        name="semester"
        onChange={this.handleScheduleChange}
      >
        <option value="">--Please choose a schedule --</option>
        {this.state.discoveredGithubCSVs.map(fileName => (
          <option key={fileName} value={fileName}>
            {fileName}
          </option>
        ))}
      </select>
    );
  }
}

export default SemesterSelector;
