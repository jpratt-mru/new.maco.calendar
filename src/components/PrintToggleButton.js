import React from "react";
import "./PrintToggleButton.css";

class PrintToggleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = () => {
    this.props.handlePrint();
  };

  render() {
    return (
      <li className="nav-item">
        <button
          onClick={this.handleChange}
          data-toggle="modal"
          data-target="#getTitleModal"
          className="nav-link mr-3"
        >
          <i className="fas fa-print fa" />
        </button>
      </li>
    );
  }
}
export default PrintToggleButton;
