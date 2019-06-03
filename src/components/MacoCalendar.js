import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import decoratedEventWithTitle from "../decoratedEventWithTitle";
import "./MacoCalendar.css";

class MacoCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
  }

  componentWillUpdate() {
    this.props.recolor();
    if (this.calendarRef.current) {
      this.calendarRef.current
        .getApi()
        .changeView("timeGridWeek", this.props.startingMonday);
    }
  }

  render() {
    if (!this.props.validCsvLoaded) {
      return <div>No valid schedule loaded.</div>;
    } else {
      return (
        <FullCalendar
          ref={this.calendarRef}
          events={this.props.events.map(decoratedEventWithTitle)}
          defaultDate={this.props.startingMonday}
          defaultView="timeGridWeek"
          height="auto"
          nowIndicator={false}
          allDaySlot={false}
          header={false}
          weekends={false}
          minTime="08:00:00"
          maxTime="20:00:00"
          displayEventTime={false}
          columnHeaderFormat={{
            weekday: "short",
            month: "numeric",
            day: "numeric"
          }}
          plugins={[timeGridPlugin]}
          {...this.props}
        />
      );
    }
  }
}

export default MacoCalendar;
