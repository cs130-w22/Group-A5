//checks whether join form has the correct information.
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
