const validator = require('validator');
const isEmpty = require('./isEmpty');

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.newPassword = !isEmpty(data.newPassword) ? data.newPassword : '';
  data.newPassword2 = !isEmpty(data.newPassword2) ? data.newPassword2 : '';

  if (validator.isEmpty(data.newPassword)) {
    errors.newPassword = 'Password field is required.';
  }

  if (
    !validator.isLength(data.newPassword, { min: 6, max: 30 }) &&
    !validator.isEmpty(data.newPassword)
  ) {
    errors.newPassword = 'Password must be between 6 and 30 characters.';
  }

  if (validator.isEmpty(data.newPassword2)) {
    errors.newPassword2 = 'Confirm password field is required.';
  }

  if (!validator.equals(data.newPassword2, data.newPassword)) {
    errors.newPassword2 = 'Passwords must match.';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
