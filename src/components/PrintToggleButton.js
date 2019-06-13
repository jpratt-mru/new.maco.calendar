import React from "react";
import styled from "styled-components";

const PrintButton = styled.button`
  background-color: transparent !important;
  border: none !important;
  outline: none !important;
`;

const PrintIcon = styled.i`
  font-size: 30px;
  width: 20px;
`;

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
        <PrintButton
          onClick={this.handleChange}
          data-toggle="modal"
          data-target="#getTitleModal"
          className="nav-link mr-3"
        >
          <PrintIcon className="fas fa-print fa" />
        </PrintButton>
      </li>
    );
  }
}
export default PrintToggleButton;
