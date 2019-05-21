class CsvRecord {
  static isValid = csvRecord => {
    return (
      csvRecord.hasOwnProperty("course") &&
      csvRecord.hasOwnProperty("section") &&
      csvRecord.hasOwnProperty("section-capacity") &&
      csvRecord.hasOwnProperty("dow") &&
      csvRecord.hasOwnProperty("start-time") &&
      csvRecord.hasOwnProperty("duration") &&
      csvRecord.hasOwnProperty("room") &&
      csvRecord.hasOwnProperty("first-name") &&
      csvRecord.hasOwnProperty("last-name")
    );
  };
}

export default CsvRecord;
