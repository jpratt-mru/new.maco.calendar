class RequiredPropPresenceValidator {
  requiredProps = ["start-time", "duration", "id"];

  requiredPropPresent = (record, propName) => {
    return record.hasOwnProperty(propName);
  };

  errorsWith = record => {
    const errors = [];
    this.requiredProps.forEach(propName => {
      if (!this.requiredPropPresent(record, propName)) {
        errors.push(`Missing required field **${propName}**.`);
      }
    });
    return errors;
  };
}

export default RequiredPropPresenceValidator;
