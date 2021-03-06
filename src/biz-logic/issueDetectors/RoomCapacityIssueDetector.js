import Rooms from "../Rooms";

class RoomCapacityIssueDetector {
  constructor(learningEvents) {
    this.learningEvents = learningEvents;
    this.discoveredIssues = new Map();
    this.checkLearningEventsForIssues();
  }

  checkLearningEventsForIssues() {
    this.learningEvents.forEach(event => {
      const courseSection = `${event.course}${event.section}`;
      if (
        courseSection &&
        !isNaN(event.sectionCapacity) &&
        !Rooms.canAccommodate(event) &&
        !this.discoveredIssues.has(courseSection)
      ) {
        this.discoveredIssues.set(courseSection, this.issueFor(event));
      }
    });
  }

  issues() {
    return Array.from(this.discoveredIssues.values());
  }

  issueFor(event) {
    const roomCapacity = Rooms.capacityFor(event.room);
    return {
      eventId: event.id,
      roomCapacity: roomCapacity,
      sectionCapacity: event.sectionCapacity,
      room: event.room,
      class: `${event.course}-${event.section}`
    };
  }
}

export default RoomCapacityIssueDetector;
