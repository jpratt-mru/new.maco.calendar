import React from "react";
import "./PrintToggleButton.css";

class PrintToggleButton extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = () => {
    this.props.handlePrintViewChange();
  };

  render() {
    return (
      <li className="nav-item">
        {this.props.printMode ? (
          <button onClick={this.handleChange} className="nav-link mr-3">
            <i className="fas fa-print fa" />
          </button>
        ) : (
          <button onClick={this.handleChange} className="nav-link mr-3">
            <i className="fas fa-desktop fa" />
          </button>
        )}
      </li>
    );
  }
}
export default PrintToggleButton;
