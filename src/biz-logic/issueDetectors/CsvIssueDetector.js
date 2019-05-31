class CsvIssueDetector {
  constructor(learningEvents) {
    this.learningEvents = learningEvents;
    this.discoveredIssues = [];
    this.checkLearningEventsForIssues();
  }

  checkLearningEventsForIssues() {
    this.learningEvents.forEach(event => {
      if (event.missing.length > 0 || event.malformed.length > 0) {
        this.discoveredIssues = [
          ...this.discoveredIssues,
          {
            eventId: event.id,
            missingFields: [...event.missing],
            malformedFields: [...event.malformed]
          }
        ];
      }
    });
  }

  issues() {
    return [...this.discoveredIssues];
  }
}

export default CsvIssueDetector;
