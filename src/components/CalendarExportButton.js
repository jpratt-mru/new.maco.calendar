import React from "react";
import moment from "moment";
import { saveAs } from "file-saver";
import Blob from "blob";
import "./CalendarExportButton.css";

const CalendarExportButton = props => {
  const eventsToExport = props.events;
  const semester = props.semester;
  return (
    <li className="nav-item">
      <button
        id="calendar-export-button"
        onClick={e => downloadCalendarFile(eventsToExport, semester, e)}
        className="nav-link p-2"
      >
        <i className="fas fa-file-download fa" />
      </button>
    </li>
  );
};

const calendarEvent = (learningEvent, semester) => {
  const firstDateStartTime = moment(learningEvent.start);
  const firstDateEndTime = moment(learningEvent.end);
  const now = moment();
  const summary = `${learningEvent.course.toUpperCase()}-${
    learningEvent.section
  } [${learningEvent.lastname}]`;

  const lastDayOfSemester = moment(semester.lastDay);

  let theEvent = EVENT_TEMPLATE.replace(
    /\[START\]/,
    `${firstDateStartTime.format("YYYYMMDD")}T${firstDateStartTime.format(
      "HHmmss"
    )}`
  )
    .replace(
      /\[END\]/,
      `${firstDateEndTime.format("YYYYMMDD")}T${firstDateEndTime.format(
        "HHmmss"
      )}`
    )
    .replace(
      /\[UNTIL\]/,
      `${lastDayOfSemester.format("YYYYMMDD")}T${lastDayOfSemester.format(
        "HHmmss"
      )}`
    )
    .replace(/\[DOW\]/, `${firstDateStartTime.format("dd").toUpperCase()}`)
    .replace(/\[DTSTAMP\]/, `${now.format("YYYYMMDD")}T${now.format("HHmmss")}`)
    .replace(
      /\[UID\]/,
      `${Math.random()
        .toString(35)
        .substr(2, 10)}@maco.calendar`
    )
    .replace(/\[SUMMARY\]/, summary);
  return theEvent;
};

const downloadCalendarFile = (events, semester) => {
  const justEvents = events.map(event => calendarEvent(event, semester));

  const calendar = `${HEADER}\n${justEvents.join("\n")}\n${FOOTER}`;

  const blob = new Blob([calendar], { type: "text/plain;charset=utf-8" });
  saveAs(blob, "calendar-export.ics");
};

const EVENT_TEMPLATE = `BEGIN:VEVENT
DTSTART;TZID=America/Edmonton:[START]
DTEND;TZID=America/Edmonton:[END]
RRULE:FREQ=WEEKLY;UNTIL=[UNTIL]Z;BYDAY=[DOW]
DTSTAMP:[DTSTAMP]Z
UID:[UID]
SUMMARY:[SUMMARY]
END:VEVENT`;

const HEADER = `BEGIN:VCALENDAR
VERSION:2.0
CALSCALE:GREGORIAN
PRODID:jpratt/macocalendar
BEGIN:VTIMEZONE
TZID:America/Edmonton
BEGIN:DAYLIGHT
TZOFFSETFROM:-0700
TZOFFSETTO:-0600
TZNAME:MDT
DTSTART:19700308T020000
RRULE:FREQ=YEARLY;BYMONTH=3;BYDAY=2SU
END:DAYLIGHT
BEGIN:STANDARD
TZOFFSETFROM:-0600
TZOFFSETTO:-0700
TZNAME:MST
DTSTART:19701101T020000
RRULE:FREQ=YEARLY;BYMONTH=11;BYDAY=1SU
END:STANDARD
END:VTIMEZONE`;

const FOOTER = `END:VCALENDAR`;

export default CalendarExportButton;
