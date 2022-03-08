/**
   * Check if session code and name have been entered correctly on the home page
   * @param {*} values - holds the values that were input for the session code and name
   */
const validation = (values) => {
  let errors = {};

  if (!values.code) {
    errors.code = "Code is required";
  } else if (values.code.length != 4) {
    errors.code = "Code must be 4 digits";
  }
  if (!values.fullname) {
    errors.fullname = "Name is required";
  }

  return errors;
};

export default validation;
