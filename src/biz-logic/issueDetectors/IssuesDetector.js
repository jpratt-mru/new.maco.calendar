import RoomCapacityIssueDetector from "./RoomCapacityIssueDetector";
import Rooms from "../Rooms";

class IssuesDetector {
  constructor(learningEvents) {
    this.detectedIssues = [];
    this.learningEvents = learningEvents;
    this.roomCapacityIssueDetector = new RoomCapacityIssueDetector(
      new Rooms(),
      learningEvents
    );
    this.detectIssues();
  }

  detectIssues() {
    this.detectCsvIssues();
    this.detectRoomCapacityIssues();
  }

  detectCsvIssues() {
    let issues = [];
    this.learningEvents.forEach(event => {
      if (event.errors.length > 0) {
        let details = [];

        event.errors.forEach(error => {
          details = [...details, error];
        });
        issues = [...issues, { eventId: event.id, details: details }];
      }
      if (event.warnings.length > 0) {
        let details = [];

        event.warnings.forEach(warning => {
          details = [...details, warning];
        });
        issues = [...issues, { eventId: event.id, details: details }];
      }
    });
    this.detectedIssues = [...this.detectedIssues, ...issues];
  }

  detectRoomCapacityIssues() {
    const roomCapIssues = this.roomCapacityIssueDetector.issues();
    console.log("cap issues", roomCapIssues);
    this.roomCapacityIssueDetector.issues().forEach(capacityIssue => {
      this.detectedIssues = [
        ...this.detectedIssues,
        {
          eventId: capacityIssue.eventId,
          details: [
            `room capacity is ${
              capacityIssue.roomCapacity
            }, but section has a capacity of ${capacityIssue.sectionCapacity}`
          ]
        }
      ];
    });
  }

  issues() {
    return this.detectedIssues;
  }
}

export default IssuesDetector;
