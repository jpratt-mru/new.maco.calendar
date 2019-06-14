import React from "react";
import moment from "moment";
import { saveAs } from "file-saver"; // to download the ical to browser
import styled from "styled-components";

const DownloadButton = styled.button`
  background-color: transparent !important;
  border: none !important;
  outline: none !important;
`;

const DownloadIcon = styled.i`
  font-size: 30px;
  width: 20px;
`;

const CalendarExportButton = props => {
  const eventsToExport = props.events;
  const semester = props.semester;
  return (
    <li className="nav-item">
      <DownloadButton
        id="calendar-export-button"
        onClick={e => downloadCalendarFile(eventsToExport, semester, e)}
        className="nav-link"
      >
        <DownloadIcon className="fas fa-file-download fa" />
      </DownloadButton>
    </li>
  );
};

/**
 * Build icalendar events from the currently filtered learning events
 * and wrap them all in the text needed to make a valid icalendar file -
 * and then download them in the browser.
 */
const downloadCalendarFile = (learningEvents, semester) => {
  const icalendarEvents = learningEvents.map(event =>
    icalendarEvent(event, semester)
  );

  // add newlines all over the place
  const icalendarFileContents = `${ICALENDAR_HEADER}\n${icalendarEvents.join(
    "\n"
  )}\n${ICALENDAR_FOOTER}`;

  // https://developer.mozilla.org/en-US/docs/Web/API/Blob
  const blob = new Blob([icalendarFileContents], {
    type: "text/plain;charset=utf-8"
  });

  saveAs(blob, "calendar-export.ics");
};

/**
 * Build a single icalendar event from a learning event and its
 * associated semester. (We need the semester to figure out the
 * recurring portion of the ical event - to figure out the last
 * time the learning event will happen in the semester.)
 *
 * How is this black magic done? Through the wonders of reverse-engineering
 * a working calendar export from Gcal and find-and-replace, baby.
 */
const icalendarEvent = (learningEvent, semester) => {
  const firstDateStartTime = moment(learningEvent.start); // for START field
  const firstDateEndTime = moment(learningEvent.end); // for END field

  const now = moment(); // for DTSTAMP field (yes, it's required)

  const summary = `${learningEvent.course.toUpperCase()}-${
    learningEvent.section
  } [${learningEvent.lastName}]`; // what actually shows up in the calendar "box"

  const lastDayOfSemester = moment(semester.lastDay);

  let theEvent = ICALENDAR_EVENT_TEMPLATE.replace(
    /\[START\]/,
    formattedIcalDateTime(firstDateStartTime)
  )
    .replace(/\[END\]/, formattedIcalDateTime(firstDateEndTime))
    .replace(/\[UNTIL\]/, formattedIcalDateTime(lastDayOfSemester))
    .replace(/\[DOW\]/, `${firstDateStartTime.format("dd").toUpperCase()}`)
    .replace(/\[DTSTAMP\]/, formattedIcalDateTime(now))
    .replace(/\[UID\]/, UID())
    .replace(/\[SUMMARY\]/, summary);
  return theEvent;
};

const formattedIcalDateTime = momentDateTime =>
  `${formattedIcalDate(momentDateTime)}T${formattedIcalTime(momentDateTime)}`;

const formattedIcalDate = momentDateTime => momentDateTime.format("YYYYMMDD");

const formattedIcalTime = momentDateTime => momentDateTime.format("HHmmss");

/**
 * Generate a simple UID - every ical event needs one, don't you know.
 *
 * Pulled out of https://github.com/matthewmueller/uid/blob/master/index.js
 */
const UID = () =>
  `${Math.random()
    .toString(35)
    .substr(2, 10)}@maco.calendar`;

const ICALENDAR_EVENT_TEMPLATE = `BEGIN:VEVENT
DTSTART;TZID=America/Edmonton:[START]
DTEND;TZID=America/Edmonton:[END]
RRULE:FREQ=WEEKLY;UNTIL=[UNTIL]Z;BYDAY=[DOW]
DTSTAMP:[DTSTAMP]Z
UID:[UID]
SUMMARY:[SUMMARY]
END:VEVENT`;

const ICALENDAR_HEADER = `BEGIN:VCALENDAR
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

const ICALENDAR_FOOTER = `END:VCALENDAR`;

export default CalendarExportButton;
