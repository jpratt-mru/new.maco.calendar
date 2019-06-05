import RoomCapacityIssueDetector from "./RoomCapacityIssueDetector";
import RoomDoubleBookingIssueDetector from "./RoomDoubleBookingIssueDetector";
import InstructorDoubleBookingIssueDetector from "./InstructorDoubleBookingIssueDetector";
import CsvIssueDetector from "./CsvIssueDetector";

class IssuesDetector {
  constructor(learningEvents) {
    this.detectedCsvIssues = [];
    this.detectedRoomCapacityIssues = [];
    this.detectedRoomDoubleBookingIssues = [];
    this.detectedInstructorDoubleBookingIssues = [];

    this.learningEvents = learningEvents;

    this.csvIssueDetector = new CsvIssueDetector(learningEvents);
    this.roomCapacityIssueDetector = new RoomCapacityIssueDetector(
      learningEvents
    );
    this.roomDoubleBookingIssueDetector = new RoomDoubleBookingIssueDetector(
      learningEvents
    );
    this.instructorDoubleBookingIssueDetector = new InstructorDoubleBookingIssueDetector(
      learningEvents
    );
    this.detectIssues();
  }

  detectIssues() {
    this.detectCsvIssues();
    this.detectRoomCapacityIssues();
    this.detectRoomDoubleBookingIssues();
    this.detectInstructorDoubleBookingIssues();
  }

  detectCsvIssues() {
    this.detectedCsvIssues = this.csvIssueDetector.issues();
  }

  detectRoomCapacityIssues() {
    this.detectedRoomCapacityIssues = this.roomCapacityIssueDetector.issues();
  }

  detectRoomDoubleBookingIssues() {
    this.detectedRoomDoubleBookingIssues = this.roomDoubleBookingIssueDetector.issues();
  }

  detectInstructorDoubleBookingIssues() {
    this.detectedInstructorDoubleBookingIssues = this.instructorDoubleBookingIssueDetector.issues();
  }

  /**
   * These should look like this:
   *
   * eventId: 3
   * missingFields: ["firstname", "duration"],
   * malformedFields: ["dow"]
   *
   */

  csvIssues() {
    return this.detectedCsvIssues;
  }

  /**
   * These should look like this:
   *
   * class: "comp1501-001"
   * room: "b107",
   * roomCapacity: 25
   * sectionCapacity: 26
   * eventId: 14
   *
   */
  roomCapacityIssues() {
    return this.detectedRoomCapacityIssues;
  }

  /**
   * These should look like this:
   *
   * room: "b107",
   * classes: ["comp1423-001", "math2211-509", "comp1441-401"],
   * eventIds: [13, 132, 44]
   *
   */
  roomDoubleBookingIssues() {
    return this.detectedRoomDoubleBookingIssues;
  }

  /**
   * These should look like this:
   *
   * instructorName: "Pam Slam",
   * classes: ["comp1423-001", "math2211-509", "comp1441-401"],
   * eventIds: [13, 132, 44]
   *
   */
  instructorDoubleBookingIssues() {
    return this.detectedInstructorDoubleBookingIssues;
  }
}

export default IssuesDetector;
