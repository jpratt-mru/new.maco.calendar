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
      <button
        id="print-toggle-button"
        onClick={this.handleChange}
        type="button"
        className={`btn ${
          this.props.printMode ? "btn-primary" : "btn-warning"
        } mt-3`}
      >
        In {this.props.printMode ? "Print" : "Screen"} Mode
      </button>
    );
  }
}
export default PrintToggleButton;
