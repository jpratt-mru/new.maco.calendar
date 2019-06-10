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
      console.log("updated sources: ", this.calendarRef.current.props.events);
    }
  }

  componentDidUpdate() {
    if (this.calendarRef.current) {
      let slotDuration = "00:30:00";
      if (this.props.printMode) {
        slotDuration = "00:15:00";
      }

      this.calendarRef.current.getApi().setOption("slotDuration", slotDuration);
      this.calendarRef.current
        .getApi()
        .changeView("timeGridWeek", this.props.startingMonday);
    }
  }

  render() {
    if (!this.props.validCsvLoaded) {
      return (
        <div className="col-9">
          <h2>No valid CSV loaded.</h2>
        </div>
      );
    } else {
      return (
        <div className="col-9">
          <FullCalendar
            ref={this.calendarRef}
            printMode={this.printMode}
            events={this.props.events.map(decoratedEventWithTitle)}
            defaultDate={this.props.startingMonday}
            defaultView="timeGridWeek"
            height="auto"
            nowIndicator={false}
            slotDuration={"00:30:00"}
            slotLabelInterval="01:00"
            allDaySlot={false}
            header={false}
            weekends={false}
            minTime="08:00:00"
            maxTime="20:00:00"
            displayEventTime={false}
            columnHeaderFormat={{
              weekday: "short"
            }}
            plugins={[timeGridPlugin]}
            {...this.props}
          />
        </div>
      );
    }
  }
}

export default MacoCalendar;
