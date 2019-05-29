import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

class MacoCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.calendarRef = React.createRef();
  }

  componentWillUpdate() {
    this.calendarRef.current
      .getApi()
      .changeView("timeGridWeek", this.props.startingMonday);
  }

  render() {
    return (
      <FullCalendar
        ref={this.calendarRef}
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

export default MacoCalendar;
