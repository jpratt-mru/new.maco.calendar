import React from "react";
import Octokit from "@octokit/rest";

class SemesterSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = { discoveredGithubCSVs: [] };
  }

  githubRepoContents = async () => {
    const octokit = new Octokit();
    const contents = octokit.repos.getContents({
      owner: "jpratt-mru",
      repo: "maco.calendar.datafiles",
      path: "/"
    });
    return contents;
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
      <div className="row">
        <div className="col-12">
          <select
            className="custom-select"
            name="semester"
            onBlur={this.handleScheduleChange}
            onChange={this.handleScheduleChange}
          >
            <option value="">--Please choose a schedule --</option>
            {this.state.discoveredGithubCSVs.map(fileName => (
              <option key={fileName} value={fileName}>
                {fileName}
              </option>
            ))}
          </select>
        </div>
      </div>
    );
  }
}

export default SemesterSelector;
