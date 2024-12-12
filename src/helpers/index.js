const validateRequiredFields = (object) => {
  for (const key in object) {
    if (
      object[key] === null ||
      object[key] === undefined ||
      object[key] === ""
    ) {
      return false;
    }
  }

  return true;
};

module.exports = {
  validateRequiredFields,
};
