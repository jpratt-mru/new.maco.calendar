class CsvIssueDetector {
  constructor(learningEvents) {
    this.learningEvents = learningEvents;
    this.discoveredIssues = [];
    this.checkLearningEventsForIssues();
  }

  checkLearningEventsForIssues() {}

  issues() {
    return [...this.discoveredIssues];
  }
}

export default CsvIssueDetector;
