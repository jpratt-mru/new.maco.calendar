import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const MacoCalendar = props => {
  return (
    <FullCalendar
      defaultDate="2019-09-09"
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
      {...props}
    />
  );
};

export default MacoCalendar;
