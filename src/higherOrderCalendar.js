import React from "react";

const higherOrderCalendar = WrappedCalendarComponent => {
  class HOC extends React.Component {
    render() {
      return <WrappedCalendarComponent {...this.props} />;
    }
  }

  return HOC;
};

export default higherOrderCalendar;
