import TimeUtilities from "../TimeUtilities";

class InstructorDoubleBookingIssueDetector {
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
    const learningEventsWithoutTBAs = this.learningEvents.filter(
      event => event["instructor-username"] !== "TBA"
    );
    learningEventsWithoutTBAs.forEach(thisEvent => {
      const possiblyConflictingEvents = learningEventsWithoutTBAs.filter(
        otherEvent =>
          thisEvent["instructor-username"] ===
            otherEvent["instructor-username"] && thisEvent.id !== otherEvent.id
      );

      const conflicts = possiblyConflictingEvents.filter(otherEvent =>
        this.doubleBookingExists(thisEvent, otherEvent)
      );

      allConflicts = [...allConflicts, ...conflicts];
    });

    return [...new Set(allConflicts)];
  }

  addIssueToMap(issue) {
    const theInstructor = issue.instructorName;
    if (this.mappedIssues.has(theInstructor)) {
      const associatedIssue = this.mappedIssues.get(theInstructor);
      associatedIssue.classes.push(issue.class);
      associatedIssue.eventIds.push(issue.eventId);
    } else {
      this.mappedIssues.set(theInstructor, {
        instructorName: theInstructor,
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
      instructorName: event["instructor-username"],
      class: `${event.course}-${event.section}`
    };
  }
}

export default InstructorDoubleBookingIssueDetector;
