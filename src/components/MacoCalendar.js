import React from "react";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
import decoratedEventWithTitle from "../decoratedEventWithTitle";

import styled from "styled-components";

const CalendarWrapper = styled.div`
  .fc-event {
    font-size: 0.6em;
    font-weight: 600;
    font-family: "Helvetica", "Arial", sans-serif;
  }

  .capacities {
    float: right;
    font-weight: lighter;
  }

  .overcap {
    color: red;
    font-weight: bold;
  }
`;

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

  setDuration(slotDuration) {
    this.calendarRef.current.getApi().setOption("slotDuration", slotDuration);
    this.calendarRef.current
      .getApi()
      .changeView("timeGridWeek", this.props.startingMonday);
  }

  print() {
    this.setDuration("00:15:00");
    window.print();
    this.setDuration("00:30:00");
  }

  componentDidUpdate() {
    if (this.calendarRef.current && this.props.printMode) {
      this.print();
    }
  }

  /**
   * This is the only way in fullcalendar we can currently
   * add HTML to the display of an entry.
   *
   * Since we want the capacities to be styled (both in the
   * standard display view AND the print view), I needed to
   * add a span to that part of the display. This is the fugly
   * that resulted. :(
   *
   * @param {*} info https://fullcalendar.io/docs/eventRender
   */
  styleEvent(info) {
    const text = info.el.innerHTML;
    const splitText = text.split(/<br>/gi);
    const lineWithCapacities = splitText[2].replace(/<\/div>/gi, "");
    const splitLineWithCapacities = lineWithCapacities.split(/\s+/);
    const capacities = splitLineWithCapacities[1];
    const splitCapacities = capacities.split(/\//);
    const overCapStyle =
      parseInt(splitCapacities[0], 10) > parseInt(splitCapacities[1], 10)
        ? "overcap"
        : "";
    const spannedCapacities = `<span class="capacities ${overCapStyle}">${capacities}</span>`;
    info.el.innerHTML = info.el.innerHTML.replace(
      capacities,
      spannedCapacities
    );
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
        <CalendarWrapper className="col-9">
          <FullCalendar
            ref={this.calendarRef}
            printMode={this.props.printMode}
            events={this.props.events.map(decoratedEventWithTitle)}
            eventRender={this.styleEvent}
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
        </CalendarWrapper>
      );
    }
  }
}

export default MacoCalendar;
