import TimeUtilities from "../../biz-logic/TimeUtilities";

class RoomDoubleBookingIssueDetector {
  constructor(learningEvents) {
    this.learningEvents = learningEvents;
    this.mappedIssues = new Map();
    this.checkLearningEventsForIssues();
  }

  checkLearningEventsForIssues() {
    const discoveredIssues = this.uniqueTimeConflicts().map(conflict =>
      this.issueFor(conflict)
    );
    discoveredIssues.forEach(issue => {
      this.addIssueToMap(issue);
    });
  }

  uniqueTimeConflicts() {
    let allConflicts = [];
    this.learningEvents.forEach(thisEvent => {
      const possiblyConflictingEvents = this.learningEvents.filter(
        otherEvent =>
          thisEvent.room === otherEvent.room && thisEvent.id !== otherEvent.id
      );

      const conflicts = possiblyConflictingEvents.filter(otherEvent =>
        this.doubleBookingExists(thisEvent, otherEvent)
      );

      allConflicts = [...allConflicts, ...conflicts];
    });
    return [...new Set(allConflicts)];
  }

  addIssueToMap(issue) {
    const theRoom = issue.room;
    if (this.mappedIssues.has(theRoom)) {
      const associatedIssue = this.mappedIssues.get(theRoom);
      associatedIssue.classes.push(issue.class);
      associatedIssue.eventIds.push(issue.eventId);
    } else {
      this.mappedIssues.set(theRoom, {
        room: theRoom,
        eventIds: [issue.eventId],
        classes: [issue.class]
      });
    }
  }

  doubleBookingExists(learningEvent, otherLearningEvent) {
    return TimeUtilities.timeConflictExistsBetween(
      learningEvent,
      otherLearningEvent
    );
  }

  issues() {
    return Array.from(this.mappedIssues.values());
  }

  issueFor(event) {
    return {
      eventId: event.id,
      room: event.room,
      class: `${event.course}-${event.section}`
    };
  }
}

export default RoomDoubleBookingIssueDetector;
